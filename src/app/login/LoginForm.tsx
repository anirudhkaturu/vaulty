"use client";

import { useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type Mode = "sign_in" | "sign_up";

type Props = {
  initialMode?: Mode;
  showModeToggle?: boolean;
};

export function LoginForm({ initialMode = "sign_in", showModeToggle = true }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const result =
        mode === "sign_in"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (result.error) throw result.error;

      // If email confirmations are enabled, signUp won't create a session yet.
      if (mode === "sign_up" && !result.data.session) {
        setMessage("Check your email to confirm your account, then come back to log in.");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      const text = err instanceof Error ? err.message : "Login failed";
      setMessage(text);
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setMessage(null);
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
    } catch (err) {
      const text = err instanceof Error ? err.message : "Google sign-in failed";
      setMessage(text);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-7 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
                Vaulty
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-indigo-950">
                {mode === "sign_in" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {mode === "sign_in"
                  ? "Sign in to your portal."
                  : "Sign up with email, then connect Google if you want."}
              </p>
            </div>
            {showModeToggle ? (
              <button
                type="button"
                onClick={() => setMode(mode === "sign_in" ? "sign_up" : "sign_in")}
                className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-100 active:scale-[0.99]"
                disabled={loading}
              >
                {mode === "sign_in" ? "Create account" : "I have an account"}
              </button>
            ) : null}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={onGoogle}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-bold text-slate-800 shadow-sm hover:bg-slate-50 active:scale-[0.99] disabled:opacity-60"
            >
              Continue with Google
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              or
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={onEmailSubmit} className="space-y-4">
            <label className="block">
              <div className="mb-1.5 text-[12px] font-extrabold text-slate-700">
                Email
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                placeholder="you@company.com"
                disabled={loading}
              />
            </label>

            <label className="block">
              <div className="mb-1.5 text-[12px] font-extrabold text-slate-700">
                Password
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                autoComplete={mode === "sign_in" ? "current-password" : "new-password"}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                placeholder="••••••••"
                disabled={loading}
              />
            </label>

            {message ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] font-semibold text-slate-700">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-[13px] font-extrabold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading
                ? "Working…"
                : mode === "sign_in"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-[12px] font-bold text-slate-500">
            By continuing you agree to your Terms & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}

