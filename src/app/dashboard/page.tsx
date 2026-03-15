import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { profiles, clients } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile and stats in parallel
  const [profile, clientCountResult] = await Promise.all([
    db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    }),
    db
      .select({ value: count() })
      .from(clients)
      .where(eq(clients.profileId, user.id)),
  ]);

  const displayName = profile?.name || user.email;
  const activeClients = clientCountResult[0]?.value || 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="grid grid-cols-2 gap-0.5 rounded-lg bg-indigo-600 p-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-xs bg-white/40" />
              <span className="h-2 w-2 rounded-xs bg-white" />
              <span className="h-2 w-2 rounded-xs bg-white" />
              <span className="h-2 w-2 rounded-xs bg-white/40" />
            </div>
            <span className="font-serif text-xl italic tracking-tight text-indigo-950">
              Vaulty
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-indigo-950">{displayName}</span>
              {profile?.companyName && (
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  {profile.companyName}
                </span>
              )}
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-indigo-950 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Welcome back{profile?.name ? `, ${profile.name}` : ""}.
            </p>
          </div>
          <Link 
            href="/dashboard/clients" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
          >
            Manage Clients
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2 text-sm uppercase tracking-wider opacity-60">
              Pending Requests
            </h3>
            <p className="text-4xl font-black text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2 text-sm uppercase tracking-wider opacity-60">
              Verified Files
            </h3>
            <p className="text-4xl font-black text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2 text-sm uppercase tracking-wider opacity-60">
              Active Clients
            </h3>
            <p className="text-4xl font-black text-indigo-600">{activeClients}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
