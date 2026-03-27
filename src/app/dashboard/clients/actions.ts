"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients, requests, request_documents, template_items, profiles } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";
import { resend } from "@/lib/email";
import { ClientRequestEmail } from "@/lib/email-templates";

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

  const [client, profile] = await Promise.all([
    db.query.clients.findFirst({
      where: and(
        eq(clients.id, clientId),
        eq(clients.profileId, user.id)
      ),
    }),
    db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    })
  ]);

  if (!client) {
    throw new Error("Client not found");
  }

  const uploadToken = crypto.randomUUID().replace(/-/g, "").substring(0, 12);
  const expiryDays = profile?.defaultExpiryDays || 14;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + expiryDays);

  const [newRequest] = await db.insert(requests).values({
    clientId,
    templateId,
    uploadToken,
    status: "pending",
    dueDate,
  }).returning();

  const items = await db.query.template_items.findMany({
    where: eq(template_items.templateId, templateId),
  });

  if (items.length > 0) {
    await db.insert(request_documents).values(
      items.map(item => ({
        requestId: newRequest.id,
        name: item.name,
        required: item.isRequired,
      }))
    );
  }

  if (client.email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vaulty.vercel.app";
    const uploadLink = `${appUrl}/p/${uploadToken}`;
    const fromName = profile?.name ? `${profile.name} via Vaulty` : "Vaulty Notifications";

    try {
      await resend.emails.send({
        from: `${fromName} <onboarding@resend.dev>`,
        to: client.email,
        replyTo: profile?.email || undefined,
        subject: `Document Request from ${profile?.name || "Your Advisor"}`,
        react: ClientRequestEmail({
          professionalName: profile?.name || "Your Advisor",
          professionalCompany: profile?.companyName,
          clientName: client.name,
          uploadLink,
          welcomeMessage: profile?.welcomeMessage,
        }),
      });
    } catch (error) {
      console.error("Failed to send initial email:", error);
    }
  }

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  return newRequest;
}

export async function resendRequestNotificationAction(requestId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const request = await db.query.requests.findFirst({
    where: eq(requests.id, requestId),
    with: {
      client: {
        with: {
          profile: true
        }
      }
    }
  });

  if (!request || request.client.profileId !== user.id) {
    throw new Error("Unauthorized or request not found");
  }

  const { client } = request;
  const profile = client.profile;

  if (!client.email) {
    throw new Error("Client has no email address");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vaulty.vercel.app";
  const uploadLink = `${appUrl}/p/${request.uploadToken}`;
  const fromName = profile?.name ? `${profile.name} via Vaulty` : "Vaulty Notifications";

  await resend.emails.send({
    from: `${fromName} <onboarding@resend.dev>`,
    to: client.email,
    replyTo: profile?.email || undefined,
    subject: `Reminder: Document Request from ${profile?.name || "Your Advisor"}`,
    react: ClientRequestEmail({
      professionalName: profile?.name || "Your Advisor",
      professionalCompany: profile?.companyName,
      clientName: client.name,
      uploadLink,
      welcomeMessage: profile?.welcomeMessage,
    }),
  });

  return { success: true };
}

export async function deleteRequestAction(requestId: string, clientId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

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
