"use client";
import { Zap, FileText, LayoutGrid, ShieldCheck } from "lucide-react";
import { FeatureCard } from "@/components/landing/feature-card";

const features = [
  {
    icon: Zap,
    title: "Auto Reminders",
    desc: "Automated follow-ups until the job is done.",
  },
  {
    icon: FileText,
    title: "Audit Trail",
    desc: "Every upload is logged for complete compliance.",
  },
  {
    icon: LayoutGrid,
    title: "AI OCR",
    desc: "Coming soon: Automated data extraction.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Vault",
    desc: "Bank-grade encryption for all client assets.",
  },
];

export const Features = () => (
  <section
    id="solution"
    /* Reduced py-28 to pt-24 pb-12 to remove the bottom void */
    className="px-6 pt-24 pb-12 max-w-7xl mx-auto text-center overflow-visible"
  >
    <div className="mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tight">
        Everything you need, <br />
        <span className="text-indigo-600 font-serif italic font-light">
          nothing you don&rsquo;t.
        </span>
      </h2>
      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
        Efficiency over bloat
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1500px]">
      {features.map((f, i) => (
        <FeatureCard key={i} index={i} {...f} />
      ))}
    </div>

    {/* Empty motion.div and extra mb-20 removed to snap the next section closer */}
  </section>
);
