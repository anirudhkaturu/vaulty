import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Search, Mail, Phone, MoreVertical } from "lucide-react";
import { AddClientForm } from "./AddClientForm";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const allClients = await db.query.clients.findMany({
    where: eq(clients.profileId, user.id),
    orderBy: [desc(clients.createdAt)],
  });

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
            <Link 
              href="/dashboard"
              className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
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
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-indigo-950 tracking-tight">
              Clients
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your client relationships and document history.
            </p>
          </div>
          <AddClientForm />
        </header>

        {/* Search and Filters */}
        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search clients by name or email..."
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all"
            />
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-sm">
          {allClients.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-300" />
              </div>
              <h3 className="text-indigo-950 font-bold">No clients found</h3>
              <p className="text-slate-400 text-sm mt-1">Start by adding your first client to your vault.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {allClients.map((client) => (
                <div key={client.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-950 leading-none mb-1.5">{client.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Mail size={12} />
                          {client.email || "No email"}
                        </span>
                        {client.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            {client.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all">
                      View Profile
                    </button>
                    <button className="text-slate-400 hover:text-indigo-950">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
