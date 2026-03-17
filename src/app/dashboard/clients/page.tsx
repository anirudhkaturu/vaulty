import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients, request_templates } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ClientPageHeader } from "./ClientPageHeader";
import { ClientSearchBar } from "./ClientSearchBar";
import { ClientList } from "./ClientList";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const allClients = await db.query.clients.findMany({
    where: eq(clients.profileId, user.id),
    orderBy: [desc(clients.createdAt)],
  });

  const templates = await db.query.request_templates.findMany({
    where: eq(request_templates.profileId, user.id),
    orderBy: [desc(request_templates.createdAt)],
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ClientPageHeader />
      <ClientSearchBar />
      <ClientList clients={allClients} templates={templates} />
    </div>
  );
}
