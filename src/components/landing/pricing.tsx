"use client";
import { motion } from "framer-motion";
import { Check, Sparkles, Shield, Clock, ArrowRight, Info } from "lucide-react";

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
    className="py-24 px-6 relative overflow-hidden bg-[#fafafa]"
  >
    {/* Very subtle background pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    <div className="max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] font-bold text-slate-600 mb-4 uppercase tracking-widest"
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
          className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tight"
        >
          Start building your <br />
          <span className="text-indigo-600 font-serif italic font-light">
            vault for $0.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed"
        >
          We&rsquo;re currently in closed beta. Join 200+ professionals
          automating their workflow. Get free access today, and keep your price
          locked for life.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto relative"
      >
        <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
          {/* Progress Bar (Scarcity) */}
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-3 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              Beta Capacity
            </span>
            <span className="text-[11px] font-black text-indigo-600">
              84% FULL
            </span>
          </div>
          <div className="h-1 w-full bg-slate-100">
            <div className="h-full bg-indigo-600 w-[84%]" />
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-indigo-950">
                Beta Access Plan
              </h3>
              <p className="text-slate-500 text-sm">
                Perfect for solo practitioners & small teams.
              </p>
            </div>

            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-black text-indigo-950">$0</span>
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold line-through text-sm leading-none">
                  $49/mo
                </span>
                <span className="text-indigo-600 font-bold text-xs">
                  DURING BETA
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-indigo-600 mt-0.5 shrink-0"
                    strokeWidth={3}
                  />
                  <span className="text-slate-600 font-medium text-sm leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full h-14 bg-indigo-600 text-white rounded-2xl font-bold text-md hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2 group">
              Claim Beta Access
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <div className="mt-6 flex items-center gap-2 justify-center text-slate-400">
              <Info size={14} />
              <p className="text-[11px] font-medium italic">
                Price locked at $19/mo after beta ends (60% off).
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Realistic Trust Markers */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Data Privacy",
            desc: "GDPR & HIPAA compliant storage protocols.",
          },
          {
            icon: Sparkles,
            title: "Founding Perk",
            desc: "Lifetime discount on all future Pro features.",
          },
          {
            icon: Clock,
            title: "Quick Setup",
            desc: "Get your first request link live in under 2 mins.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-indigo-100 transition-colors"
          >
            <item.icon
              className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform"
              size={28}
              strokeWidth={1.5}
            />
            <h4 className="font-bold text-indigo-950 mb-2">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
