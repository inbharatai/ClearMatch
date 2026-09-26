import React, { useState } from 'react';
import { GoodsReceiptNote, Invoice, PurchaseOrder, SupportingDocument } from '../types';
import { FileText, Receipt, Package, Mail, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface DocumentComparisonProps {
  po: PurchaseOrder;
  invoice: Invoice;
  grn: GoodsReceiptNote | null;
  disputeEmail?: SupportingDocument | null;
}

export const DocumentComparison: React.FC<DocumentComparisonProps> = ({
  po,
  invoice,
  grn,
  disputeEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PO' | 'INV' | 'GRN' | 'EMAIL'>('ALL');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Primary Evidence Repository & 3-Way Cross-Verification</span>
          </h3>
          <p className="text-xs text-slate-400">
            Compare legal and physical evidentiary records side-by-side to audit variance sources.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Docs
          </button>
          <button
            onClick={() => setActiveTab('PO')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'PO' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PO
          </button>
          <button
            onClick={() => setActiveTab('INV')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'INV' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Invoice
          </button>
          <button
            onClick={() => setActiveTab('GRN')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'GRN' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            GRN
          </button>
          {disputeEmail && (
            <button
              onClick={() => setActiveTab('EMAIL')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'EMAIL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Email
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Document 1: Purchase Order */}
        {(activeTab === 'ALL' || activeTab === 'PO') && (
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{po.id}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Date: {po.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Tier 2: Authorization
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Vendor</span>
                  <span className="text-slate-200 font-medium">{po.vendorName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Ordered Scope</span>
                  <span className="text-slate-200 font-mono">
                    {po.lineItems[0].quantity} units @ ₹{po.lineItems[0].unitPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Total PO Value</span>
                  <span className="text-base font-bold text-white font-mono">
                    ₹{po.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {po.rawText}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Signed by Procurement Division</span>
            </div>
          </div>
        )}

        {/* Document 2: Vendor Invoice */}
        {(activeTab === 'ALL' || activeTab === 'INV') && (
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{invoice.id}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Date: {invoice.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Tier 3: Claim / Billing
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Claimant Vendor</span>
                  <span className="text-slate-200 font-medium">{invoice.vendorName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Billed Scope</span>
                  <span className="text-slate-200 font-mono">
                    {invoice.lineItems[0].quantity} units @ ₹{invoice.lineItems[0].unitPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Invoice Total Due</span>
                  <span className="text-base font-bold text-white font-mono">
                    ₹{invoice.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {invoice.rawText}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-amber-400">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>External Counterparty Claim</span>
            </div>
          </div>
        )}

        {/* Document 3: Goods Receipt Note (GRN) */}
        {(activeTab === 'ALL' || activeTab === 'GRN') && (
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{grn ? grn.id : 'NO GRN ATTACHED'}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {grn ? `Date: ${grn.date}` : 'Status: Evidence Missing'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Tier 1: Supreme Authority
                </span>
              </div>

              {grn ? (
                <>
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Receiving Station</span>
                      <span className="text-slate-200 font-medium">{grn.warehouseLocation}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Accepted Physical Count</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {grn.lineItems[0].quantityAccepted} units accepted ({grn.lineItems[0].quantityReceived} arrived)
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Accepted Inventory Value</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">
                        ₹{grn.totalReceivedValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                    {grn.rawText}
                  </div>
                </>
              ) : (
                <div className="mt-6 text-center p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                  <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-rose-400 uppercase">Physical Evidence Absent</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    No warehouse receiving log or inspection report found in ERP. Match cannot proceed.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{grn ? grn.receivedBy : 'Missing physical signoff'}</span>
            </div>
          </div>
        )}

        {/* Document 4: Supporting Dispute Email (Requirement 6) */}
        {disputeEmail && (activeTab === 'ALL' || activeTab === 'EMAIL') && (
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{disputeEmail.id}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{disputeEmail.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Tier 4: Unverified Claim
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Sender</span>
                  <span className="text-slate-200 font-medium truncate block">{disputeEmail.sender}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Unverified Claim</span>
                  <span className="text-rose-400 font-mono font-bold">
                    Claims {disputeEmail.claimedQuantity} units delivered
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Subject</span>
                  <span className="text-slate-300 font-medium line-clamp-1">{disputeEmail.subject}</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {disputeEmail.body}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-rose-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Cannot override internal GRN-5510</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
