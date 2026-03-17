import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { clients, requests, request_templates } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { ClientDetailHeader } from "./ClientDetailHeader";
import { ClientInfoCard } from "./ClientInfoCard";
import { ClientRequestList } from "./ClientRequestList";

export default async function ClientDetailPage({
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

  // Fetch client details
  const client = await db.query.clients.findFirst({
    where: and(
      eq(clients.id, id),
      eq(clients.profileId, user.id)
    ),
  });

  if (!client) {
    notFound();
  }

  // Fetch templates for the user
  const templates = await db.query.request_templates.findMany({
    where: eq(request_templates.profileId, user.id),
    orderBy: [desc(request_templates.createdAt)],
  });

  // Fetch requests for this client
  const clientRequests = await db.query.requests.findMany({
    where: eq(requests.clientId, client.id),
    orderBy: [desc(requests.createdAt)],
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ClientDetailHeader client={client} templates={templates} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ClientInfoCard client={client} />
        <ClientRequestList 
          requests={clientRequests} 
          clientId={id} 
          templates={templates} 
        />
      </div>
    </div>
  );
}
