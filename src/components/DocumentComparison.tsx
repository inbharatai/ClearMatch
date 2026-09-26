import React, { useState } from 'react';
import { GoodsReceiptNote, Invoice, PurchaseOrder, SupportingDocument } from '../types';
import { FileText, Receipt, Package, Mail, ShieldCheck, AlertCircle, ArrowRight, Link2, CheckCircle2, ShieldAlert } from 'lucide-react';

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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
              AUDIT STEP 1
            </span>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Authoritative Transaction Records & Supplier Email Correlation</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Auditors can verify how the informal supplier email is connected directly with the 3 authoritative transaction records.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 4 Records
          </button>
          <button
            onClick={() => setActiveTab('PO')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'PO' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PO (Auth)
          </button>
          <button
            onClick={() => setActiveTab('INV')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'INV' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Invoice (Demand)
          </button>
          <button
            onClick={() => setActiveTab('GRN')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'GRN' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            GRN (Supreme)
          </button>
          {disputeEmail && (
            <button
              onClick={() => setActiveTab('EMAIL')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'EMAIL' ? 'bg-amber-600 text-white shadow' : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <Mail className="w-3 h-3" />
              <span>Supplier Email</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Correlation Flow Banner for Auditors */}
      {disputeEmail && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-indigo-950/30 to-amber-950/20 border border-slate-700/80 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Auditor Traceability: How the System Connects the Email to Authoritative Records
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs pt-1">
            {/* 1. PO */}
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-blue-500/30">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide block">1. PO Authorization</span>
              <p className="font-mono text-white font-bold">{po.id}</p>
              <p className="text-[11px] text-slate-300">100 units @ ₹{po.lineItems[0]?.unitPrice}</p>
              <span className="text-[10px] text-blue-300/80 block mt-1 font-mono">₹{po.totalAmount.toLocaleString('en-IN')} approved</span>
            </div>

            {/* 2. Invoice */}
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-indigo-500/30">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide block">2. Invoiced Demand</span>
              <p className="font-mono text-white font-bold">{invoice.id}</p>
              <p className="text-[11px] text-slate-300">100 units @ ₹{invoice.lineItems[0]?.unitPrice}</p>
              <span className="text-[10px] text-indigo-300/80 block mt-1 font-mono">₹{invoice.totalAmount.toLocaleString('en-IN')} billed</span>
            </div>

            {/* 3. GRN */}
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/40">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">3. Authoritative GRN</span>
              <p className="font-mono text-emerald-400 font-bold">{grn ? grn.id : 'NO RECEIPT'}</p>
              <p className="text-[11px] text-slate-300">{grn ? `${grn.lineItems[0]?.quantityAccepted} units physically verified` : 'Missing'}</p>
              <span className="text-[10px] text-emerald-400/90 block mt-1 font-mono">₹{grn ? grn.totalReceivedValue.toLocaleString('en-IN') : 0} payable</span>
            </div>

            {/* 4. Correlated Email */}
            <div className="p-2.5 rounded-lg bg-amber-950/40 border-2 border-amber-500/60 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">4. Correlated Email</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">AI Tracked</span>
              </div>
              <p className="font-mono text-white font-bold">{disputeEmail.id}</p>
              <p className="text-[11px] text-amber-200 font-semibold italic">
                &ldquo;Remaining 20 units will arrive later.&rdquo;
              </p>
              <span className="text-[10px] text-amber-300/80 block mt-1">
                Explains 20-unit shortfall (₹10,000) &bull; Held by AP
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4 Primary Documents Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {po.lineItems[0]?.quantity} units @ ₹{po.lineItems[0]?.unitPrice.toFixed(2)}
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
                  Tier 3: Demand
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Invoiced Party</span>
                  <span className="text-slate-200 font-medium">{invoice.vendorName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Billed Quantity</span>
                  <span className="text-slate-200 font-mono">
                    {invoice.lineItems[0]?.quantity} units @ ₹{invoice.lineItems[0]?.unitPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Billed Invoice Value</span>
                  <span className="text-base font-bold text-white font-mono">
                    ₹{invoice.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                {invoice.rawText}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-indigo-400">
              <Receipt className="w-3.5 h-3.5" />
              <span>Tax Invoice (GST HSN 8482)</span>
            </div>
          </div>
        )}

        {/* Document 3: Authoritative GRN */}
        {(activeTab === 'ALL' || activeTab === 'GRN') && (
          <div className="bg-slate-950/60 border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{grn ? grn.id : 'GRN-MISSING'}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {grn ? `Date: ${grn.date}` : 'Status: Evidence Missing'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
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
                      <span className="text-emerald-400 font-mono font-bold text-sm">
                        {grn.lineItems[0]?.quantityAccepted} units accepted ({grn.lineItems[0]?.quantityReceived} arrived)
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Authoritative Inventory Value</span>
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
                    No warehouse receiving log found in ERP. Three-way match blocked.
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

        {/* Document 4: Correlated Dispute Email (Tracked & Audited by AI) */}
        {disputeEmail && (activeTab === 'ALL' || activeTab === 'EMAIL') && (
          <div className="bg-amber-950/20 border-2 border-amber-500/60 rounded-xl p-4 flex flex-col justify-between shadow-xl ring-1 ring-amber-500/30">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{disputeEmail.id}</h4>
                    <span className="text-[10px] text-amber-300 font-mono">{disputeEmail.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Tier 4: Correlated Email
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">Sender / Counterparty</span>
                  <span className="text-slate-200 font-medium truncate block font-mono text-[11px]">{disputeEmail.sender}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Connected Discrepancy</span>
                  <span className="text-amber-400 font-mono font-bold">
                    Attempts to explain missing 20 units (₹10,000)
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Key Extracted Statement Tracked by AI</span>
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-500/40 text-amber-200 font-bold italic text-xs">
                    &ldquo;Remaining 20 units will arrive later.&rdquo;
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                {disputeEmail.body}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-500/30 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Zero Payment Authority</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">ICAI SA-501</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
