"use client";

import { useState } from "react";
import { 
  User, 
  Building2, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  Check,
  MessageSquare,
  BadgeInfo
} from "lucide-react";
import { updateProfileAction, type ProfileUpdateData } from "./actions";

interface SettingsFormProps {
  initialData: {
    name: string | null;
    companyName: string | null;
    bio: string | null;
    welcomeMessage: string | null;
    defaultExpiryDays: number;
  };
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: initialData.name || "",
    companyName: initialData.companyName || "",
    bio: initialData.bio || "",
    welcomeMessage: initialData.welcomeMessage || "",
    defaultExpiryDays: initialData.defaultExpiryDays,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await updateProfileAction(formData);
      setStatus({ type: "success", message: "Settings updated successfully" });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus({ type: "error", message: "Failed to update settings. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* SECTION: PROFILE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-2">Profile Details</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              This information will be displayed on your client-facing portal and document requests.
            </p>
          </div>
          
          <div className="lg:col-span-2 space-y-6 bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Display Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Company Name <span className="text-slate-300 normal-case font-medium tracking-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={formData.companyName || ""}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Professional Title / Bio
              </label>
              <textarea
                value={formData.bio || ""}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="e.g. Independent Financial Advisor"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-24 resize-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION: PORTAL EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-slate-100 pt-12">
          <div className="lg:col-span-1">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-2">Portal Experience</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Customize the default behavior and messaging for your client portal.
            </p>
          </div>
          
          <div className="lg:col-span-2 space-y-6 bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Default Portal Greeting
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-400" size={16} />
                <textarea
                  value={formData.welcomeMessage || ""}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  placeholder="Welcome! Please upload the documents requested below..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-32 resize-none"
                />
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1.5 ml-1 mt-1">
                <BadgeInfo size={12} />
                This message will be shown at the top of every new request link.
              </p>
            </div>

            <div className="space-y-2 max-w-xs">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Default Request Validity
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  value={formData.defaultExpiryDays}
                  onChange={(e) => setFormData({ ...formData, defaultExpiryDays: parseInt(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value={7}>7 Days (1 Week)</option>
                  <option value={14}>14 Days (2 Weeks)</option>
                  <option value={30}>30 Days (1 Month)</option>
                  <option value={60}>60 Days (2 Months)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        {status && (
          <div className={`fixed bottom-8 right-8 p-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-right-10 duration-500 z-50 border ${
            status.type === "success" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-rose-600 border-rose-500 text-white"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{status.message}</span>
            <button onClick={() => setStatus(null)} className="ml-4 hover:opacity-50 transition-opacity">
              <Check size={14} strokeWidth={3} />
            </button>
          </div>
        )}

        {/* STICKY FOOTER */}
        <div className="fixed bottom-6 left-72 right-6 z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 px-8 rounded-4xl shadow-2xl shadow-indigo-100/50">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Session</p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-12 h-12 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Save Changes
                  <Sparkles size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
