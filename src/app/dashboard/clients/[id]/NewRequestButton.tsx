"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SendRequestModal } from "../SendRequestModal";

interface Template {
  id: string;
  name: string;
}

export function NewRequestButton({ 
  clientId, 
  templates,
  variant = "primary"
}: { 
  clientId: string; 
  templates: Template[];
  variant?: "primary" | "ghost";
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "ghost") {
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          className="mt-4 text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-[0.2em]"
        >
          Create Request
        </button>
        {isOpen && (
          <SendRequestModal 
            clientId={clientId} 
            templates={templates} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="h-9 px-4 bg-indigo-600 text-white rounded-xl font-bold text-[11px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider"
      >
        <Plus size={14} strokeWidth={3} />
        New Request
      </button>

      {isOpen && (
        <SendRequestModal 
          clientId={clientId} 
          templates={templates} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
