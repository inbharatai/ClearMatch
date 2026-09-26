import React from 'react';
import { X, Printer, Download, Sparkles, Layers, GitBranch, Shield, CheckCircle2 } from 'lucide-react';
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

  const gapValue = calculation.discrepancyAmount || 10000;
  const gapUnits = calculation.quantityVariance || 20;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print-only-container">
      {/* Top Floating Control Bar (Hidden during Print) */}
      <div className="no-print fixed top-3 right-4 z-50 flex items-center gap-2">
        <a
          href="/api/download/presentation"
          download="ClearMatch_AI_Future_Enterprise_Innovation_One_Slide_Final.pptx"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 transition-all"
          title="Download the revised 16:9 PowerPoint presentation file"
        >
          <Download className="w-4 h-4" />
          <span>Download PPTX (69 KB)</span>
        </a>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
        >
          <Printer className="w-4 h-4 text-teal-400" />
          <span>Print Slide / PDF</span>
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Close Presentation View"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Presentation Line Banner (Above Slide) */}
      <div className="w-full max-w-6xl space-y-3">
        <div className="no-print p-3 sm:p-4 rounded-xl bg-slate-900 border border-teal-500/30 shadow-lg text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Suggested Presentation Line (Answers: “What would you build next with more time?”)
          </div>
          <p className="italic text-slate-100 pl-3 border-l-2 border-teal-400">
            “With more time, we would transform ClearMatch from a single invoice prototype into a governed enterprise exception-resolution platform—connected to enterprise systems, controlled by company policies and configurable across multiple functions.”
          </p>
        </div>

        {/* 16:9 Presentation Slide Canvas - Exactly matching user screenshot */}
        <div className="slide-16-9-printable w-full bg-[#F8FAFC] text-slate-900 border border-slate-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Main Top Area: 2 Columns (Left Content + Right Dark Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Area (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              {/* Header Title */}
              <div>
                <div className="text-[11px] font-bold tracking-widest text-[#0D7A68] uppercase mb-1">
                  INBHARAT.AI / ENTERPRISE AI / DAY-1 PROTOTYPE
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
                  ClearMatch AI
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-medium">
                  Rules detect the mismatch. AI explains the evidence around it.
                </p>
              </div>

              {/* WHY AI */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold tracking-wider text-[#0D7A68] uppercase">
                  WHY AI
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                  A finance rule can calculate 100 invoiced versus 80 received. It cannot reliably interpret the supplier’s email, identify contradictory claims or prepare the next evidence request.
                </p>
              </div>

              {/* Horizontal Pill Band (PO / Invoice / Receipt / Email) */}
              <div className="rounded-xl bg-[#E6F4F1] border border-[#BCE5DE] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">PO</span>
                  <span className="text-slate-700 font-medium">100 units</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Invoice</span>
                  <span className="text-slate-700 font-medium">100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Receipt</span>
                  <span className="text-slate-700 font-medium">80</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#0D7A68]">
                  <span>Email</span>
                  <span>20 arrive later</span>
                </div>
              </div>

              {/* 3 Pillars: Code verifies / AI interprets / Human decides */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Code verifies</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Decimal calculations, record matching and exact source checks.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">AI interprets</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connects correspondence to records, explains uncertainty and cites evidence.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Human decides</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reviews the evidence, edits the follow-up and authorizes any external action.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Dark Card (4 cols) */}
            <div className="lg:col-span-4 bg-[#0A2830] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-700">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#38E1B0] uppercase mb-2">
                  LIVE PROOF / SYNTHETIC CASE
                </div>
                <div className="text-4xl sm:text-5xl font-black text-[#38E1B0] tracking-tight mb-1 font-mono">
                  {formatInr(gapValue)}
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium">
                  {gapUnits}-unit gap valued at PO price
                </div>
              </div>

              <div className="space-y-1.5 text-sm sm:text-base font-bold text-white">
                <div>100 invoiced</div>
                <div>80 recorded received</div>
              </div>

              {/* Callout Box */}
              <div className="p-4 rounded-xl bg-[#071E25] border border-[#144B57] text-xs sm:text-sm text-[#CCFBF1] leading-relaxed">
                A supplier email provides evidence to interpret. It never provides authority to approve.
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                Demo: change the email, then the receipt. The arithmetic and AI response must change independently.
              </div>
            </div>
          </div>

          {/* Bottom Area: WHAT WE WOULD BUILD NEXT & FUTURE ROADMAP */}
          <div className="border-t border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="text-[11px] font-bold tracking-widest text-[#0D7A68] uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                WHAT WE WOULD BUILD NEXT
              </div>
              <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                FUTURE ROADMAP — NOT IMPLEMENTED TODAY
              </div>
            </div>

            {/* 3 Innovations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
              {/* Innovation 1 */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0D7A68] uppercase tracking-wide flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  1 EVIDENCE GRAPH
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  One auditable case history
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connects ERP records, emails, documents, claims and source excerpts into one auditable case history. Connect ERP, document and messaging systems.
                </p>
              </div>

              {/* Innovation 2 */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0D7A68] uppercase tracking-wide flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  2 POLICY + APPROVAL GATE
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Enterprise rules become enforceable
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enforces tolerances, role permissions, approval matrices and blocked-action rules before a case can progress.
                </p>
              </div>

              {/* Innovation 3 */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0D7A68] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  3 UNIVERSAL WORKFLOW BUILDER
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Configure new use cases
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lets companies configure ClearMatch for finance, procurement, contracts, operations and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
