import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { r2Client, R2_BUCKET_NAME } from "@/lib/r2";
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type StorageProvider = "supabase" | "r2";

const PROVIDER: StorageProvider = (process.env.STORAGE_PROVIDER as StorageProvider) || "supabase";

// Dedicated admin client for storage operations on the server
// This avoids RLS issues when generating signed URLs
const getAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !adminKey) {
    // Fallback to anonymous client if admin key is missing (for local dev)
    console.warn("Missing SUPABASE_SERVICE_ROLE_KEY. Falling back to anonymous client.");
    return createSupabaseClient(url || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");
  }
  
  return createSupabaseClient(url, adminKey);
};

export async function getUploadUrl(key: string, contentType: string) {
  if (PROVIDER === "r2" && process.env.R2_ACCESS_KEY_ID) {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
    return url;
  }

  const supabase = getAdminClient();
  // Using the admin client here ensures we can ALWAYS generate the link
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUploadUrl(key);

  if (error) {
    console.error("Supabase Storage Error (Upload):", error);
    throw error;
  }
  return data.signedUrl;
}

export async function getDownloadUrl(key: string) {
  if (PROVIDER === "r2" && process.env.R2_ACCESS_KEY_ID) {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  }

  const supabase = getAdminClient();
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(key, 3600);

  if (error) {
    console.error("Supabase Storage Error (Download) for key:", key, error);
    throw error;
  }
  return data.signedUrl;
}

export async function deleteFile(key: string) {
  if (PROVIDER === "r2" && process.env.R2_ACCESS_KEY_ID) {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });
    await r2Client.send(command);
    return;
  }

  const supabase = getAdminClient();
  const { error } = await supabase.storage
    .from("documents")
    .remove([key]);

  if (error) {
    console.error("Supabase Storage Error (Delete):", error);
    throw error;
  }
}
