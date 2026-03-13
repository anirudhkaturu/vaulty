import { LoginForm } from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 flex flex-col">
      {/* Navigation Header */}
      <nav className="mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-6 md:py-8 shrink-0">
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
          href="/"
          className="text-xs md:text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
        >
          Back to site
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center">
        {/* max-w-6xl is the "Goldilocks" width (approx 1152px) */}
        <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Side: Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-6">
              <div className="hidden lg:inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 ring-1 ring-inset ring-indigo-200/50">
                Client Portal
              </div>

              <h1 className="mt-0 lg:mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-indigo-950 md:text-5xl lg:text-6xl text-center lg:text-left">
                Collect documents <br className="hidden sm:block" />
                <span className="text-slate-400">without the chase.</span>
              </h1>

              <p className="mt-4 lg:mt-6 text-sm md:text-base leading-relaxed text-slate-500 max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
                Sign in to your secure vault to manage document requests and
                keep your client data protected.
              </p>

              {/* Feature items */}
              <div className="mt-10 space-y-6 hidden sm:block">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-950">
                      Bank-grade security
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      AES-256 encryption for private files.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-950">
                      Automated reminders
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      We handle follow-ups automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="relative flex flex-col items-center lg:items-end order-1 lg:order-2 lg:pl-10">
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full bg-indigo-50/60 blur-3xl -z-10 lg:h-[130%] lg:w-[130%]" />

              <div className="w-full max-w-sm">
                <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(79,70,229,0.08)]">
                  <LoginForm />
                </div>
                <p className="mt-8 text-center text-[10px] md:text-[11px] font-medium text-slate-400 px-4 leading-relaxed">
                  By signing in, you agree to our{" "}
                  <span className="underline decoration-slate-200 cursor-pointer hover:text-slate-600 transition-colors">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="underline decoration-slate-200 cursor-pointer hover:text-slate-600 transition-colors">
                    Privacy Policy
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
