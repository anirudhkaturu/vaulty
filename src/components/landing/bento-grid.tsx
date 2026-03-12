"use client";
import { motion } from "framer-motion";
import {
  Zap,
  FileText,
  LayoutGrid,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* 1. THE "DASHBOARD" CARD */}
      <motion.div
        whileHover={{ y: -5 }}
        className="md:col-span-8 md:row-span-1 min-h-80 bg-indigo-600 rounded-4xl md:rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative group border border-indigo-500 shadow-2xl shadow-indigo-200/50"
      >
        <div className="relative z-10 max-w-xs text-left">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 text-white">
            <LayoutGrid size={24} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
            Centralized Command
          </h3>
          <p className="text-indigo-100 font-medium text-sm leading-relaxed">
            One dashboard to track every Bank Statement, Aadhaar, and Invoice.
            Know exactly what&rsquo;s missing at a glance.
          </p>
        </div>

        {/* Visual Mockup: Hidden on mobile, visible on LG for desktop richness */}
        <div className="absolute right-[-5%] bottom-[-5%] w-95 bg-white rounded-3xl shadow-2xl p-6 -rotate-3 group-hover:rotate-0 transition-all duration-500 hidden lg:block border border-slate-100">
          <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
            <span className="font-bold text-slate-800 text-sm italic font-serif underline decoration-indigo-200">
              Rohan Sharma&rsquo;s Vault
            </span>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">
              80% Collected
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Bank Statement (6 Months)", status: "Done" },
              { label: "PAN & Aadhaar Card", status: "Done" },
              { label: "GST Returns (Q4)", status: "Pending", pulse: true },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <span className="text-[11px] font-bold text-slate-600 tracking-tight">
                  {item.label}
                </span>
                {item.pulse ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-orange-500 uppercase">
                      Awaiting
                    </span>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  </div>
                ) : (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. AUTO REMINDERS */}
      <motion.div
        whileHover={{ y: -5 }}
        className="md:col-span-4 min-h-75 bg-white border border-slate-200 rounded-4xl md:rounded-[2.5rem] p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all text-left"
      >
        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
          <Zap size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-indigo-950 mb-3 leading-tight tracking-tight">
            Auto Reminders
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
            &ldquo;Follow up until the job is done.&rdquo; Vaulty pings clients
            so you don&rsquo;t have to.
          </p>
        </div>
      </motion.div>

      {/* 3. SECURE VAULT */}
      <motion.div
        whileHover={{ y: -5 }}
        className="md:col-span-4 min-h-75 bg-slate-950 rounded-4xl md:rounded-[2.5rem] p-8 flex flex-col justify-between group overflow-hidden relative"
      >
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 z-10">
          <ShieldCheck size={24} />
        </div>
        <div className="z-10 text-left">
          <h3 className="text-xl font-bold text-white mb-2">Secure Vault</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            AES-256 bank-grade encryption for sensitive KYC data like PAN and
            Aadhaar cards.
          </p>
        </div>
        {/* Fix: background-size was using bg-size class which is not standard in some versions */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#4f46e5_0.5px,transparent_0.5px)]"
          style={{ backgroundSize: "12px 12px" }}
        />
      </motion.div>

      {/* 4. AUDIT TRAIL */}
      <motion.div
        whileHover={{ y: -5 }}
        className="md:col-span-8 min-h-80 bg-white border border-slate-200 rounded-4xl md:rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-10 group shadow-sm hover:shadow-xl transition-all text-left"
      >
        <div className="flex-1">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 border border-indigo-100">
            <FileText size={24} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-950 mb-3 tracking-tight">
            Audit-Ready Trail
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Every upload is time-stamped and logged. No more &ldquo;I sent that
            last week&rdquo; disputes.
          </p>
        </div>

        <div className="flex-1 bg-slate-50 rounded-3xl p-5 md:p-6 border border-slate-100 w-full">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Optimized For
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Accounting", "Legal", "Immigration", "Loan Agents"].map(
              (tag) => (
                <div
                  key={tag}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 flex items-center gap-2 shadow-sm"
                >
                  <div className="w-1 h-1 rounded-full bg-indigo-400" />
                  {tag}
                </div>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
