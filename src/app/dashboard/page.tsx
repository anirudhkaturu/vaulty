import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
            <span className="text-sm text-slate-600">{user.email}</span>
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
        <header className="mb-8">
          <h1 className="text-3xl font-black text-indigo-950 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back to your secure vault.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2">Pending Requests</h3>
            <p className="text-3xl font-black text-indigo-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2">Verified Files</h3>
            <p className="text-3xl font-black text-indigo-600">48</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-950 mb-2">Active Clients</h3>
            <p className="text-3xl font-black text-indigo-600">24</p>
          </div>
        </div>
      </main>
    </div>
  );
}
