"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { request_templates, template_items } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createTemplateAction(name: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const [newTemplate] = await db.insert(request_templates).values({
    profileId: user.id,
    name,
  }).returning();

  revalidatePath("/dashboard/templates");
  return newTemplate;
}

export async function deleteTemplateAction(templateId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await db.delete(request_templates).where(
    and(
      eq(request_templates.id, templateId),
      eq(request_templates.profileId, user.id)
    )
  );

  revalidatePath("/dashboard/templates");
  redirect("/dashboard/templates");
}

export async function addTemplateItemAction(templateId: string, name: string, description?: string, isRequired: boolean = true) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Verify ownership of template first
  const template = await db.query.request_templates.findFirst({
    where: and(
      eq(request_templates.id, templateId),
      eq(request_templates.profileId, user.id)
    ),
  });

  if (!template) throw new Error("Template not found or access denied");

  await db.insert(template_items).values({
    templateId,
    name,
    description,
    isRequired,
  });

  revalidatePath(`/dashboard/templates/${templateId}`);
}

export async function deleteTemplateItemAction(templateId: string, itemId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // We use the RLS-style existence check
  const template = await db.query.request_templates.findFirst({
    where: and(
      eq(request_templates.id, templateId),
      eq(request_templates.profileId, user.id)
    ),
  });

  if (!template) throw new Error("Unauthorized");

  await db.delete(template_items).where(
    and(
      eq(template_items.id, itemId),
      eq(template_items.templateId, templateId)
    )
  );

  revalidatePath(`/dashboard/templates/${templateId}`);
}
