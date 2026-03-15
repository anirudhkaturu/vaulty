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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Glass Blur Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-indigo-950 tracking-tight">
                Confirm Deletion
              </h3>
              <button
                onClick={closeModal}
                disabled={isPending}
                className="text-slate-400 hover:text-slate-600 disabled:opacity-50 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to delete this template? This action is
              permanent and cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={isPending}
                className="px-4 py-2 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 rounded-xl font-bold text-sm text-white bg-rose-500 hover:bg-rose-600 transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? "Deleting..." : "Delete"}
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
