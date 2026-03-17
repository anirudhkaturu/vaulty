import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, clients, requests } from "@/lib/db/schema";
import { eq, count, desc, and } from "drizzle-orm";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { RecentRequests } from "./RecentRequests";
import { DashboardActions } from "./DashboardActions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [profile, clientCountResult, pendingRequestsResult, completedRequestsResult, userRecentRequests] = await Promise.all([
    db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    }),
    db
      .select({ value: count() })
      .from(clients)
      .where(eq(clients.profileId, user.id)),
    db
      .select({ value: count() })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(
        and(
          eq(clients.profileId, user.id),
          eq(requests.status, "pending")
        )
      ),
    db
      .select({ value: count() })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(
        and(
          eq(clients.profileId, user.id),
          eq(requests.status, "completed")
        )
      ),
    db
      .select({
        id: requests.id,
        clientId: requests.clientId,
        status: requests.status,
        createdAt: requests.createdAt,
        client: {
          name: clients.name,
        }
      })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(eq(clients.profileId, user.id))
      .orderBy(desc(requests.createdAt))
      .limit(5),
  ]);

  const displayName = profile?.name || user.email?.split("@")[0] || "User";
  const activeClients = clientCountResult[0]?.value || 0;
  const pendingFiles = pendingRequestsResult[0]?.value || 0;
  const verifiedItems = completedRequestsResult[0]?.value || 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DashboardHeader displayName={displayName} />

      <StatsGrid 
        activeClients={activeClients} 
        pendingFiles={pendingFiles} 
        verifiedItems={verifiedItems} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentRequests requests={userRecentRequests} />
        <DashboardActions />
      </div>
    </div>
  );
}
