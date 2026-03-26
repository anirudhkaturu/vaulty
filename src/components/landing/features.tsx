"use client";
import { motion } from "framer-motion";
import { BentoGrid } from "./bento-grid";

export const Features = () => (
  <section
    id="solution"
    className="px-6 py-16 md:py-24 max-w-7xl mx-auto overflow-x-clip scroll-mt-20"
  >
    {/* Header Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
    >
      <div className="max-w-2xl text-left">
        <h2 className="text-4xl md:text-7xl font-black text-indigo-950 mb-6 tracking-tight leading-[0.9] md:leading-[0.95]">
          Stop the WhatsApp <br />
          <span className="text-indigo-600 font-serif italic font-normal">
            document circus.
          </span>
        </h2>
        <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed max-w-xl">
          Vaulty replaces messy threads with a structured collection engine
          designed for professionals who handle high-volume client data.
        </p>
      </div>

      {/* Decorative Badge for Desktop */}
      <div className="hidden md:block">
        <div className="px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 font-black text-[10px] uppercase tracking-[0.25em]">
          Efficiency over bloat
        </div>
      </div>
    </motion.div>

    {/* The Bento Component */}
    <BentoGrid />
  </section>
);
