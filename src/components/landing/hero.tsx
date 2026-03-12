"use client";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    },
  },
};

const particles = [
  { top: "15%", left: "12%", delay: 0, size: "6px" },
  { top: "25%", left: "88%", delay: 1, size: "4px" },
  { top: "75%", left: "15%", delay: 2, size: "5px" },
  { top: "85%", left: "82%", delay: 1.5, size: "6px" },
  { top: "50%", left: "94%", delay: 0.5, size: "4px" },
];

export const Hero = () => (
  <section className="relative pt-20 pb-16 md:pt-32 md:pb-28 px-6 text-center overflow-x-clip bg-[#fafafa]">
    {/* --- BACKGROUND ELEMENTS --- */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[40%] bg-indigo-200/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
    </div>

    {/* Restoration of the Particles mapping */}
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:block opacity-40">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: p.delay }}
          className="absolute bg-indigo-400 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
        />
      ))}
    </div>

    {/* Desktop Only Floating Cards */}
    <div className="absolute inset-0 z-0 pointer-events-none hidden xl:block">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[8%] w-32 h-40 bg-white rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center -rotate-12"
      >
        <FileText size={40} className="text-indigo-100" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[25%] right-[10%] w-28 h-36 bg-white rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center rotate-12"
      >
        <ShieldCheck size={36} className="text-blue-100" />
      </motion.div>
    </div>

    {/* Grid Overlay */}
    <div
      className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(circle at center, black, transparent 90%)",
      }}
    />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="relative z-10 max-w-5xl mx-auto"
    >
      {/* Content stays the same... */}
      <motion.div variants={itemVariants} className="inline-block">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-600 mb-6 md:mb-8 uppercase tracking-[0.2em]">
          <Sparkles size={12} strokeWidth={3} />
          <span>The Modern Way to Collect</span>
        </div>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-8xl font-black tracking-tight text-indigo-950 mb-6 md:mb-8 leading-[1.05]"
      >
        Collect files <br className="hidden sm:block" />
        <span className="text-indigo-600 font-serif italic font-normal">
          without the chase.
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed px-4"
      >
        Ditch messy WhatsApp threads and email chains. A secure portal to
        request, verify, and organize client documents automatically.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-6"
      >
        <button className="w-full sm:w-auto h-16 px-10 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all group active:scale-95 shadow-xl shadow-indigo-500/20">
          Start your vault
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button className="w-full sm:w-auto h-16 px-10 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
          Watch Demo
        </button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="pt-8 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest px-4"
      >
        <span className="text-slate-500 w-full lg:w-auto mb-2 lg:mb-0">
          Trusted by:
        </span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-500" />
          Accounting
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-500" />
          Immigration
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-500" />
          Legal Teams
        </div>
      </motion.div>
    </motion.div>
  </section>
);
