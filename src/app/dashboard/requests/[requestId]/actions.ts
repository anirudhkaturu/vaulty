"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { requests, documents, request_documents } from "@/lib/db/schema";
import { getDownloadUrl, deleteFile } from "@/lib/storage";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPresignedDownloadUrl(documentId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Get document details and verify ownership
  const doc = await db.query.documents.findFirst({
    where: eq(documents.id, documentId),
    with: {
      requestDocument: {
        with: {
          request: {
            with: {
              client: true
            }
          }
        }
      }
    }
  });

  if (!doc || doc.requestDocument.request.client.profileId !== user.id) {
    throw new Error("Document not found or unauthorized");
  }

  // 2. Generate download URL using unified storage utility
  const url = await getDownloadUrl(doc.filePath);

  return url;
}

export async function reviewDocumentAction(
  docId: string, 
  status: "approved" | "rejected", 
  reason?: string
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Get document details and verify ownership
  const doc = await db.query.request_documents.findFirst({
    where: eq(request_documents.id, docId),
    with: {
      request: {
        with: {
          client: true,
          documents: true
        }
      },
      file: true
    }
  });

  if (!doc || doc.request.client.profileId !== user.id) {
    throw new Error("Unauthorized or document not found");
  }

  // 2. Update document status
  const updateData: {
    reviewStatus: string;
    reviewedAt: Date;
    rejectionReason?: string | null;
    uploaded?: boolean;
  } = {
    reviewStatus: status,
    reviewedAt: new Date(),
  };

  if (status === "rejected") {
    updateData.rejectionReason = reason;
    updateData.uploaded = false; // Reset upload flag so client can re-upload
    
    // Clean up old file record if it exists
    if (doc.file) {
      try {
        await deleteFile(doc.file.filePath);
        await db.delete(documents).where(eq(documents.id, doc.file.id));
      } catch (err) {
        console.error("Failed to cleanup rejected file:", err);
      }
    }
  } else {
    updateData.rejectionReason = null;
  }

  await db.update(request_documents)
    .set(updateData)
    .where(eq(request_documents.id, docId));

  // 3. Auto-complete request if all documents are approved
  if (status === "approved") {
    // Re-fetch all documents for this request to check status
    const allDocs = await db.query.request_documents.findMany({
      where: eq(request_documents.requestId, doc.requestId),
    });

    const allApproved = allDocs.every(d => d.reviewStatus === "approved");

    if (allApproved) {
      await db.update(requests)
        .set({ 
          status: "completed",
          completedAt: new Date()
        })
        .where(eq(requests.id, doc.requestId));
    }
  }

  revalidatePath(`/dashboard/requests/${doc.requestId}`);
}
