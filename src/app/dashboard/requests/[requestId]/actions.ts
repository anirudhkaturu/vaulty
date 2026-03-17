"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { getDownloadUrl } from "@/lib/storage";
import { eq } from "drizzle-orm";

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
