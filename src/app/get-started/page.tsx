import Link from "next/link";

import { LoginForm } from "../login/LoginForm";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-lg text-indigo-950"
          >
            <span className="grid grid-cols-2 gap-0.5 p-1 bg-indigo-600 rounded-md shadow-sm shadow-indigo-200">
              <span className="w-2 h-2 bg-white/40 rounded-sm" />
              <span className="w-2 h-2 bg-white rounded-sm" />
              <span className="w-2 h-2 bg-white rounded-sm" />
              <span className="w-2 h-2 bg-white/40 rounded-sm" />
            </span>
            <span className="tracking-tight italic font-serif">Vaulty</span>
          </Link>
          <Link
            href="/login"
            className="text-[13px] font-bold text-slate-600 hover:text-indigo-600"
          >
            Already have an account?
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Get Started
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-indigo-950 leading-[1.05]">
              Spin up your client document portal.
            </h2>
            <p className="mt-4 text-sm md:text-base font-semibold text-slate-600 max-w-prose">
              Create a Vaulty workspace in under a minute. Start with email and add
              Google sign-in when you&apos;re ready.
            </p>

            <div className="mt-8 grid gap-3 text-[13px] font-semibold text-slate-600">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Unlimited client portals on the free tier
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Secure uploads with Supabase Auth
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Cancel any time, no card required
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <LoginForm initialMode="sign_up" showModeToggle={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

