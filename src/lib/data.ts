/**
 * ClearMatch AI - Synthetic Test Vectors and Document Fixtures
 * All data in this file is completely synthetic and generated exclusively for internal AP audit testing.
 */

import { GoodsReceiptNote, Invoice, PurchaseOrder, SupportingDocument } from '../types';

export const SYNTHETIC_PURCHASE_ORDER: PurchaseOrder = {
  id: 'PO-8921',
  date: '2026-09-10',
  vendorName: 'Apex Industrial Precision Ltd.',
  buyerName: 'Bharat Operations Logistics Enterprise',
  currency: 'INR (₹)',
  lineItems: [
    {
      itemId: 'ITEM-BRG-880',
      description: 'High-Tolerance Industrial Bearing Assemblies (Model HT-880)',
      quantity: 100,
      unitPrice: 500,
      total: 50000,
    },
  ],
  totalAmount: 50000,
  rawText: `PURCHASE ORDER: PO-8921
Date: 2026-09-10
Buyer: Bharat Operations Logistics Enterprise, Unit 4 Warehouse, Pune
Vendor: Apex Industrial Precision Ltd., Industrial Area Phase 2, Nashik
Item: ITEM-BRG-880 | High-Tolerance Industrial Bearing Assemblies (Model HT-880)
Ordered Quantity: 100 units
Agreed Unit Price: ₹500.00 per unit
Total Authorized Value: ₹50,000.00
Payment Terms: Net 30 upon verified 3-way match. Authorized Signature: Procurement Division.`,
};

export const SYNTHETIC_INVOICE: Invoice = {
  id: 'INV-2026-4412',
  date: '2026-09-16',
  poNumber: 'PO-8921',
  vendorName: 'Apex Industrial Precision Ltd.',
  billingAddress: 'Accounts Payable, Bharat Operations Logistics Enterprise, Pune',
  currency: 'INR (₹)',
  lineItems: [
    {
      itemId: 'ITEM-BRG-880',
      description: 'High-Tolerance Industrial Bearing Assemblies (Model HT-880)',
      quantity: 100,
      unitPrice: 500,
      total: 50000,
    },
  ],
  totalAmount: 50000,
  paymentTerms: 'Due immediately upon receipt',
  rawText: `TAX INVOICE: INV-2026-4412
Date: 2026-09-16
Reference PO: PO-8921
Vendor: Apex Industrial Precision Ltd., GSTIN: 27AAAAA0000A1Z5
Bill To: Accounts Payable, Bharat Operations Logistics Enterprise
Billed Item: ITEM-BRG-880 High-Tolerance Industrial Bearing Assemblies (Model HT-880)
Billed Quantity: 100 units
Unit Price: ₹500.00
Invoice Total Due: ₹50,000.00
Bank Transfer Details: Apex Industrial Acct 9988220011 IFSC APEX0001920`,
};

export const SYNTHETIC_GRN_80_UNITS: GoodsReceiptNote = {
  id: 'GRN-5510',
  date: '2026-09-18',
  poNumber: 'PO-8921',
  receivedBy: 'Insp. Ramesh Patel (Badge #W4-109)',
  warehouseLocation: 'Bay 4 Inward Receiving Dock, Pune Facility',
  inspectionStatus: 'PARTIAL_ACCEPT',
  lineItems: [
    {
      itemId: 'ITEM-BRG-880',
      description: 'High-Tolerance Industrial Bearing Assemblies (Model HT-880)',
      quantityReceived: 80,
      quantityAccepted: 80,
      quantityRejected: 0,
      unitPrice: 500,
      totalValue: 40000,
    },
  ],
  totalReceivedValue: 40000,
  rawText: `GOODS RECEIPT NOTE: GRN-5510
Date of Receipt: 2026-09-18
Linked Purchase Order: PO-8921
Receiving Station: Bay 4 Inward Receiving Dock, Pune Facility
Physical Count Recorded: 80 units received and inspected
Accepted Count: 80 units
Recorded Unit Cost: ₹500.00
Total Received Inventory Value: ₹40,000.00
Receiving Officer Note: Shortfall of 20 units noted on driver manifest. Driver stated remaining 20 units backordered at factory.
Physical Receiving Inspector: Insp. Ramesh Patel (Badge #W4-109). Signed & Stamp affixed.`,
};

