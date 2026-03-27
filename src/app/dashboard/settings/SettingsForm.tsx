"use client";

import { useState, useMemo } from "react";
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
  BadgeInfo,
  BellRing,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfileAction, type ProfileUpdateData } from "./actions";

interface SettingsFormProps {
  initialData: {
    name: string | null;
    companyName: string | null;
    bio: string | null;
    welcomeMessage: string | null;
    defaultExpiryDays: number;
    notifyOnUpload: boolean;
    notifyOnCompletion: boolean;
  };
}

// Custom Switch Component for more tactile feel
const Switch = ({ 
  checked, 
  onChange, 
  disabled = false 
}: { 
  checked: boolean; 
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
      checked ? 'bg-indigo-600' : 'bg-slate-200'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: initialData.name || "",
    companyName: initialData.companyName || "",
    bio: initialData.bio || "",
    welcomeMessage: initialData.welcomeMessage || "",
    defaultExpiryDays: initialData.defaultExpiryDays,
    notifyOnUpload: initialData.notifyOnUpload,
    notifyOnCompletion: initialData.notifyOnCompletion,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Check for unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    return (
      formData.name !== (initialData.name || "") ||
      formData.companyName !== (initialData.companyName || "") ||
      formData.bio !== (initialData.bio || "") ||
      formData.welcomeMessage !== (initialData.welcomeMessage || "") ||
      formData.defaultExpiryDays !== initialData.defaultExpiryDays ||
      formData.notifyOnUpload !== initialData.notifyOnUpload ||
      formData.notifyOnCompletion !== initialData.notifyOnCompletion
    );
  }, [formData, initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await updateProfileAction(formData);
      setStatus({ type: "success", message: "Changes saved successfully" });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus({ type: "error", message: "Failed to save changes. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="max-w-4xl space-y-16 pb-32">
      <form onSubmit={handleSubmit} className="space-y-16">
        
        {/* SECTION: PROFILE */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                <User size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Public Profile</h3>
            </div>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed pr-4">
              Control how you appear to your clients in the portal and document requests.
            </p>
          </div>
          
          <div className="lg:col-span-8 p-1 bg-slate-100/30 rounded-[2.5rem] border border-slate-200/50 backdrop-blur-sm">
            <div className="bg-white rounded-[2.25rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                    Display Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-indigo-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                    Company Name <span className="text-slate-300 font-medium lowercase tracking-normal">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                    <input
                      type="text"
                      value={formData.companyName || ""}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-indigo-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  Professional Bio / Title
                </label>
                <div className="relative group">
                  <Layout className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Independent Wealth Manager at Capital Partners..."
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-indigo-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-300 h-28 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION: PORTAL EXPERIENCE */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100/50">
                <Sparkles size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Client Portal</h3>
            </div>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed pr-4">
              Customize the default experience for your clients when they open a request.
            </p>
          </div>
          
          <div className="lg:col-span-8 p-1 bg-slate-100/30 rounded-[2.5rem] border border-slate-200/50 backdrop-blur-sm">
            <div className="bg-white rounded-[2.25rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white space-y-8">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    Default Welcome Message
                  </label>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/50">Client Facing</span>
                </div>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <textarea
                    value={formData.welcomeMessage || ""}
                    onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                    placeholder="Hey there! Please upload the following documents so we can move forward..."
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-indigo-950 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-300 h-32 resize-none"
                  />
                </div>
                <p className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold ml-1">
                  <BadgeInfo size={12} className="text-indigo-400" />
                  Shown prominently at the top of every new request link.
                </p>
              </div>

              <div className="space-y-2.5 max-w-sm">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                  <Clock size={14} className="text-slate-300" />
                  Default Request Lifespan
                </label>
                <div className="relative group">
                  <select
                    value={formData.defaultExpiryDays}
                    onChange={(e) => setFormData({ ...formData, defaultExpiryDays: parseInt(e.target.value) })}
                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-3.5 px-5 text-sm font-bold text-indigo-950 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  >
                    <option value={7}>7 Days (1 Week)</option>
                    <option value={14}>14 Days (2 Weeks)</option>
                    <option value={30}>30 Days (1 Month)</option>
                    <option value={60}>60 Days (2 Months)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION: NOTIFICATIONS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50">
                <BellRing size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Notifications</h3>
            </div>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed pr-4">
              Manage your alert preferences and stay on top of client activity.
            </p>
          </div>
          
          <div className="lg:col-span-8 space-y-4">
            <div 
              className="flex items-center justify-between p-6 bg-white border border-slate-200/80 rounded-4xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group cursor-pointer"
              onClick={() => setFormData(prev => ({ ...prev, notifyOnUpload: !prev.notifyOnUpload }))}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-indigo-950">New Upload Alert</p>
                  <p className="text-xs text-slate-500 font-medium">Email me as soon as a file is uploaded</p>
                </div>
              </div>
              <Switch 
                checked={formData.notifyOnUpload} 
                onChange={(val) => setFormData(prev => ({ ...prev, notifyOnUpload: val }))} 
              />
            </div>

            <div 
              className="flex items-center justify-between p-6 bg-white border border-slate-200/80 rounded-4xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group cursor-pointer"
              onClick={() => setFormData(prev => ({ ...prev, notifyOnCompletion: !prev.notifyOnCompletion }))}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-indigo-950">Request Complete Alert</p>
                  <p className="text-xs text-slate-500 font-medium">Email me when all items are collected</p>
                </div>
              </div>
              <Switch 
                checked={formData.notifyOnCompletion} 
                onChange={(val) => setFormData(prev => ({ ...prev, notifyOnCompletion: val }))} 
              />
            </div>
          </div>
        </motion.div>

        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {status && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`fixed bottom-28 right-8 p-4 pr-6 rounded-3xl flex items-center gap-3 shadow-2xl z-50 border backdrop-blur-md ${
                status.type === "success" 
                  ? "bg-indigo-600/90 border-indigo-500 text-white shadow-indigo-500/20" 
                  : "bg-rose-600/90 border-rose-500 text-white shadow-rose-500/20"
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              </div>
              <span className="text-xs font-black uppercase tracking-wider">{status.message}</span>
              <button onClick={() => setStatus(null)} className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors">
                <Check size={14} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TACTILE STICKY FOOTER */}
        <div className="fixed bottom-6 left-72 right-6 z-40 pointer-events-none">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="max-w-4xl mx-auto pointer-events-auto"
          >
            <div className="bg-white/70 backdrop-blur-2xl border border-white/40 p-3 px-8 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 ${
                  hasUnsavedChanges ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    hasUnsavedChanges ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                  }`} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    {hasUnsavedChanges ? "Unsaved Changes" : "Up to date"}
                  </p>
                </div>
                {hasUnsavedChanges && (
                  <p className="hidden md:block text-[10px] font-bold text-slate-400">Press save to apply changes to your portal</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || !hasUnsavedChanges}
                className={`relative px-10 h-11 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group ${
                  loading || !hasUnsavedChanges
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
                }`}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Loader2 size={16} className="animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      {hasUnsavedChanges && <Zap size={14} className="fill-white" />}
                      Save Changes
                      <Sparkles size={14} className={hasUnsavedChanges ? "animate-bounce" : ""} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
