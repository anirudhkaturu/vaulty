import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Pricing } from "@/components/landing/pricing";

import "./globals.css"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 antialiased text-slate-900 overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
