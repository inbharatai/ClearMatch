import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { MatchCalculation } from '../types';

interface HumanReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: MatchCalculation;
  onTaskCreated: () => void;
}

export const HumanReviewModal: React.FC<HumanReviewModalProps> = ({
  isOpen,
  onClose,
  calculation,
  onTaskCreated,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [assignee, setAssignee] = useState('Ananya Deshmukh (Lead AP Auditor)');
  const [confirmedBy, setConfirmedBy] = useState('K. Ramanathan (Finance Controller)');
  const [notes, setNotes] = useState(
    'Discrepancy of 20 units (₹10,000) flagged against INV-2026-4412. Physical receiving note GRN-5510 confirmed 80 units accepted. Authorizing dock inspection review.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Requirement 11: Client-side gate
    if (!confirmed) {
      setApiError('Explicit human confirmation is mandatory before creating an audit review task.');
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: 'PO-8921/INV-2026-4412',
          title: `AP Variance Investigation: 20-Unit Shortfall (₹${calculation.discrepancyAmount.toLocaleString('en-IN')})`,
          discrepancyAmount: calculation.discrepancyAmount,
          quantityVariance: calculation.quantityVariance,
          priority: 'HIGH',
          assignee,
          confirmedByHuman: confirmed, // Must be true!
          confirmedBy,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create review task');
      }

      onTaskCreated();
      onClose();
    } catch (err: any) {
      setApiError(err.message || 'Network error creating task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Create AP Audit Review Task
            </h3>
            <span className="text-[11px] text-amber-400 font-medium">
              Mandatory Human-in-the-Loop Signoff (Requirement 11)
            </span>
          </div>
        </div>

        {apiError && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 font-mono">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Discrepancy Amount</span>
              <span className="text-sm font-bold text-rose-400 font-mono">
                ₹{calculation.discrepancyAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Quantity Variance</span>
              <span className="text-sm font-bold text-rose-400 font-mono">
                {calculation.quantityVariance} Units
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Assigned AP Auditor
            </label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Authorizing Officer
            </label>
            <input
              type="text"
              value={confirmedBy}
              onChange={(e) => setConfirmedBy(e.target.value)}
              className="w-full text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Audit Notes & Investigation Instructions
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Requirement 11: Explicit Confirmation Checkbox */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/40">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="text-xs text-indigo-200 leading-snug">
                <span className="font-bold text-white block mb-0.5">
                  Explicit Human Authorization Required:
                </span>
                I confirm that I have reviewed the physical receiving records and officially authorize creating this investigation task. Automated creation without human approval is strictly prohibited.
              </div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!confirmed || isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg shadow-md shadow-rose-600/20 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authorizing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Confirm & Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
