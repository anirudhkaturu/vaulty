import { createClient } from "@/lib/supabase/server";
import { r2Client, R2_BUCKET_NAME } from "@/lib/r2";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type StorageProvider = "supabase" | "r2";

const PROVIDER: StorageProvider = (process.env.STORAGE_PROVIDER as StorageProvider) || "supabase";

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

  // Fallback to Supabase
  const supabase = await createClient();
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

  // Fallback to Supabase
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(key, 3600);

  if (error) {
    console.error("Supabase Storage Error (Download) for key:", key, error);
    throw error;
  }
  return data.signedUrl;
}
