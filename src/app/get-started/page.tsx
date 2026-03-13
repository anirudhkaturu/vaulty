import Link from "next/link";
import { LoginForm } from "../login/LoginForm";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 flex flex-col">
      {/* Navigation Header */}
      <nav className="mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-8 shrink-0">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="grid grid-cols-2 gap-0.5 rounded-lg bg-indigo-600 p-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-xs bg-white/40" />
            <span className="h-2 w-2 rounded-xs bg-white" />
            <span className="h-2 w-2 rounded-xs bg-white" />
            <span className="h-2 w-2 rounded-xs bg-white/40" />
          </div>
          <span className="font-serif text-xl italic tracking-tight text-indigo-950">
            Vaulty
          </span>
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
        >
          Already have an account?{" "}
          <span className="text-indigo-600 font-bold ml-1">Sign in</span>
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-275 px-6 py-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Side: Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 ring-1 ring-inset ring-indigo-200/50">
                Workspace Setup
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-indigo-950 md:text-5xl lg:text-6xl">
                Spin up your <br />
                <span className="text-slate-400">client portal.</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-500 max-w-sm">
                Create a Vaulty workspace in under a minute. Secure, automated,
                and designed for high-stakes document collection.
              </p>

              {/* Refined Feature List */}
              <div className="mt-10 space-y-5">
                {[
                  "Unlimited client portals on the free tier",
                  "Secure uploads with Supabase Auth",
                  "No credit card required to start",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="relative flex flex-col items-center lg:items-end">
              {/* Background Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] rounded-full bg-indigo-50/40 blur-3xl -z-10" />

              <div className="w-full max-w-sm">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(79,70,229,0.1)]">
                  {/* Passing initialMode="sign_up" and hiding the toggle to keep them focused on signing up */}
                  <LoginForm initialMode="sign_up" showModeToggle={false} />
                </div>
                <p className="mt-6 text-center text-[11px] font-medium text-slate-400">
                  By joining, you agree to our{" "}
                  <span className="underline decoration-slate-200 cursor-pointer hover:text-slate-600 transition-colors">
                    Terms of Service
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
