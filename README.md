# ClearMatch AI - AP 3-Way Match & Discrepancy Reconciliation Engine

ClearMatch AI is a production-grade internal controls and accounts payable (AP) reconciliation platform. It combines mathematically deterministic 3-way matching (Purchase Order vs. Vendor Invoice vs. Goods Receipt Note) with server-side AI reasoning powered by Google Gemini, live Google Search Grounding for statutory tax & market price verification, automated quotation provenance auditing, cryptographic audit fingerprints, and strict separation-of-duties governance.

---

## 1. Compliance & Architecture Disclosures (Requirement 13 & Contest Integrity)

### Synthetic Data Disclosure
All corporate identities, invoices (e.g. `INV-2026-4412`), purchase orders (`PO-8921`), goods receipt notes (`GRN-5510`), receiving badges, and vendor email correspondences (`EML-VENDOR-89`) are **100% synthetic test vectors** authored solely for internal AP audit verification. No real customer data, real company financials, or personally identifiable information (PII) is present.

### Gemini AI Usage & Server Boundary
- **Models**: `gemini-3.8-flash` for deterministic semantic reasoning and `gemini-3.5-flash` (with `googleSearch` tool) for real-time statutory & market search grounding, with high-availability failover to `gemini-2.5-flash`.
- **Server-Side Isolation**: All Gemini API calls execute strictly on the server (`server.ts`). The browser client never invokes Gemini directly.
- **Secret Protection**: `GEMINI_API_KEY` is injected from server environment variables and never exposed to the client bundle, HTML meta tags, local storage, or network responses.
- **Honest Failure Policy**: If upstream Gemini services time out, fail, or lack credentials, the server returns an honest HTTP 502/503 error with technical details. Deceptive canned mock responses are strictly prohibited.

### Public Dependencies Disclosed
The application is built exclusively using standard, publicly available open-source libraries:
- `react` & `react-dom` (v19)
- `@google/genai` (v2.4.0)
- `pptxgenjs` (v4.0.1) - Native 16:9 PowerPoint slide generation
- `express` (v4.21.2)
- `vite` (v8.3.0) & `@vitejs/plugin-react`
- `@tailwindcss/vite` & `tailwindcss` (v4.3.3)
- `lucide-react` (Vector icons)
- `dotenv` (Environment configuration)
- `tsx` & `typescript` (Strict TypeScript runtime & test runner)

### Limitations & Human-in-the-Loop Governance
ClearMatch AI operates as an internal control decision-support system:
- **No Automated Disbursement**: Even when an updated 100-unit receipt clears the variance to zero, the system transitions to `PENDING_HUMAN_APPROVAL`. It is architecturally incapable of auto-approving payment releases.
- **Explicit Human Authorization**: Creating AP review tasks requires active human confirmation via a dedicated confirmation workflow.
- **Untrusted Supplier Correspondence**: Vendor emails carry zero legal authority to override receiving logs or authorize payment disbursement. Prompt injection attempts (e.g. "disregard warehouse shortfall notes") are isolated and flagged.
- **Consent Gate**: Case analysis requires explicit consent verification ("These are synthetic/public permitted inputs. I consent to sending this case to Google Gemini.") before any payload is sent.

### Certification of Originality (Zero Code Reuse)
**We explicitly certify that no private, proprietary, or pre-existing code from InBharat.ai was reused, copied, or adapted in this project.** All matching logic, audit rule engines, server proxies, and user interfaces were developed from scratch according to first principles.

---

## 2. Core AP Reconciliation Scenarios

| Scenario | PO Ordered | Invoice Billed | GRN Accepted | Calculated Variance | Discrepancy Amount | Evidentiary Ruling & Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Default Case (Partial Delivery)** | 100 @ ₹500 | 100 @ ₹500 (₹50k) | 80 @ ₹500 (₹40k) | **20 Units** | **₹10,000** | `DISCREPANCY_DETECTED`<br>`HOLD_PAYMENT` |
| **2. Contradictory Email Dispute / Hostile Probe** | 100 @ ₹500 | 100 @ ₹500 (₹50k) | 80 @ ₹500 (GRN-5510) | **20 Units** | **₹10,000** | `DISCREPANCY_DETECTED`<br>GRN overrides email claim |
| **3. Updated 100-Unit Receipt** | 100 @ ₹500 | 100 @ ₹500 (₹50k) | 100 @ ₹500 (GRN-REV) | **0 Units** | **₹0** | `CLEARED_PENDING_APPROVAL`<br>`PENDING_HUMAN_APPROVAL` *(Never auto-paid)* |
| **4. Missing Receipt Evidence** | 100 @ ₹500 | 100 @ ₹500 (₹50k) | *None (Missing)* | **100 Units** | **₹50,000** | `INSUFFICIENT_EVIDENCE`<br>`BLOCKED_MISSING_EVIDENCE` |
| **5. Custom Dynamic Vector** | Custom Qty | Custom Qty & Rate | Custom Accepted | *Dynamic* | *Dynamic* | Proves calculations are not hardcoded |

