import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { request_templates } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { TemplatePageHeader } from "./TemplatePageHeader";
import { TemplateSearchBar } from "./TemplateSearchBar";
import { TemplateList } from "./TemplateList";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const allTemplates = await db.query.request_templates.findMany({
    where: eq(request_templates.profileId, user.id),
    orderBy: [desc(request_templates.createdAt)],
    with: {
      items: true,
    },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <TemplatePageHeader />
      <TemplateSearchBar />
      <TemplateList templates={allTemplates} />
    </div>
  );
}