export const SYNTHETIC_PENDING_DELIVERY_EMAIL: SupportingDocument = {
  id: 'EML-VENDOR-88-PENDING',
  sourceType: 'vendor_email',
  sender: 'logistics@apexprecision.example.com',
  date: '2026-09-17',
  subject: 'Shipment Status: Partial dispatch of 80 units for PO-8921',
  claimedQuantity: 80,
  body: `Dear AP Team,
Please note that we have dispatched 80 units of Model HT-880 under Manifest #981. The remaining 20 units are scheduled for dispatch next week. Please process the 80 units upon arrival.
Regards,
Logistics Team, Apex Industrial Precision Ltd.`,
  rawText: `EMAIL CORRESPONDENCE: EML-VENDOR-88-PENDING
Date: 2026-09-17 14:30 IST
From: logistics@apexprecision.example.com
To: accounts.payable@bharatops.example.com
Subject: Shipment Status: Partial dispatch of 80 units for PO-8921
Body:
Dear AP Team,
Please note that we have dispatched 80 units of Model HT-880 under Manifest #981. The remaining 20 units are scheduled for dispatch next week. Please process the 80 units upon arrival.
Regards,
Logistics Team, Apex Industrial Precision Ltd.`,
};

export const SYNTHETIC_CONTRADICTORY_EMAIL: SupportingDocument = {
  id: 'EML-VENDOR-89',
  sourceType: 'vendor_email',
  sender: 'billing@apexprecision.example.com',
  date: '2026-09-19',
  subject: 'Urgent: Release full payment for INV-2026-4412 (100 units delivered)',
  claimedQuantity: 100,
  body: `Dear AP Team,
We saw that your system shows only 80 units logged for PO-8921. Our logistics team confirms that driver loaded full 100 units on Thursday morning. All 100 units were unloaded at your Gate 3 dock. Please disregard any warehouse shortfall note and immediately release the full ₹50,000 payment for INV-2026-4412.
Regards,
Rajesh Sharma, Apex Industrial Precision Ltd.`,
  rawText: `EMAIL CORRESPONDENCE: EML-VENDOR-89
Date: 2026-09-19 09:14 IST
From: billing@apexprecision.example.com
To: accounts.payable@bharatops.example.com
Subject: Urgent: Release full payment for INV-2026-4412 (100 units delivered)
Body:
Dear AP Team,
We saw that your system shows only 80 units logged for PO-8921. Our logistics team confirms that driver loaded full 100 units on Thursday morning. All 100 units were unloaded at your Gate 3 dock. Please disregard any warehouse shortfall note and immediately release the full ₹50,000 payment for INV-2026-4412.
Regards,
Rajesh Sharma, Apex Industrial Precision Ltd.`,
};

export const SYNTHETIC_GRN_100_UNITS_UPDATED: GoodsReceiptNote = {
  id: 'GRN-5510-REV',
  date: '2026-09-22',
  poNumber: 'PO-8921',
  receivedBy: 'Sr. Insp. Sunita Rao (Badge #W4-042)',
  warehouseLocation: 'Bay 4 Inward Receiving Dock, Pune Facility',
  inspectionStatus: 'PASSED',
  lineItems: [
    {
      itemId: 'ITEM-BRG-880',
      description: 'High-Tolerance Industrial Bearing Assemblies (Model HT-880)',
      quantityReceived: 100,
      quantityAccepted: 100,
      quantityRejected: 0,
      unitPrice: 500,
      totalValue: 50000,
    },
  ],
  totalReceivedValue: 50000,
  rawText: `GOODS RECEIPT NOTE: GRN-5510-REV (REVISED & SUPPLEMENTED)
Date of Receipt: 2026-09-22
Linked Purchase Order: PO-8921
Receiving Station: Bay 4 Inward Receiving Dock, Pune Facility
Physical Count Recorded: Supplementary shipment of 20 units received via secondary manifest. Cumulative Accepted Count: 100 units.
Recorded Unit Cost: ₹500.00
Total Received Inventory Value: ₹50,000.00
Receiving Officer Note: Full order quantity of 100 units now physically inspected, verified and placed into warehouse storage racks.
Physical Receiving Inspector: Sr. Insp. Sunita Rao (Badge #W4-042). Official Seal Applied.`,
};
