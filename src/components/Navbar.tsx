import React from 'react';
import { ShieldCheck, Info, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenDisclosure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDisclosure }) => {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">ClearMatch</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                AI Audit Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Deterministic AP 3-Way Reconciliation &amp; Evidentiary Verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Server Gemini Boundary</span>
          </div>

          <button
            onClick={onOpenDisclosure}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="View disclosure & compliance notes"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Disclosures</span>
          </button>
        </div>
      </div>
    </header>
  );
};
