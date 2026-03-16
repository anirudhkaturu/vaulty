"use client";

import { useState } from "react";
import { FileText, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { createRequestAction } from "./actions";

interface Template {
  id: string;
  name: string;
}

export function SendRequestModal({ 
  clientId, 
  templates, 
  onClose 
}: { 
  clientId: string; 
  templates: Template[]; 
  onClose: () => void;
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSend() {
    if (!selectedTemplateId) return;
    
    setIsPending(true);
    try {
      await createRequestAction(clientId, selectedTemplateId);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      alert("Failed to send request");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      {/* Enhanced Glass Blur Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-4xl p-8 shadow-2xl border border-slate-200/60 max-w-md w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
            <Send size={24} />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-indigo-950 mb-2">Request Sent!</h3>
            <p className="text-sm text-slate-500 font-medium">
              The document request has been created successfully.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black text-indigo-950 tracking-tight mb-2">
              Send Request
            </h3>
            <p className="text-[13px] text-slate-500 mb-8 leading-relaxed font-medium">
              Select a template to request documents from this client.
            </p>

            <div className="space-y-4 mb-8">
              <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-1">
                Choose Template
              </label>
              {templates.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                  <p className="text-xs font-bold text-slate-400">No templates found.</p>
                  <p className="text-[10px] text-slate-300 uppercase mt-1">Create one in the templates section first.</p>
                </div>
              ) : (
                <div className="grid gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left group ${
                        selectedTemplateId === template.id
                          ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/10"
                          : "bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        selectedTemplateId === template.id
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500"
                      }`}>
                        <FileText size={16} />
                      </div>
                      <span className={`text-sm font-bold ${
                        selectedTemplateId === template.id ? "text-indigo-950" : "text-slate-600"
                      }`}>
                        {template.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={isPending || !selectedTemplateId}
              className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-300 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  Send Document Request
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