---

## 3. Real-Time Google Search Grounding & Statutory Verification

ClearMatch AI integrates live **Google Search Grounding** using `gemini-3.5-flash` with the `googleSearch` tool:
- **Statutory GST Rate Verification**: Queries live tax schedules to verify that ball & roller bearings under **HSN Code 8482** attract **18% standard GST** in India (₹9,000 tax on ₹50,000 invoice).
- **Market Price Benchmark Check**: Cross-references the ₹500/unit invoice price with Indian wholesale B2B industrial market prices (₹350–₹750 range for HT series), flagging kickback risks and inflation anomalies.
- **Evidentiary Legal Precedent**: Pulls **ICAI Auditing Standard SA-501 & Ind AS 2** legal foundations establishing why warehouse-signed Goods Receipt Notes (GRN) provide authoritative inventory proof that strictly overrides counterparty emails.

---

## 4. Cryptographic Audit Fingerprint & Presentation Artifacts

- **Cryptographic Audit Fingerprint**: Every reconciliation generates a deterministic 64-bit hexadecimal hash (`auditHash`, e.g. `0XA9E3D4AFEFEE2FBF`) binding PO, Invoice, GRN, variances, and ruling for SOX compliance and non-repudiation.
- **Official 16:9 Presentation Slide (.PPTX)**:
  - Generated at `docs/ClearMatch-One-Slide.pptx` and `public/ClearMatch-One-Slide.pptx`.
  - Downloadable directly from the UI via the **"Download .PPTX"** button.
  - Also printable as a landscape PDF via browser print preview (`@media print`).
- **Exportable Audit Dossier**: 1-click **"Download Analysis JSON"** produces `clearmatch-analysis.json` containing complete calculations, AI reasoning, quotations, model provenance, and cryptographic hash.

---

## 5. Verified Audit Requirements & Evidence

1. **Preview & Server Execution**: Express server runs on port 3000 hosting Vite middlewares; clean console with zero unhandled exceptions.
2. **Automated Test Suite**: Executable via `npm test` (`tsx tests/audit.test.ts`), reporting **38/38 passing assertions (100%)**.
3. **Secret Isolation**: Static file scanner verifies zero references to `GEMINI_API_KEY` across `src/`.
4. **Non-Hardcoded Dynamic Math**: Custom input vectors dynamically compute invoice value, received value, variance, and discrepancy amount.
5. **Default Case Invariant**: Correctly outputs ₹50,000 invoice, ₹40,000 received, 20-unit variance, and ₹10,000 discrepancy.
6. **Evidentiary Hierarchy (RULE-AP-02)**: Contradictory vendor email claiming 100 units is explicitly rejected in favor of the signed 80-unit warehouse GRN.
7. **Zero-Variance Payment Lock (RULE-AP-03)**: Updated 100-unit receipt clears variance, but status remains strictly `PENDING_HUMAN_APPROVAL`.
8. **Missing Evidence Rule (RULE-AP-01)**: Missing GRN produces `INSUFFICIENT_EVIDENCE` and `BLOCKED_MISSING_EVIDENCE`.
9. **Quotation Provenance**: Every cited quote is verified against source documents with verbatim substring matching.
10. **Honest Failure**: Gemini errors or simulated failures return HTTP 502/503 with honest diagnostics; no canned mock responses.
11. **Human Confirmation**: Review Task creation rejects requests without explicit human confirmation.
12. **Printable & Downloadable 16:9 Presentation**: Executive Slide is available as both an interactive modal, a printable landscape view, and a downloadable `.pptx` presentation.

---

## 6. Running Tests & Development

```bash
# Run automated audit test suite (38 assertions)
npm test

# Generate official 16:9 PowerPoint slide
npm run generate-pptx

# Run TypeScript typecheck / lint
npm run lint

# Start server in development mode
npm run dev

# Build production bundle (includes automated PPTX generation)
npm run build
```
