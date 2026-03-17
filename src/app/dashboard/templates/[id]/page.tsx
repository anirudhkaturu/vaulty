import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { request_templates, template_items } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { TemplateBuilderHeader } from "./TemplateBuilderHeader";
import { RequirementFormCard } from "./RequirementFormCard";
import { RequirementList } from "./RequirementList";
import { TemplateHelpCard } from "./TemplateHelpCard";

export default async function TemplateBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch template details
  const template = await db.query.request_templates.findFirst({
    where: and(
      eq(request_templates.id, id),
      eq(request_templates.profileId, user.id)
    ),
    with: {
      items: {
        orderBy: [desc(template_items.createdAt)],
      },
    },
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <TemplateBuilderHeader template={template} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RequirementFormCard templateId={id} />

        <div className="lg:col-span-2 space-y-6">
          <RequirementList 
            items={template.items || []} 
            templateId={id} 
          />
          <TemplateHelpCard />
        </div>
      </div>
    </div>
  );
}
