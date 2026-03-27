"use server";

import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type ProfileUpdateData = {
  name: string;
  companyName: string | null;
  bio: string | null;
  welcomeMessage: string | null;
  defaultExpiryDays: number;
  notifyOnUpload: boolean;
  notifyOnCompletion: boolean;
};

export async function updateProfileAction(formData: ProfileUpdateData) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  try {
    await db
      .update(profiles)
      .set({
        name: formData.name,
        companyName: formData.companyName || null,
        bio: formData.bio || null,
        welcomeMessage: formData.welcomeMessage || null,
        defaultExpiryDays: formData.defaultExpiryDays,
        notifyOnUpload: formData.notifyOnUpload,
        notifyOnCompletion: formData.notifyOnCompletion,
      })
      .where(eq(profiles.id, user.id));

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile");
  }
}
