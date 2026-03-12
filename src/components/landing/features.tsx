"use client";
import { motion } from "framer-motion";
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
    className="px-6 py-28 max-w-7xl mx-auto text-center overflow-visible"
  >
    <div className="mb-20">
      <h2 className="text-4xl font-black text-indigo-950 mb-4">
        Everything you need.
      </h2>
      <p className="text-indigo-600 font-black uppercase text-xs tracking-widest">
        Efficiency over bloat
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 perspective-[1500px]">
      {features.map((f, i) => (
        <FeatureCard key={i} index={i} {...f} />
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0, rotateX: 90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true }}
      style={{ transformOrigin: "bottom" }}
      transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.4 }}
    >
      <button className="h-16 px-14 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl active:scale-95 transition-all">
        Start your free trial
      </button>
    </motion.div>
  </section>
);
