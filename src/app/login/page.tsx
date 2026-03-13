import { LoginForm } from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
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
            href="/"
            className="text-[13px] font-bold text-slate-600 hover:text-indigo-600"
          >
            Back to site
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-indigo-700">
              Secure Sign-In
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-indigo-950 leading-[1.05]">
              Collect client documents without the chase.
            </h2>
            <p className="mt-4 text-sm md:text-base font-semibold text-slate-600 max-w-prose">
              Vaulty uses Supabase Auth to keep your portal secure. Use email/password
              or continue with Google.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-[12px] font-extrabold text-slate-800">
                Developer setup checklist
              </div>
              <ul className="mt-3 space-y-2 text-[13px] font-semibold text-slate-600">
                <li>
                  1) Add env vars in <code className="font-mono">.env.local</code>
                </li>
                <li>2) Enable Email + Google providers in Supabase</li>
                <li>
                  3) Add redirect URL:{" "}
                  <code className="font-mono">http://localhost:3000/auth/callback</code>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

