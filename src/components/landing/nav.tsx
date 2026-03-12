"use client";
import { motion } from "framer-motion";

export const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl transition-all">
    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 font-bold text-xl text-indigo-950 cursor-pointer"
      >
        <div className="grid grid-cols-2 gap-0.5 p-1 bg-indigo-600 rounded-md shadow-sm shadow-indigo-200">
          <div className="w-2 h-2 bg-white/40 rounded-sm animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-sm" />
          <div className="w-2 h-2 bg-white rounded-sm" />
          <div className="w-2 h-2 bg-white/40 rounded-sm animate-pulse [animation-delay:200ms]" />
        </div>
        <span className="tracking-tight italic font-serif">Vaulty</span>
      </motion.div>

      <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-500">
        {["Problem", "Solution"].map((item) => (
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

      <div className="flex items-center gap-3">
        {/* Improved Login Button: Defined but Secondary */}
        <button className="hidden sm:block text-[13px] font-bold text-slate-600 px-4 py-2 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95">
          Login
        </button>

        {/* Primary CTA stays dominant */}
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
          Start Free
        </button>
      </div>
    </div>
  </nav>
);
