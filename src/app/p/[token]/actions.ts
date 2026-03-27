"use server";

import { db } from "@/lib/db";
import { requests, request_documents, documents } from "@/lib/db/schema";
import { getUploadUrl } from "@/lib/storage";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";
import { resend } from "@/lib/email";
import { DocumentUploadedEmail, RequestCompletedEmail } from "@/lib/email-templates";

export async function getRequestByToken(token: string) {
  const request = await db.query.requests.findFirst({
    where: eq(requests.uploadToken, token),
    with: {
      client: {
        with: {
          profile: true,
        },
      },
      documents: true,
    },
  });

  return request;
}

export async function getPresignedUploadUrl(
  token: string,
  requestDocumentId: string,
  fileName: string,
  contentType: string
) {
  const request = await db.query.requests.findFirst({
    where: eq(requests.uploadToken, token),
  });

  if (!request) {
    throw new Error("Invalid token");
  }

  const doc = await db.query.request_documents.findFirst({
    where: and(
      eq(request_documents.id, requestDocumentId),
      eq(request_documents.requestId, request.id)
    ),
  });

  if (!doc) {
    throw new Error("Document not found");
  }

  const key = `uploads/${request.id}/${crypto.randomUUID()}-${fileName}`;
  const url = await getUploadUrl(key, contentType);

  return { url, key, provider: process.env.STORAGE_PROVIDER || "supabase" };
}

export async function completeDocumentUpload(
  token: string,
  requestDocumentId: string,
  key: string,
  fileName: string,
  fileSize: number,
  contentType: string
) {
  const request = await db.query.requests.findFirst({
    where: eq(requests.uploadToken, token),
    with: {
      client: {
        with: {
          profile: true
        }
      },
      documents: true
    }
  });

  if (!request) {
    throw new Error("Invalid token");
  }

  const profile = request.client.profile;

  await db.insert(documents).values({
    requestDocumentId,
    filePath: key,
    fileName,
    fileSize,
    contentType,
  });

  await db.update(request_documents)
    .set({ uploaded: true })
    .where(eq(request_documents.id, requestDocumentId));

  if (request.status === "pending") {
    await db.update(requests)
      .set({ status: "in_progress" })
      .where(eq(requests.id, request.id));
  }

  if (profile?.email && profile.notifyOnUpload) {
    try {
      await resend.emails.send({
        from: "Vaulty Activity <onboarding@resend.dev>",
        to: profile.email,
        replyTo: request.client.email || undefined,
        subject: `Document Uploaded: ${fileName} from ${request.client.name}`,
        react: DocumentUploadedEmail({
          professionalName: profile.name || "User",
          clientName: request.client.name,
          documentName: fileName,
          requestLink: `${process.env.NEXT_PUBLIC_APP_URL || "https://vaulty.vercel.app"}/dashboard/requests/${request.id}`,
        }),
      });
    } catch (error) {
      console.error("Failed to send upload notification:", error);
    }
  }

  const updatedDocuments = await db.query.request_documents.findMany({
    where: eq(request_documents.requestId, request.id),
  });

  const allUploaded = updatedDocuments.every(doc => doc.uploaded);

  if (allUploaded && request.status !== "completed") {
    await db.update(requests)
      .set({ 
        status: "completed",
        completedAt: new Date()
      })
      .where(eq(requests.id, request.id));

    if (profile?.email && profile.notifyOnCompletion) {
      try {
        await resend.emails.send({
          from: "Vaulty Activity <onboarding@resend.dev>",
          to: profile.email,
          replyTo: request.client.email || undefined,
          subject: `Request Completed: ${request.client.name}`,
          react: RequestCompletedEmail({
            professionalName: profile.name || "User",
            clientName: request.client.name,
            requestLink: `${process.env.NEXT_PUBLIC_APP_URL || "https://vaulty.vercel.app"}/dashboard/requests/${request.id}`,
          }),
        });
      } catch (error) {
        console.error("Failed to send completion notification:", error);
      }
    }
  }
}
