"use client";

import { useState } from "react";
import { 
  Upload, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Lock,
  ChevronRight
} from "lucide-react";
import { UploadItem } from "./UploadItem";

interface Document {
  id: string;
  name: string;
  required: boolean | null;
  uploaded: boolean | null;
  reviewStatus?: string | null;
  rejectionReason?: string | null;
}

interface RequestData {
  id: string;
  clientId: string;
  status: string | null;
  client: {
    name: string;
  };
  documents: Document[];
}

export function UploadPortal({ 
  request, 
  token 
}: { 
  request: RequestData; 
  token: string 
}) {
  const [documents, setDocuments] = useState<Document[]>(request.documents);
  const uploadedCount = documents.filter(d => d.uploaded).length;
  const totalCount = documents.length;
  const isComplete = uploadedCount === totalCount && totalCount > 0;

  const handleUploadComplete = (docId: string) => {
    setDocuments(prev => prev.map(d => 
      d.id === docId ? { ...d, uploaded: true } : d
    ));
  };

  if (request.status === "completed") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-4xl p-12 border border-slate-200/60 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-100 mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-indigo-950 tracking-tighter mb-4">
            Request Finalized
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            All your documents have been reviewed and approved. This request is now complete and secured in our vault.
          </p>
          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 opacity-40 grayscale mb-2">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Securely Stored</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Powered by Vaulty Inc.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-indigo-950 tracking-tight leading-none mb-1">Vaulty</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Document Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested by</span>
              <span className="text-sm font-bold text-indigo-950">Vaulty Business</span>
            </div>
            <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest">Client</span>
              <span className="text-sm font-bold text-indigo-600">{request.client.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-[1fr,320px] gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50">
                <Clock size={12} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Pending Documents</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-indigo-950 tracking-tighter leading-[1.1]">
                {isComplete ? "All documents uploaded" : "Complete your document request"}
              </h2>
              <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl">
                Please upload the following documents to complete your request. All files are encrypted and stored securely.
              </p>
            </div>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <UploadItem 
                  key={doc.id} 
                  document={doc} 
                  token={token} 
                  onComplete={() => handleUploadComplete(doc.id)}
                />
              ))}
            </div>

            {isComplete && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex items-start gap-6 animate-in zoom-in-95 duration-500">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-emerald-950 mb-2">Thank You!</h3>
                  <p className="text-sm text-emerald-800/80 font-medium leading-relaxed">
                    All requested documents have been successfully uploaded and received. You can now close this window.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          <aside className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-4xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Upload size={80} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-indigo-950 uppercase tracking-widest mb-6">Your Progress</h3>
                
                <div className="flex items-end justify-between mb-4">
                  <span className="text-6xl font-black text-indigo-950 tracking-tighter">{uploadedCount}</span>
                  <div className="flex flex-col items-end pb-1">
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">of {totalCount}</span>
                    <span className="text-xs font-bold text-indigo-600">Documents</span>
                  </div>
                </div>

                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-8 border border-slate-50">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${(uploadedCount / totalCount) * 100}%` }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Lock size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <ShieldCheck size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Secure Cloud Storage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-950 rounded-4xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/10 transition-all duration-500" />
              <h4 className="text-sm font-black uppercase tracking-widest mb-3 opacity-60">Need help?</h4>
              <p className="text-xs font-medium text-indigo-200/80 leading-relaxed mb-6">
                If you encounter any issues or have questions about this request, please contact your business representative.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-indigo-200 transition-colors">
                Contact Support <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-200/60 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-40 grayscale">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Powered by Vaulty Security</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © 2026 Vaulty Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
