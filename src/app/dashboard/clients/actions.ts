"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const notes = formData.get("notes") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  await db.insert(clients).values({
    profileId: user.id,
    name,
    email,
    phone,
    notes,
  });

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
}
