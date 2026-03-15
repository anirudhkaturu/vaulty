"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export async function deleteClientAction(clientId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.delete(clients).where(
    and(
      eq(clients.id, clientId),
      eq(clients.profileId, user.id)
    )
  );

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
  redirect("/dashboard/clients");
}
