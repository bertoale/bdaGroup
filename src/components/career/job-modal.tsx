"use client";

import React, { useEffect } from "react";
import { GrpJobPosition } from "@/db/schema";
import { X, Send } from "lucide-react";

interface JobModalProps {
  job: GrpJobPosition | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: GrpJobPosition) => void;
}

export function JobModal({ job, isOpen, onClose, onApply }: JobModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-brand-navy p-6 sm:p-8 text-white relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3 py-1 rounded-full mb-2">
                Open Position
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {job.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Full Description HTML */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Job Description & Role Overview
          </h4>

          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApply(job)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-gold hover:bg-amber-400 text-brand-navy font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Apply For This Position</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
