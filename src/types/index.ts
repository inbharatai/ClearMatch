/**
 * ClearMatch AI - AP 3-Way Match & Discrepancy Reconciliation Types
 */

export interface LineItem {
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  date: string;
  vendorName: string;
  buyerName: string;
  currency: string;
  lineItems: LineItem[];
  totalAmount: number;
  rawText: string;
}

export interface Invoice {
  id: string;
  date: string;
  poNumber: string;
  vendorName: string;
  billingAddress: string;
  currency: string;
  lineItems: LineItem[];
  totalAmount: number;
  paymentTerms: string;
  rawText: string;
}

export interface GrnLineItem {
  itemId: string;
  description: string;
  quantityReceived: number;
  quantityAccepted: number;
  quantityRejected: number;
  unitPrice: number;
  totalValue: number;
}

export interface GoodsReceiptNote {
  id: string;
  date: string;
  poNumber: string;
  receivedBy: string;
  warehouseLocation: string;
  inspectionStatus: 'PASSED' | 'PARTIAL_ACCEPT' | 'REJECTED';
  lineItems: GrnLineItem[];
  totalReceivedValue: number;
  rawText: string;
}

export interface SupportingDocument {
  id: string;
  sourceType: 'vendor_email' | 'driver_slip' | 'bill_of_lading';
  sender: string;
  date: string;
  subject: string;
  body: string;
  claimedQuantity: number;
  rawText: string;
}

export type ScenarioType =
  | 'DEFAULT_PARTIAL_RECEIPT'
  | 'CONTRADICTORY_EMAIL'
  | 'UPDATED_100_RECEIPT'
  | 'MISSING_RECEIPT'
  | 'CUSTOM_VECTOR';

export type MatchStatus =
  | 'DISCREPANCY_DETECTED'
  | 'INSUFFICIENT_EVIDENCE'
  | 'CLEARED_PENDING_APPROVAL'
  | 'MATCH_VERIFIED';

export type PaymentDisposition =
  | 'HOLD_PAYMENT'
  | 'BLOCKED_MISSING_EVIDENCE'
  | 'PENDING_HUMAN_APPROVAL';

export interface MatchCalculation {
  invoiceValue: number;
  recordedReceivedValue: number;
  quantityVariance: number;
  discrepancyAmount: number;
  status: MatchStatus;
  paymentStatus: PaymentDisposition;
  reason: string;
  hierarchyRuleApplied: string;
  auditHash?: string;
  hsnCode?: string;
  calculatedGstAmount?: number;
}

export interface QuoteVerification {
  quote: string;
  sourceDocumentId: string;
  sourceType: string;
  verifiedInSource: boolean;
  matchContext?: string;
}

export interface SearchGroundingResult {
  statutoryGstRate: string;
  marketPriceBenchmark: string;
  evidentiaryPrecedent: string;
  webSearchQueries?: string[];
  groundingSourcesCount: number;
  modelUsed: string;
  verifiedAt: string;
}

export interface AiReasoning {
  summary: string;
  evidenceHierarchyDecision: string;
  recommendedDisposition: string;
  quotations: QuoteVerification[];
  analysisTimestamp: string;
  modelUsed: string;
}

export interface ReviewTask {
  id: string;
  title: string;
  caseId: string;
  discrepancyAmount: number;
  quantityVariance: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED';
  assignee: string;
  confirmedByHuman: boolean;
  confirmedBy: string;
  confirmedAt: string;
  notes: string;
}
