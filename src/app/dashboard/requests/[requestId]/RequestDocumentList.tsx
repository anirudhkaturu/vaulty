"use client";

import { FileText, CheckCircle2, Download, ExternalLink, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { getPresignedDownloadUrl } from "./actions";

interface Document {
  id: string;
  name: string;
  required: boolean | null;
  uploaded: boolean | null;
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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (docFileId: string | undefined, fileName: string) => {
    if (!docFileId) return;
    
    setDownloadingId(docFileId);
    try {
      const url = await getPresignedDownloadUrl(docFileId);
      
      // Open in new tab or trigger direct download
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      link.setAttribute('target', '_blank');
      window.document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to download file");
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePreview = async (docFileId: string | undefined) => {
    if (!docFileId) return;
    
    setDownloadingId(docFileId);
    try {
      const url = await getPresignedDownloadUrl(docFileId);
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      alert("Failed to open preview");
    } finally {
      setDownloadingId(null);
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
          <div key={doc.id} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-colors ${
                doc.uploaded ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
              }`}>
                {doc.uploaded ? <CheckCircle2 size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1 flex items-center gap-2">
                  {doc.name}
                  {doc.required && (
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-black uppercase tracking-tighter">
                      Required
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                    doc.uploaded ? "text-emerald-600" : "text-slate-400"
                  }`}>
                    {doc.uploaded ? "Uploaded" : "Pending Action"}
                  </span>
                  {doc.uploaded && doc.file && (
                    <span className="text-[10px] text-slate-300 font-medium truncate max-w-[150px] sm:max-w-xs">
                      • {doc.file.fileName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              {doc.uploaded && doc.file ? (
                <>
                  <button 
                    onClick={() => handleDownload(doc.file?.id, doc.file?.fileName || 'download')}
                    disabled={downloadingId === doc.file.id}
                    className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs uppercase tracking-wider disabled:opacity-50"
                  >
                    {downloadingId === doc.file.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                    Download
                  </button>
                  <button 
                    onClick={() => handlePreview(doc.file?.id)}
                    disabled={downloadingId === doc.file.id}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-xs disabled:opacity-50"
                  >
                    <ExternalLink size={12} />
                  </button>
                </>
              ) : (
                <button className="h-8 px-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-all flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle size={12} />
                  Remind Client
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
