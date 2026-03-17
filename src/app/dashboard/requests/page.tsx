import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { requests, clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { RequestPageHeader } from "./RequestPageHeader";
import { RequestSearchBar } from "./RequestSearchBar";
import { GlobalRequestList } from "./GlobalRequestList";

export default async function RequestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const allRequests = await db.query.requests.findMany({
    where: (requests, { exists, and }) => 
      exists(
        db.select()
          .from(clients)
          .where(and(
            eq(clients.id, requests.clientId),
            eq(clients.profileId, user.id)
          ))
      ),
    orderBy: [desc(requests.createdAt)],
    with: {
      client: true
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <RequestPageHeader />
      <RequestSearchBar />
      <GlobalRequestList requests={allRequests} />
    </div>
  );
}
