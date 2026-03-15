"use client";
import { motion } from "framer-motion";
import { Check, Sparkles, Shield, Clock, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

const features = [
  "Up to 25 active document requests",
  "Standard client portal (Vaulty branded)",
  "Automated weekly reminders",
  "AES-256 Cloud Storage",
  "Email Support (24h turnaround)",
  "PDF Exporting",
];

export const Pricing = () => (
  <section
    id="pricing"
    className="py-20 md:py-32 px-6 relative overflow-hidden bg-[#fafafa]"
  >
    {/* Subtle Background Pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    <div className="max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] md:text-[11px] font-black text-slate-600 mb-6 uppercase tracking-[0.2em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Public Beta Phase
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-indigo-950 mb-6 tracking-tight leading-[1.1]"
        >
          Start building your <br />
          <span className="text-indigo-600 font-serif italic font-normal">
            vault for $0.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-500 max-w-lg mx-auto font-medium text-sm md:text-base leading-relaxed px-4"
        >
          We&rsquo;re in closed beta. Join 200+ professionals automating their
          workflow. Get free access today and lock your price for life.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto relative"
      >
        {/* Floating Scarcity Tag */}
        <div className="absolute -top-4 -right-4 md:-right-8 bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1.5 rounded-xl rotate-12 shadow-xl z-20 border-2 border-white uppercase tracking-tighter">
          Limited Spots
        </div>

        <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)]">
          {/* Progress Bar (Scarcity) */}
          <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Beta Capacity
            </span>
            <span className="text-[11px] font-black text-indigo-600">
              84% FULL
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "84%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-indigo-600"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-2xl font-black text-indigo-950 mb-2">
                Beta Access Plan
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                Solo practitioners & small teams.
              </p>
            </div>

            <div className="mb-10 flex items-baseline justify-center md:justify-start gap-3">
              <span className="text-6xl font-black text-indigo-950 tracking-tighter">
                $0
              </span>
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold line-through text-sm leading-none">
                  $49/mo
                </span>
                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mt-1">
                  FREE FOREVER*
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 bg-indigo-50 rounded-full p-0.5 group-hover:bg-indigo-600 transition-colors">
                    <Check
                      size={12}
                      className="text-indigo-600 group-hover:text-white transition-colors"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="text-slate-600 font-bold text-sm leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/get-started"
              className="w-full h-16 bg-indigo-600 text-white rounded-[1.25rem] font-black text-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Claim Beta Access
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <div className="mt-8 flex items-center gap-2 justify-center text-slate-400">
              <span className="shrink-0">
                <Info size={14} />
              </span>
              <p className="text-[10px] md:text-[11px] font-bold leading-tight">
                *Price locked at $19/mo for extra seats (60% off).
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Markers - Optimized Grid */}
      <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
        {[
          {
            icon: Shield,
            title: "Data Privacy",
            desc: "GDPR & HIPAA compliant protocols.",
          },
          {
            icon: Sparkles,
            title: "Founding Perk",
            desc: "Lifetime discount on all future features.",
          },
          {
            icon: Clock,
            title: "Quick Setup",
            desc: "First request live in under 2 mins.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left group hover:border-indigo-200 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <item.icon size={24} strokeWidth={2} />
            </div>
            <h4 className="font-black text-indigo-950 mb-1 text-sm md:text-base uppercase tracking-tight">
              {item.title}
            </h4>
            <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-bold">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
