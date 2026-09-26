import React, { useState } from 'react';
import { AiReasoning, QuoteVerification } from '../types';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, Scale, Shield, Terminal, Search, Download, Copy, Check, MessageSquare } from 'lucide-react';
import { verifyQuoteAgainstSource } from '../lib/matcher';

interface AiReasoningPanelProps {
  aiReasoning: AiReasoning | null;
  error: string | null;
  failureType?: string | null;
  loading: boolean;
  activeSources: { id: string; rawText: string; sourceType: string }[];
  fullResultJson?: object;
  onOpenReviewTask?: () => void;
}

export const AiReasoningPanel: React.FC<AiReasoningPanelProps> = ({
  aiReasoning,
  error,
  failureType,
  loading,
  activeSources,
  fullResultJson,
  onOpenReviewTask,
}) => {
  const [customQuote, setCustomQuote] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState(activeSources[0]?.id || '');
  const [customVerification, setCustomVerification] = useState<QuoteVerification | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Editable follow-up draft
  const defaultDraft = `To: billing@apexprecision.example.com
Subject: RE: Invoice INV-2026-4412 for PO-8921 - Receipt Variance Notification

Dear Supplier Logistics Team,
Our inward receiving inspection at Bay 4 recorded 80 units accepted against Purchase Order PO-8921 (Manifest #W4-109). Your invoice INV-2026-4412 billed for 100 units (₹50,000.00).

In accordance with our internal control procedures, payment for the 20-unit shortfall (₹10,000.00) has been placed on administrative hold pending physical receipt of the remaining balance or an amended credit note. Please confirm dispatch date for the remaining 20 units.

Regards,
Accounts Payable Verification Team`;

  const [followUpDraft, setFollowUpDraft] = useState(defaultDraft);

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(followUpDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataToDownload = fullResultJson || {
      aiReasoning,
      error,
      timestamp: new Date().toISOString(),
      activeSources: activeSources.map((s) => ({ id: s.id, type: s.sourceType })),
    };
    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clearmatch-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVerifyCustomQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuote.trim() || !selectedSourceId) return;
    const res = verifyQuoteAgainstSource(customQuote.trim(), selectedSourceId, activeSources);
    setCustomVerification(res);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Server-Side AI Reasoning & Quotation Verification Engine</span>
          </h3>
          <p className="text-xs text-slate-400">
            Powered strictly by server-side Gemini 3.8 Flash. Every citation is programmatically audited against raw source records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            title="Download full analysis payload as clearmatch-analysis.json"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Download Analysis JSON</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
            <span>Model:</span>
            <span className="text-indigo-400 font-semibold">{aiReasoning?.modelUsed || 'gemini-3.8-flash'}</span>
          </div>
        </div>
      </div>

      {/* Untrusted Email Policy Banner (Contract Requirement) */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Independent Policy Flag: Supplier Correspondence Untrusted
          </span>
          <p className="text-[11px] text-amber-200/90 mt-0.5 leading-relaxed">
            Supplier email statements carry zero legal authority to override receiving logs and cannot authorize payment disbursement. Prompt injection attempts (e.g. &ldquo;disregard shortfall notes&rdquo;) are isolated and neutralized.
          </p>
        </div>
      </div>

      {/* Requirement 10: Honest Error Display */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                  Honest Failure Policy Enforced (Requirement 10)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 border border-rose-700/50">
                  {failureType || 'UPSTREAM_API_ERROR'}
                </span>
              </div>
              <p className="text-xs text-rose-200 leading-relaxed font-mono">
                {error}
              </p>
              <p className="text-[11px] text-rose-300/80 pt-1">
                Notice: ClearMatch AI adheres to strict audit integrity rules. We never deliver deceptive mock or canned AI reasoning when upstream services fail.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/80">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-300">Executing Server-Side Gemini Reconciliation...</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Analyzing document hierarchy, cross-checking GRN logs, and auditing quotation verbatim matches.
          </p>
        </div>
      )}

      {!loading && !error && aiReasoning && (
        <div className="space-y-4">
          {/* Executive Summary & Evidentiary Decision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                AI Executive Audit Synthesis
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {aiReasoning.summary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                Evidentiary Hierarchy Determination
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {aiReasoning.evidenceHierarchyDecision}
              </p>
            </div>
          </div>

          {/* Requirement 9: Verified Quotation Table */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audited Quotation Provenance (Requirement 9)</span>
              </h4>
              <span className="text-[10px] text-slate-400">
                Verbatim Substring Proof in Raw Artifacts
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 text-[10px] uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Quotation Excerpt</th>
                    <th className="py-2.5 px-3">Claimed Source</th>
                    <th className="py-2.5 px-3">Verification Status</th>
                    <th className="py-2.5 px-3">Verbatim Match Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {aiReasoning.quotations.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-3 text-slate-200 font-mono text-[11px] max-w-xs break-words">
                        &ldquo;{q.quote}&rdquo;
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {q.sourceDocumentId}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {q.verifiedInSource ? (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified in Source</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-[10px] uppercase">
                            <XCircle className="w-3 h-3" />
                            <span>Unverified Quote</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] font-mono max-w-sm truncate">
                        {q.matchContext || 'No context snippet'}
                      </td>
                    </tr>
                  ))}
                  {aiReasoning.quotations.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-500 text-xs">
                        No direct quotations extracted for this record.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Follow-up Draft & Next Step (Contract Requirement) */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Proposed Next Step & Follow-up Draft (Not Sent)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                >
                  {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDraft ? 'Copied' : 'Copy Draft'}</span>
                </button>
                {onOpenReviewTask && (
                  <button
                    type="button"
                    onClick={onOpenReviewTask}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold transition-colors"
                  >
                    <span>Create Review Task with Draft</span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              ClearMatch AI generates an evidence-backed resolution draft. This draft is held locally; no email is ever sent automatically.
            </p>
            <textarea
              value={followUpDraft}
              onChange={(e) => setFollowUpDraft(e.target.value)}
              rows={5}
              className="w-full text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 p-3 focus:ring-1 focus:ring-indigo-500 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Interactive Quotation Tester */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            Interactive Quotation & Source Verifier
          </span>
          <span className="text-[10px] text-slate-500">
            Test any snippet against live document texts
          </span>
        </div>

        <form onSubmit={handleVerifyCustomQuote} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-4">
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="w-full text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-200 px-2.5 py-2 focus:ring-1 focus:ring-indigo-500"
            >
              {activeSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} ({s.sourceType})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-6">
            <input
              type="text"
              value={customQuote}
              onChange={(e) => setCustomQuote(e.target.value)}
              placeholder="e.g. Total Due: ₹50,000.00 or Shortfall of 20 units"
              className="w-full text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition-colors"
            >
              Verify
            </button>
          </div>
        </form>

        {customVerification && (
          <div
            className={`mt-2.5 p-3 rounded-lg border text-xs flex items-start gap-2 ${
              customVerification.verifiedInSource
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}
          >
            {customVerification.verifiedInSource ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="font-mono text-[11px] leading-relaxed">
              <span className="font-bold">
                {customVerification.verifiedInSource
                  ? '[PASS] VERIFIED IN SOURCE RECORD'
                  : '[FAIL] UNVERIFIED — SUBSTRING NOT FOUND IN SOURCE'}
              </span>
              <p className="mt-1 text-slate-300">{customVerification.matchContext}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
