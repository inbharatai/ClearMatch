import React from 'react';
import { ScenarioType } from '../types';
import { AlertTriangle, MailWarning, FileCheck2, FileQuestion, SlidersHorizontal, Bug, Sparkles } from 'lucide-react';

interface ScenarioSelectorProps {
  currentScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  simulateFailure: boolean;
  onToggleSimulateFailure: (val: boolean) => void;
  onRunReconciliation: () => void;
  loading: boolean;
  consentToSend: boolean;
  onToggleConsent: (val: boolean) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  currentScenario,
  onSelectScenario,
  simulateFailure,
  onToggleSimulateFailure,
  onRunReconciliation,
  loading,
  consentToSend,
  onToggleConsent,
}) => {
  const scenarios: {
    id: ScenarioType;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
  }[] = [
    {
      id: 'DEFAULT_PARTIAL_RECEIPT',
      label: '1. Default Case (Partial Delivery)',
      description: '100 Inv vs 80 GRN (₹50k vs ₹40k, 20-unit variance, ₹10k held)',
      icon: AlertTriangle,
      tag: 'Requirement 5',
    },
    {
      id: 'CONTRADICTORY_EMAIL',
      label: '2. Contradictory Email / Hostile Probe',
      description: 'Vendor email claims 100 units; GRN 80-unit log cannot be overridden',
      icon: MailWarning,
      tag: 'Requirement 6',
    },
    {
      id: 'UPDATED_100_RECEIPT',
      label: '3. Updated 100-Unit Receipt',
      description: 'GRN revised to 100 units; clears mismatch but NEVER auto-approves payment',
      icon: FileCheck2,
      tag: 'Requirement 7',
    },
    {
      id: 'MISSING_RECEIPT',
      label: '4. Missing Receipt Evidence',
      description: 'No physical GRN provided; produces INSUFFICIENT_EVIDENCE',
      icon: FileQuestion,
      tag: 'Requirement 8',
    },
    {
      id: 'CUSTOM_VECTOR',
      label: '5. Custom Test Vector',
      description: 'Dynamic math verification with arbitrary quantities & unit prices',
      icon: SlidersHorizontal,
      tag: 'Requirement 4',
    },
  ];

  const handleRunClick = () => {
    if (!consentToSend) {
      onToggleConsent(true);
    }
    onRunReconciliation();
    // Smooth scroll down to AI Reasoning Panel
    setTimeout(() => {
      const el = document.getElementById('ai-reasoning-panel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            Audit Test Scenarios & Invariant Probes
          </h2>
          <p className="text-xs text-slate-400">
            Select a verified AP reconciliation case to inspect evidence hierarchy and calculations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => onToggleSimulateFailure(e.target.checked)}
              className="rounded bg-slate-900 border-slate-600 text-rose-500 focus:ring-rose-500 focus:ring-offset-slate-900"
            />
            <span className="flex items-center gap-1.5 text-rose-300">
              <Bug className="w-3.5 h-3.5 text-rose-400" />
              Simulate Failure (Req 10)
            </span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={consentToSend}
              onChange={(e) => onToggleConsent(e.target.checked)}
              className="rounded bg-slate-900 border-slate-600 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            <span className="text-[11px] text-slate-300">
              Consent: Synthetic inputs sent to Gemini
            </span>
          </label>

          <button
            type="button"
            onClick={handleRunClick}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            title="Execute server-side Gemini reconciliation and scroll to audit panel"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Reconciling with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Analyze Case with Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isActive = currentScenario === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => onSelectScenario(sc.id)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between cursor-pointer active:scale-98 ${
                isActive
                  ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {sc.tag}
                  </span>
                </div>
                <h3 className={`text-xs font-bold ${isActive ? 'text-indigo-200' : 'text-slate-200'}`}>
                  {sc.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {sc.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
