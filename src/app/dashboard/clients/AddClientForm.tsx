"use client";

import { useState } from "react";
import { createClientAction } from "./actions";
import { X, Loader2 } from "lucide-react";

export function AddClientForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createClientAction(formData);
      setIsOpen(false);
    } catch (error) {
      alert("Failed to add client");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm"
      >
        Add New Client
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Slide-over */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-black text-indigo-950">Add New Client</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Private Notes
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="e.g. Needs tax documents for 2025..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {pending ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Save Client"
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
