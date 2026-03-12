"use client";
import { motion } from "framer-motion";

export const Footer = () => (
  <footer className="bg-white py-12 px-6 border-t border-slate-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      {/* THE EXACT LOGO MARK */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 font-bold text-xl text-indigo-950 cursor-pointer z-10 mb-8"
      >
        <div className="grid grid-cols-2 gap-0.5 p-1 bg-indigo-600 rounded-md shadow-sm shadow-indigo-200">
          <div className="w-2 h-2 bg-white/40 rounded-sm animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-sm" />
          <div className="w-2 h-2 bg-white rounded-sm" />
          <div className="w-2 h-2 bg-white/40 rounded-sm animate-pulse [animation-delay:200ms]" />
        </div>
        <span className="tracking-tight italic font-serif text-indigo-950">
          Vaulty
        </span>
      </motion.div>

      {/* COMPACT NAV */}
      <nav className="flex items-center gap-x-8 gap-y-2 mb-8">
        {["Problem", "Solution", "Pricing", "Privacy"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* REFINED STATUS & LEGAL */}
      <div className="flex flex-col items-center gap-4 border-t border-slate-50 pt-8 w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
            Systems Nominal
          </span>
        </div>

        <div className="text-center">
          <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase">
            © 2026 Vaulty • Built for firms that value time.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
