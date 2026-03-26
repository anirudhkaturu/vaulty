"use client";

import { 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle, 
  Loader2,
  Check,
  X,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { getPresignedDownloadUrl, reviewDocumentAction } from "./actions";

interface Document {
  id: string;
  name: string;
  required: boolean | null;
  uploaded: boolean | null;
  reviewStatus?: string | null;
  rejectionReason?: string | null;
  file?: {
    id: string;
    fileName: string;
    filePath: string;
    fileSize: number | null;
  } | null;
}

interface RequestDocumentListProps {
  documents: Document[];
}

export function RequestDocumentList({ documents }: RequestDocumentListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handlePreview = async (docFileId: string | undefined) => {
    if (!docFileId) return;
    
    setLoadingId(docFileId);
    try {
      const url = await getPresignedDownloadUrl(docFileId);
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      alert("Failed to open preview");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReview = async (docId: string, status: "approved" | "rejected") => {
    if (status === "rejected" && !rejectionReason) {
      setRejectingId(docId);
      return;
    }

    setReviewingId(docId);
    try {
      await reviewDocumentAction(docId, status, status === "rejected" ? rejectionReason : undefined);
      setRejectingId(null);
      setRejectionReason("");
    } catch (err) {
      console.error(err);
      alert("Failed to update document status");
    } finally {
      setReviewingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Required Documents</h2>
        <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
          {documents.length} Items
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col gap-4 group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-colors ${
                  doc.reviewStatus === "approved" ? "bg-emerald-50 text-emerald-600" : 
                  doc.reviewStatus === "rejected" ? "bg-rose-50 text-rose-600" :
                  doc.uploaded ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"
                }`}>
                  {doc.reviewStatus === "approved" ? <CheckCircle2 size={18} /> : 
                   doc.reviewStatus === "rejected" ? <X size={18} /> :
                   <FileText size={18} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1 flex items-center gap-2">
                    {doc.name}
                    {doc.required && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-black uppercase tracking-tighter">
                        Required
                      </span>
                    )}
                    {doc.reviewStatus === "approved" && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-black uppercase tracking-tighter border border-emerald-100">
                        Approved
                      </span>
                    )}
                    {doc.reviewStatus === "rejected" && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-black uppercase tracking-tighter border border-rose-100">
                        Rejected
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                      doc.uploaded ? "text-emerald-600" : "text-slate-400"
                    }`}>
                      {doc.uploaded ? "Uploaded" : "Pending Client Upload"}
                    </span>
                    {doc.uploaded && doc.file && (
                      <span className="text-[10px] text-slate-300 font-medium truncate max-w-37.5 sm:max-w-xs">
                        • {doc.file.fileName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                {doc.uploaded && doc.file ? (
                  <>
                    <button 
                      onClick={() => handlePreview(doc.file?.id)}
                      disabled={loadingId === doc.file.id}
                      className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs uppercase tracking-wider disabled:opacity-50"
                      title="View Document"
                    >
                      {loadingId === doc.file.id ? <Loader2 size={12} className="animate-spin" /> : <ExternalLink size={12} />}
                      View
                    </button>
                    
                    <div className="w-px h-6 bg-slate-100 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      {doc.reviewStatus !== "approved" && (
                        <button 
                          onClick={() => handleReview(doc.id, "approved")}
                          disabled={reviewingId === doc.id}
                          className="h-8 px-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold hover:bg-emerald-100 transition-all flex items-center gap-1.5 uppercase tracking-wider disabled:opacity-50"
                        >
                          {reviewingId === doc.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                          Approve
                        </button>
                      )}

                      {doc.reviewStatus !== "rejected" && (
                        <button 
                          onClick={() => setRejectingId(doc.id)}
                          disabled={reviewingId === doc.id}
                          className="h-8 px-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[10px] font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5 uppercase tracking-wider disabled:opacity-50"
                        >
                          <X size={12} />
                          Reject
                        </button>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            {rejectingId === doc.id && (
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={14} className="text-rose-500" />
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Reason for Rejection</span>
                </div>
                <textarea 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Tell the client why this document was rejected..."
                  className="w-full h-24 bg-white border border-rose-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all resize-none mb-3"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => {
                      setRejectingId(null);
                      setRejectionReason("");
                    }}
                    className="h-8 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:bg-slate-100 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleReview(doc.id, "rejected")}
                    disabled={!rejectionReason || reviewingId === doc.id}
                    className="h-8 px-4 bg-rose-600 text-white rounded-lg text-[10px] font-bold hover:bg-rose-700 transition-all flex items-center gap-1.5 uppercase tracking-wider disabled:opacity-50"
                  >
                    {reviewingId === doc.id ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}

            {doc.reviewStatus === "rejected" && doc.rejectionReason && !rejectingId && (
              <div className="bg-rose-50/30 border border-rose-100/50 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest block">Previous Rejection Reason</span>
                  <p className="text-xs text-rose-700/80 font-medium italic">&quot;{doc.rejectionReason}&quot;</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
