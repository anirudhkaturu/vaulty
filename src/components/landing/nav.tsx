"use client";
import { motion } from "framer-motion";

export const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl transition-all">
    {/* Top Accent Line */}
    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent" />

    <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between relative">
      {/* --- LOGO (Your Exact Mark) --- */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 font-bold text-lg md:text-xl text-indigo-950 cursor-pointer z-10 shrink-0"
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

      {/* --- DESKTOP CENTERED NAV --- */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[13px] font-bold text-slate-500">
        {["Problem", "Solution", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-indigo-600 transition-colors relative group py-2"
          >
            {item}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
        ))}
      </div>

      {/* --- ACTIONS (Optimized for Mobile) --- */}
      <div className="flex items-center gap-1.5 md:gap-3 z-10">
        {/* Login: visible on all but the tiniest phones */}
        <button className="text-[12px] md:text-[13px] font-bold text-slate-600 px-3 md:px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95">
          Login
        </button>

        {/* CTA: Responsive padding */}
        <button className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-lg text-[12px] md:text-[13px] font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-95 whitespace-nowrap">
          Start Free
        </button>
      </div>
    </div>
  </nav>
);
