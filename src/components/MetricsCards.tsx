import React from 'react';
import { MatchCalculation } from '../types';
import { ReceiptText, PackageCheck, AlertOctagon, Scale, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

interface MetricsCardsProps {
  calculation: MatchCalculation;
  onOpenReviewModal: () => void;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ calculation, onOpenReviewModal }) => {
  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusBadge = () => {
    switch (calculation.status) {
      case 'DISCREPANCY_DETECTED':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Discrepancy Detected — Hold Payment</span>
          </div>
        );
      case 'INSUFFICIENT_EVIDENCE':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Insufficient Evidence — Goods Receipt Missing</span>
          </div>
        );
      case 'CLEARED_PENDING_APPROVAL':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Mismatch Cleared — Awaiting Human Approval</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Status & Action Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            {getStatusBadge()}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span>Authority:</span>
              <span className="text-slate-200 font-medium">{calculation.hierarchyRuleApplied.split(':')[0]}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl pt-1 leading-relaxed">
            {calculation.reason}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {calculation.status === 'DISCREPANCY_DETECTED' && (
            <button
              onClick={onOpenReviewModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Create Review Task (Req 11)</span>
            </button>
          )}

          {calculation.status === 'CLEARED_PENDING_APPROVAL' && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Manual Human Authorization Required</span>
            </div>
          )}
        </div>
      </div>

      {/* The 4 Core Audit Cards (Requirement 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Invoice Value */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. Billed Invoice Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ReceiptText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {formatInr(calculation.invoiceValue)}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Billed: 100 units @ ₹500.00
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Doc: INV-2026-4412</span>
            <span className="text-blue-400 font-medium">100 Units Invoiced</span>
          </div>
        </div>

        {/* Card 2: Recorded Received Value */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Recorded Received Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {formatInr(calculation.recordedReceivedValue)}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Physical GRN: {calculation.status === 'INSUFFICIENT_EVIDENCE' ? '0 units (Missing)' : `${100 - calculation.quantityVariance} units @ ₹500.00`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Doc: {calculation.status === 'INSUFFICIENT_EVIDENCE' ? 'GRN Absent' : 'GRN-5510'}</span>
            <span className="text-emerald-400 font-medium">
              {calculation.status === 'INSUFFICIENT_EVIDENCE' ? 'No Physical Receipt' : `${100 - calculation.quantityVariance} Units Accepted`}
            </span>
          </div>
        </div>

        {/* Card 3: Quantity Variance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              3. Quantity Variance
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              calculation.quantityVariance > 0
                ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              calculation.quantityVariance > 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {calculation.quantityVariance} Units
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Invoiced (100) - Received ({100 - calculation.quantityVariance})
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Shortfall Delta</span>
            <span className={`font-semibold ${calculation.quantityVariance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {calculation.quantityVariance > 0 ? 'Physical Under-delivery' : 'Zero Variance'}
            </span>
          </div>
        </div>

        {/* Card 4: Discrepancy Amount */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              4. Discrepancy Amount
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              calculation.discrepancyAmount > 0
                ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              calculation.discrepancyAmount > 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {formatInr(calculation.discrepancyAmount)}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              {calculation.discrepancyAmount > 0
                ? `Hold: ${calculation.quantityVariance} units × ₹500.00`
                : '₹0 discrepancy'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Disposition</span>
            <span className={`font-bold uppercase tracking-wider ${
              calculation.paymentStatus === 'HOLD_PAYMENT' || calculation.paymentStatus === 'BLOCKED_MISSING_EVIDENCE'
                ? 'text-rose-400'
                : 'text-amber-400'
            }`}>
              {calculation.paymentStatus.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
