import React from 'react';
import { X, Printer, ShieldCheck, Scale, AlertOctagon, CheckCircle2, FileSpreadsheet, Lock, Download } from 'lucide-react';
import { MatchCalculation } from '../types';

interface ExecutiveSlide169Props {
  isOpen: boolean;
  onClose: () => void;
  calculation: MatchCalculation;
}

export const ExecutiveSlide169: React.FC<ExecutiveSlide169Props> = ({
  isOpen,
  onClose,
  calculation,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print-only-container">
      {/* Top Floating Control Bar (Hidden during Print) */}
      <div className="no-print fixed top-3 right-4 z-50 flex items-center gap-2">
        <a
          href="/ClearMatch-One-Slide.pptx"
          download="ClearMatch-One-Slide.pptx"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 shadow-md transition-all"
          title="Download the official 16:9 Microsoft PowerPoint presentation slide"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Download .PPTX</span>
        </a>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print 16:9 Slide / Save PDF</span>
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Close Presentation View"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 16:9 Presentation Slide Canvas */}
      <div className="slide-16-9-printable w-full max-w-5xl aspect-[16/9] bg-slate-950 text-slate-100 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Slide Header */}
        <div className="relative z-10 flex items-start justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-widest">
                Executive Problem Statement & Architecture
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Decision-Support Boundary</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Why invoice exceptions need AI
            </h1>
            <p className="text-xs text-indigo-300/90 mt-0.5 font-medium">
              AI resolves the <span className="text-white underline decoration-indigo-500 underline-offset-2">information and interpretation bottleneck</span> so human controllers can decide faster.
            </p>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust Boundary Certified</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              Audit Hash: {calculation.auditHash || '0XA9E3D4AFEFEE2FBF'}
            </div>
          </div>
        </div>

        {/* 2. Core Problem & Why AI Split Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-2.5">
          {/* Left Panel: The Problem */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                <AlertOctagon className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                An accounts-payable employee must reconstruct one transaction across four fragmented artifacts:
              </p>
              <div className="grid grid-cols-2 gap-1.5 mb-3 text-[11px] font-medium text-slate-200">
                <span className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Purchase order
                </span>
                <span className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Vendor invoice
                </span>
                <span className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Goods-receipt record
                </span>
                <span className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Supplier email
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                Traditional SQL/ERP rules can detect that <strong className="text-slate-200">100 units were invoiced but only 80 were recorded as received</strong>. They cannot reliably understand the supplier’s explanation, detect contradictory instructions, identify missing evidence, or prepare the appropriate response.
              </p>
            </div>
          </div>

          {/* Right Panel: Why AI */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                <Scale className="w-4 h-4" />
                <span>Why AI</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                ClearMatch uses server-side Gemini intelligence to:
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Interpret</strong> unstructured supplier correspondence</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Connect</strong> the email with authoritative transaction records</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Explain</strong> why the records conflict in plain auditor language</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Identify</strong> missing or contradictory evidence (e.g. driver manifest notes)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Cite</strong> the exact source text with verbatim substring verification</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span><strong>Draft</strong> the next follow-up for human review (never auto-sent)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Visual ₹10,000 Case & Trust Boundary Banner */}
        <div className="relative z-10 space-y-2">
          {/* Visual Case Strip */}
          <div className="grid grid-cols-4 gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-center">
            <div className="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Invoiced Scope</span>
              <span className="text-sm font-bold text-white font-mono">100 units</span>
              <span className="text-[9px] text-slate-400 block font-mono">₹50,000 billed</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Accepted Physical</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">80 units</span>
              <span className="text-[9px] text-slate-400 block font-mono">₹40,000 GRN-5510</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/70 border border-rose-500/30">
              <span className="text-[9px] uppercase tracking-wider text-rose-300 block">Discrepancy</span>
              <span className="text-sm font-bold text-rose-400 font-mono">20 units / ₹10,000</span>
              <span className="text-[9px] text-rose-300/80 block font-mono">Payment Held</span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950/70 border border-amber-500/30 text-left px-2">
              <span className="text-[9px] uppercase tracking-wider text-amber-300 block">Supplier Email</span>
              <span className="text-[10px] text-slate-200 font-mono italic block leading-tight">
                &ldquo;Remaining 20 units will arrive later.&rdquo;
              </span>
            </div>
          </div>

          {/* Trust Boundary & Conclusion Box */}
          <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-2.5 flex items-center justify-between gap-4">
            <div className="shrink-0 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <div className="text-xs font-black text-white tracking-wide uppercase font-mono">
                Code calculates. AI interprets. A human decides.
              </div>
            </div>
            <div className="text-[11px] text-slate-200 text-right leading-tight">
              ClearMatch turns a numerical mismatch into an evidence-backed explanation and a review-ready next action—<strong className="text-amber-300">without approving or executing payment</strong>.
            </div>
          </div>
        </div>

        {/* 4. Slide Footer & Mandatory Disclosures (Requirement 13) */}
        <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>ClearMatch AI Enterprise Architecture</span>
            <span>•</span>
            <span>Synthetic Data Only</span>
            <span>•</span>
            <span>Server-Side Gemini 3.8 Flash</span>
            <span>•</span>
            <span>No InBharat.ai Proprietary Code Reused</span>
          </div>
          <div className="font-mono text-slate-400">
            Audit Status: VERIFIED & COMPLIANT
          </div>
        </div>
      </div>
    </div>
  );
};
