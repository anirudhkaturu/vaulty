"use client";

import { Trash2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { deleteTemplateAction } from "../actions";

export function DeleteTemplateButton({ templateId }: { templateId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsPending(true);
    setError(null);
    try {
      await deleteTemplateAction(templateId);
      setShowModal(false);
    } catch (err: unknown) {
      // Fixed: Changed 'any' to 'unknown'
      console.error("Error deleting template:", err);

      // Type guard to safely access the error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }

      setShowModal(false);
    } finally {
      setIsPending(false);
    }
  }

  const openModal = () => {
    setShowModal(true);
    setError(null);
  };

  const closeModal = () => {
    if (!isPending) {
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={isPending}
        className="h-9 px-4 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
        Delete Template
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
        >
          {/* Enhanced Glass Blur Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-200/60 max-w-sm w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-sm border border-rose-100/50">
                <Trash2 size={24} />
              </div>
              <button
                onClick={closeModal}
                disabled={isPending}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-black text-indigo-950 tracking-tight mb-2">
              Confirm Deletion
            </h3>

            <p className="text-[13px] text-slate-500 mb-8 leading-relaxed font-medium">
              Are you sure you want to delete this template? This action is
              permanent and cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={closeModal}
                disabled={isPending}
                className="w-full sm:flex-1 h-11 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-full sm:flex-1 h-11 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Delete Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide">
            Error:
          </span>
          <p className="text-[13px] font-medium">{error}</p>
        </div>
      )}
    </>
  );
}
