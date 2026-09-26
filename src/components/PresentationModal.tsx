import React from 'react';
import { X, Download, Presentation, Sparkles, Shield, GitBranch, Layers, CheckCircle2 } from 'lucide-react';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Executive Briefing Slide &amp; Future Enterprise Roadmap
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  16:9 Widescreen PPTX
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Directly answers: <span className="text-slate-200 italic">“What would you build next with more time?”</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/api/download/presentation"
              download="ClearMatch_AI_Future_Enterprise_Innovation_One_Slide_Final.pptx"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-teal-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PPTX (69 KB)</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: The High-Fidelity Slide Representation */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[78vh] space-y-5 bg-slate-950/40">
          {/* Executive Presentation Line Callout */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 shadow-inner">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Suggested Presentation Line
            </div>
            <blockquote className="text-sm sm:text-base text-slate-200 italic pl-3 border-l-2 border-teal-400">
              “With more time, we would transform ClearMatch from a single invoice prototype into a governed enterprise exception-resolution platform—connected to enterprise systems, controlled by company policies and configurable across multiple functions.”
            </blockquote>
          </div>

          {/* Slide Visual Mockup (16:9 Aspect Ratio Container) */}
          <div className="rounded-2xl border border-slate-700 bg-white shadow-2xl overflow-hidden text-slate-900">
            {/* Top Half: Split into Left Content Area and Right Dark Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
              {/* Left Column (8 of 12) */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-50/50">
                {/* Header Tag + Title */}
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-teal-700 uppercase mb-1">
                    INBHARAT.AI / ENTERPRISE AI / DAY-1 PROTOTYPE
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
                    ClearMatch AI
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 font-medium">
                    Rules detect the mismatch. AI explains the evidence around it.
                  </p>
                </div>

                {/* WHY AI Section */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold tracking-wider text-teal-700 uppercase">
                    WHY AI
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                    A finance rule can calculate 100 invoiced versus 80 received. It cannot reliably interpret the supplier’s email, identify contradictory claims or prepare the next evidence request.
                  </p>
                </div>

                {/* Horizontal Pill Band (PO / Invoice / Receipt / Email) */}
                <div className="rounded-xl bg-[#E6F4F1] border border-[#BCE5DE] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">PO</span>
                    <span className="text-slate-700 font-medium">100 units</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">Invoice</span>
                    <span className="text-slate-700 font-medium">100</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">Receipt</span>
                    <span className="text-slate-700 font-medium">80</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-teal-800">
                    <span>Email</span>
                    <span>20 arrive later</span>
                  </div>
                </div>

                {/* 3 Verification Pillars */}
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

              {/* Right Column: Dark Sidebar (4 of 12) */}
              <div className="lg:col-span-4 bg-[#0A2830] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-700">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-[#38E1B0] uppercase mb-2">
                    LIVE PROOF / SYNTHETIC CASE
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-[#38E1B0] tracking-tight mb-1 font-mono">
                    ₹10,000
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    20-unit gap valued at PO price
                  </div>
                </div>

                <div className="space-y-1.5 text-sm sm:text-base font-bold text-white">
                  <div>100 invoiced</div>
                  <div>80 recorded received</div>
                </div>

                {/* Dark Inner Callout */}
                <div className="p-4 rounded-xl bg-[#071E25] border border-[#144B57] text-xs sm:text-sm text-[#CCFBF1] leading-relaxed">
                  A supplier email provides evidence to interpret. It never provides authority to approve.
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                  Demo: change the email, then the receipt. The arithmetic and AI response must change independently.
                </div>
              </div>
            </div>

            {/* Bottom Half: Future Roadmap (What We Would Build Next) */}
            <div className="border-t border-slate-200 bg-white p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="text-[11px] font-bold tracking-widest text-teal-700 uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  WHAT WE WOULD BUILD NEXT
                </div>
                <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                  FUTURE ROADMAP — NOT IMPLEMENTED TODAY
                </div>
              </div>

              {/* 3 Enterprise Innovations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Innovation 1 */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wide flex items-center gap-1.5">
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
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wide flex items-center gap-1.5">
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
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wide flex items-center gap-1.5">
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

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Strict disclosure: All future capabilities marked clearly to avoid overclaiming.</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/download/presentation"
              download="ClearMatch_AI_Future_Enterprise_Innovation_One_Slide_Final.pptx"
              className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct Link: ClearMatch_AI_Future_Enterprise_Innovation_One_Slide_Final.pptx</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
