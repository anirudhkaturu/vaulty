"use client";

import { useState, useEffect, useRef } from "react";
import { createClientAction } from "./actions";
import { X, Loader2, UserPlus } from "lucide-react";

export function AddClientForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when form opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createClientAction(formData);
      setIsOpen(false);
      // Optionally show a success toast here
    } catch {
      alert("Failed to add client");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 bg-linear-to-br from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 text-sm"
      >
        <UserPlus
          size={18}
          className="group-hover:scale-110 transition-transform"
        />
        Add New Client
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-out rounded-l-3xl border-l border-white/20">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-linear-to-br from-indigo-900 to-indigo-700 bg-clip-text text-transparent">
                Add New Client
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col min-h-0"
            >
              {/* Scrollable fields */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Full Name
                  </label>
                  <input
                    ref={nameInputRef}
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition-all"
                  />
                </div>

                {/* Notes - reduced rows to 2 to keep form compact */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Private Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="e.g. Needs tax documents for 2025..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Sticky footer with submit button - always visible */}
              <div className="border-t border-slate-100 p-6 bg-white/50 backdrop-blur-sm">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-linear-to-br from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {pending ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Client</span>
                      <span className="text-indigo-200 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
