import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { SettingsForm } from "./SettingsForm";
import { Settings, Shield } from "lucide-react";

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
    <div className="relative min-h-screen">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 shadow-lg shadow-indigo-200">
                <Settings size={16} className="text-white" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <span>Dashboard</span>
                <span className="text-slate-200">/</span>
                <span className="text-indigo-600">Settings</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-5xl font-black text-indigo-950 tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Manage your profile, portal preferences and notifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-2 pl-4 rounded-2xl shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Security Status</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Shield size={10} strokeWidth={3} />
                Fully Protected
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Shield size={20} />
            </div>
          </div>
        </div>

        <SettingsForm 
          initialData={{
            name: profile?.name || "",
            companyName: profile?.companyName || "",
            bio: profile?.bio || "",
            welcomeMessage: profile?.welcomeMessage || "",
            defaultExpiryDays: profile?.defaultExpiryDays || 14,
            notifyOnUpload: profile?.notifyOnUpload ?? true,
            notifyOnCompletion: profile?.notifyOnCompletion ?? true,
          }} 
        />
      </div>
    </div>
  );
}
