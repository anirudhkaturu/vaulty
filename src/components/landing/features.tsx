"use client";
import { BentoGrid } from "./bento-grid";

export const Features = () => (
  <section
    id="solution"
    className="px-6 py-24 max-w-7xl mx-auto overflow-hidden"
  >
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div className="max-w-2xl text-left">
        <h2 className="text-4xl md:text-6xl font-black text-indigo-950 mb-6 tracking-tight leading-[0.95]">
          Stop the WhatsApp <br />
          <span className="text-indigo-600 font-serif italic font-light">
            document circus.
          </span>
        </h2>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Vaulty replaces messy threads with a structured collection engine
          designed for accountants, legal teams, and agencies who handle
          high-volume client data.
        </p>
      </div>
      <div className="hidden md:block">
        <div className="px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em]">
          Efficiency over bloat
        </div>
      </div>
    </div>

    {/* The Bento Component */}
    <BentoGrid />
  </section>
);
