import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span>Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600">Settings</span>
        </div>
        <h1 className="text-4xl font-black text-indigo-950 tracking-tight">Account Settings</h1>
      </div>

      <SettingsForm 
        initialData={{
          name: profile?.name || "",
          companyName: profile?.companyName || "",
          bio: profile?.bio || "",
          welcomeMessage: profile?.welcomeMessage || "",
          defaultExpiryDays: profile?.defaultExpiryDays || 14,
        }} 
      />
    </div>
  );
}
