"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  index,
}: FeatureCardProps) => (
  <motion.div
    // Faster, cleaner entrance: Slide up from 20px with a slight scale up
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      type: "spring",
      damping: 20, // Less bounce, more "stop"
      stiffness: 150, // Higher tension for speed
      delay: index * 0.05, // Faster stagger (50ms vs 80ms)
    }}
    // Hover effect: Lifting the card slightly looks more premium than just a shadow
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative overflow-hidden p-8 rounded-4xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl transition-shadow group text-left"
  >
    {/* Refined Shine: Moved faster and narrower for a "flash" effect */}
    <motion.div
      initial={{ x: "-150%" }}
      whileInView={{ x: "150%" }}
      transition={{
        duration: 0.6, // Snappier flash
        delay: index * 0.05 + 0.3,
        ease: "easeInOut",
      }}
      className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-20 pointer-events-none"
    />

    {/* Icon Container: Scale up on group hover */}
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 border border-slate-100">
      <Icon size={24} />
    </div>

    <h4 className="font-bold mb-2 text-indigo-950 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
      {title}
    </h4>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);
