import React from 'react';
import { X, ShieldAlert, FileText, CheckCircle2, Lock, Cpu, Database } from 'lucide-react';

interface AuditDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditDisclosureModal: React.FC<AuditDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Compliance, Governance & Architectural Disclosures
            </h3>
            <span className="text-[11px] text-slate-400">
              ClearMatch AI Audit Specifications & Mandatory Invariants (Requirement 13)
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* Disclosure 1: Synthetic Data */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <Database className="w-3.5 h-3.5" />
              <span>1. Synthetic Data Disclosure</span>
            </div>
            <p>
              All corporate entities, invoice IDs (e.g. <code>INV-2026-4412</code>), purchase orders (<code>PO-8921</code>), receiving slips (<code>GRN-5510</code>), and vendor email communications used in this application are 100% synthetic test vectors generated specifically for accounts payable internal controls testing. No real customer data or PII is used.
            </p>
          </div>

          {/* Disclosure 2: Gemini Usage & Boundaries */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              <Cpu className="w-3.5 h-3.5" />
              <span>2. Gemini AI Integration & Server-Side Boundary</span>
            </div>
            <p>
              Gemini (specifically <code>gemini-3.8-flash</code> via the official <code>@google/genai</code> SDK) is executed strictly server-side inside the Express backend. The browser client never communicates with Gemini directly. Server API credentials and secrets are completely isolated from client bundles, HTML meta tags, and local storage. Upstream failures return honest technical errors with no deceptive canned fallbacks.
            </p>
          </div>

          {/* Disclosure 3: Public Dependencies */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>3. Public Dependencies Disclosed</span>
            </div>
            <p>
              This application relies exclusively on standard, publicly available open-source software libraries:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-400 font-mono text-[11px]">
              <li>React 19 & React DOM (UI framework)</li>
              <li>Tailwind CSS v4 (Styling)</li>
              <li>Express 4 (Backend API & server-side proxy)</li>
              <li>Vite 8 & @vitejs/plugin-react (Build toolchain)</li>
              <li>@google/genai (Official Google GenAI SDK)</li>
              <li>Lucide React (Standard vector iconography)</li>
              <li>TypeScript 7 & tsx (Strict typing & test runner)</li>
            </ul>
          </div>

          {/* Disclosure 4: Limitations & Human Governance */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>4. Operating Limitations & Human-in-the-Loop Governance</span>
            </div>
            <p>
              ClearMatch AI is a decision-support and reconciliation verification engine. It is strictly architected to prevent automated payment release: even when a 100-unit revised receipt clears all quantity and price variances, the system moves the status to <code>PENDING_HUMAN_APPROVAL</code>. Only authorized human finance personnel can sign off on financial disbursement.
            </p>
          </div>

          {/* Disclosure 5: Zero InBharat.ai Code Reuse */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-[11px]">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>5. Intellectual Property & Code Provenance Disclosure</span>
            </div>
            <p className="text-indigo-100 font-medium">
              We certify that <strong>no private, proprietary, or pre-existing InBharat.ai code</strong> was reused, adapted, or incorporated in the design or implementation of ClearMatch AI. All application architecture, matching algorithms, test suites, and presentation artifacts were authored from scratch to fulfill the audit requirements.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Disclosure
          </button>
        </div>
      </div>
    </div>
  );
};
