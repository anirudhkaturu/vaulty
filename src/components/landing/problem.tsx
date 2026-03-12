"use client";

import { motion, Variants } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileWarning,
  Search,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

export const ProblemSection = () => (
  <section
    id="problem"
    className="px-6 py-24 bg-white border-y border-slate-200/60 scroll-mt-14 overflow-x-hidden"
  >
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      {/* Text Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-black text-indigo-950 mb-8 leading-tight tracking-tight"
        >
          WhatsApp is for chat. <br />
          <span className="text-indigo-600 italic font-serif font-light">
            Vaulty is for business.
          </span>
        </motion.h2>

        <div className="space-y-4">
          {[
            {
              icon: FileWarning,
              text: "Links expire and media disappears from chat history.",
              color: "text-red-600",
              bg: "bg-red-50/50",
              border: "border-red-100",
            },
            {
              icon: Search,
              text: "Hours wasted scrolling through threads to find one PDF.",
              color: "text-amber-600",
              bg: "bg-amber-50/50",
              border: "border-amber-100",
            },
            {
              icon: XCircle,
              text: "No way to track what's missing without manual checklists.",
              color: "text-rose-600",
              bg: "bg-rose-50/50",
              border: "border-rose-100",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex items-start gap-4 p-5 rounded-3xl border ${item.bg} ${item.border} ${item.color} shadow-sm`}
            >
              <item.icon size={22} className="shrink-0 mt-0.5" />
              <p className="text-[15px] font-bold leading-snug">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-slate-500 font-medium text-sm px-2"
        >
          Stop chasing clients across fragmented apps. Centralize your workflow
          in one secure, professional environment.
        </motion.p>
      </motion.div>

      {/* Visual Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 20, stiffness: 80 }}
        className="relative"
      >
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-200/60 relative z-10">
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
            <div>
              <h3 className="font-black text-xl text-indigo-950 tracking-tight">
                Onboarding Portal
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                Client: James Wilson
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] bg-indigo-600 text-white px-4 py-1.5 rounded-full font-black shadow-lg shadow-indigo-100">
                66% COMPLETE
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span>Signed Contract</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Aug 12
              </span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span>Bank Statement</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Aug 14
              </span>
            </div>

            <motion.div
              animate={{ backgroundColor: ["#fff", "#fef2f2", "#fff"] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="flex items-center justify-between p-5 rounded-2xl border-2 border-dashed border-indigo-200 text-sm font-bold text-indigo-950"
            >
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-500 animate-pulse" size={20} />
                <span>ID Verification</span>
              </div>
              <span className="text-[10px] text-indigo-600 font-black">
                AWAITING UPLOAD
              </span>
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-indigo-50 rounded-[3.5rem] -z-10 translate-x-4 translate-y-4" />
      </motion.div>
    </div>
  </section>
);
