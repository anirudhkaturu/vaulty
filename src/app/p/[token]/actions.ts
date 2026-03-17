"use server";

import { db } from "@/lib/db";
import { requests, request_documents, documents } from "@/lib/db/schema";
import { getUploadUrl } from "@/lib/storage";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

export async function getRequestByToken(token: string) {
  const request = await db.query.requests.findFirst({
    where: eq(requests.uploadToken, token),
    with: {
      client: true,
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
  // 1. Verify the request and document exist
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

  // 2. Generate a unique key for the file
  const key = `uploads/${request.id}/${crypto.randomUUID()}-${fileName}`;

  // 3. Generate upload URL using unified storage utility
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
  // 1. Verify token
  const request = await db.query.requests.findFirst({
    where: eq(requests.uploadToken, token),
  });

  if (!request) {
    throw new Error("Invalid token");
  }

  // 2. Create document record
  await db.insert(documents).values({
    requestDocumentId,
    filePath: key,
    fileName,
    fileSize,
    contentType,
  });

  // 3. Update request_document status
  await db.update(request_documents)
    .set({ uploaded: true })
    .where(eq(request_documents.id, requestDocumentId));

  // 4. Update request status to 'in_progress' if it was 'pending'
  if (request.status === "pending") {
    await db.update(requests)
      .set({ status: "in_progress" })
      .where(eq(requests.id, request.id));
  }
}
