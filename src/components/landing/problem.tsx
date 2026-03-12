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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

export const ProblemSection = () => (
  <section
    id="problem"
    className="px-6 py-20 md:py-32 bg-white border-y border-slate-200/60 scroll-mt-14 overflow-x-clip"
  >
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* --- LEFT: TEXT CONTENT --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-left"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-[0.2em]">
            The Friction Point
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-black text-indigo-950 mb-8 leading-[1.1] tracking-tight"
        >
          WhatsApp is for chat. <br />
          <span className="text-indigo-600 italic font-serif font-light">
            Vaulty is for business.
          </span>
        </motion.h2>

        <div className="space-y-4 max-w-lg">
          {[
            {
              icon: FileWarning,
              text: "Links expire and media disappears from chat history.",
              color: "text-rose-600",
              bg: "bg-rose-50/30",
              border: "border-rose-100",
            },
            {
              icon: Search,
              text: "Hours wasted scrolling through threads to find one PDF.",
              color: "text-amber-600",
              bg: "bg-amber-50/30",
              border: "border-amber-100",
            },
            {
              icon: XCircle,
              text: "No way to track what's missing without manual checklists.",
              color: "text-indigo-600",
              bg: "bg-indigo-50/30",
              border: "border-indigo-100",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex items-start gap-4 p-4 md:p-5 rounded-2xl border-l-4 ${item.bg} ${item.border} ${item.color} transition-all hover:translate-x-1`}
            >
              <item.icon size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm md:text-[15px] font-bold text-slate-700 leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-slate-500 font-medium text-base leading-relaxed"
        >
          Stop chasing clients across fragmented apps. Centralize your documents
          in a secure portal that actually looks professional.
        </motion.p>
      </motion.div>

      {/* --- RIGHT: VISUAL PORTAL COMPONENT --- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 25, stiffness: 60 }}
        className="relative pt-10 lg:pt-0"
      >
        {/* Main Card */}
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] border border-slate-200/80 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 border-b border-slate-50 pb-6 gap-4">
            <div>
              <h3 className="font-black text-xl md:text-2xl text-indigo-950 tracking-tight">
                Client Portal
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">
                PROJECT: ONBOARDING — JAMES W.
              </p>
            </div>
            <div className="self-start sm:self-center">
              <span className="text-[10px] bg-indigo-600 text-white px-4 py-2 rounded-full font-black tracking-tighter">
                66% COLLECTED
              </span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Status: Done */}
            <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-bold text-emerald-900">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <span className="truncate">Signed Service Agreement</span>
              </div>
              <span className="text-[9px] text-emerald-600 font-black hidden sm:block">
                VERIFIED
              </span>
            </div>

            {/* Status: Done */}
            <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-bold text-emerald-900">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <span className="truncate">Bank Statement (Q3)</span>
              </div>
              <span className="text-[9px] text-emerald-600 font-black hidden sm:block">
                VERIFIED
              </span>
            </div>

            {/* Status: Waiting */}
            <motion.div
              animate={{ borderColor: ["#e2e8f0", "#818cf8", "#e2e8f0"] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white border-2 border-dashed text-sm font-bold text-indigo-950 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-500 animate-pulse" size={18} />
                <span className="truncate tracking-tight">
                  ID Verification (KYC)
                </span>
              </div>
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[9px] font-black">
                UPLOADING...
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Floating Accent - Hidden on small mobile */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-6 md:-bottom-12 md:-right-10 w-full h-full bg-linear-to-br from-indigo-50 to-blue-50/50 rounded-[4rem] -z-10"
        />

        {/* Floating Indicator for Desktop */}
        <div className="absolute -top-4 -left-4 md:-top-10 md:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:block animate-bounce [animation-duration:3s]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Live Sync
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
