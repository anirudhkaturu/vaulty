"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients, requests, request_documents, template_items } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

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
}

export async function createRequestAction(clientId: string, templateId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Verify client belongs to user
  const client = await db.query.clients.findFirst({
    where: and(
      eq(clients.id, clientId),
      eq(clients.profileId, user.id)
    ),
  });

  if (!client) {
    throw new Error("Client not found");
  }

  // 2. Create the request
  const uploadToken = crypto.randomUUID().replace(/-/g, "").substring(0, 12);
  const [newRequest] = await db.insert(requests).values({
    clientId,
    templateId,
    uploadToken,
    status: "pending",
  }).returning();

  // 3. Get items from template
  const items = await db.query.template_items.findMany({
    where: eq(template_items.templateId, templateId),
  });

  // 4. Create request documents from template items
  if (items.length > 0) {
    await db.insert(request_documents).values(
      items.map(item => ({
        requestId: newRequest.id,
        name: item.name,
        required: item.isRequired,
      }))
    );
  }

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  return newRequest;
}

export async function deleteRequestAction(requestId: string, clientId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify the request belongs to a client owned by the user
  const request = await db.query.requests.findFirst({
    where: eq(requests.id, requestId),
    with: {
      client: true
    }
  });

  if (!request || request.client.profileId !== user.id) {
    throw new Error("Unauthorized or request not found");
  }

  await db.delete(requests).where(eq(requests.id, requestId));

  revalidatePath(`/dashboard/clients/${clientId}`);
  revalidatePath("/dashboard/clients");
}
