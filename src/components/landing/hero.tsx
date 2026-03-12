"use client";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
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

// Defined static positions to avoid Math.random() impurity errors
const particles = [
  { top: "10%", left: "15%", delay: 0, size: "6px" },
  { top: "25%", left: "85%", delay: 1, size: "4px" },
  { top: "70%", left: "10%", delay: 2, size: "5px" },
  { top: "85%", left: "80%", delay: 1.5, size: "6px" },
  { top: "50%", left: "92%", delay: 0.5, size: "4px" },
];

export const Hero = () => (
  <section className="relative pt-24 pb-16 md:pt-32 md:pb-28 px-6 text-center overflow-hidden bg-[#fafafa]">
    {/* --- RICH AESTHETIC BACKGROUND --- */}

    {/* 1. Deep Layer: Soft Mesh & Beams */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-blob [animation-delay:4s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-indigo-500/10 to-transparent rotate-[-35deg]" />
    </div>

    {/* 2. Middle Layer: Floating "Document" Cards (Blurred) */}
    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] w-32 h-40 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl shadow-indigo-500/5 -rotate-12 flex items-center justify-center"
      >
        <FileText size={40} className="text-indigo-200" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[20%] right-[8%] w-28 h-36 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl shadow-blue-500/5 rotate-15 flex items-center justify-center"
      >
        <ShieldCheck size={36} className="text-blue-200" />
      </motion.div>
    </div>

    {/* 3. Sharp Layer: Floating Icons & Particles */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] hidden md:block">
      {/* Orbiting Icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border border-indigo-500/10 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-white rounded-lg shadow-sm border border-slate-100 -rotate-45">
          <Lock size={18} className="text-indigo-400" />
        </div>
      </motion.div>

      {/* Floating Sparkles/Particles (Fixed Positions) */}
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

    {/* 4. Fine Detail: Grid Mask */}
    <div
      className="absolute inset-0 z-0 opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
      }}
    />

    {/* --- CONTENT --- */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={
        {
          visible: { transition: { staggerChildren: 0.12 } },
        } as Variants
      }
      className="relative z-10 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="inline-block">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-black text-indigo-600 mb-8 uppercase tracking-[0.25em] shadow-sm">
          <Sparkles size={12} strokeWidth={3} className="animate-pulse" />
          <span>The Modern Way to Collect</span>
        </div>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-6xl md:text-8xl font-black tracking-tight text-indigo-950 mb-8 leading-[1.02]"
      >
        Collect files <br />
        <span className="text-indigo-600 font-serif italic font-normal">
          without the chase.
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-base md:text-xl text-slate-500 max-w-xl mx-auto mb-12 font-medium leading-relaxed"
      >
        Ditch the WhatsApp threads and messy email chains. A secure,
        white-labeled portal to request, verify, and organize client documents
        automatically.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <button className="h-16 px-10 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 group">
          Start your vault
          <ArrowRight
            size={22}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button className="h-16 px-10 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          Watch Demo
        </button>
      </motion.div>

      {/* --- SOCIAL PROOF / TRUST BAR --- */}
      <motion.div
        variants={itemVariants}
        className="pt-8 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-400 font-bold text-xs uppercase tracking-widest"
      >
        <span className="text-slate-500/80 font-black">Trusted by:</span>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Accounting Firms
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Immigration Agents
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Legal Teams
        </div>
      </motion.div>
    </motion.div>
  </section>
);
