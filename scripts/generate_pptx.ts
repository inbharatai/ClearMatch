import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

async function generateSlide() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';

  const slide = pptx.addSlide();

  // Dark enterprise background
  slide.background = { color: '090D16' };

  // 1. Header Banner
  slide.addText('CLEARMATCH AI  /  EXECUTIVE PROBLEM STATEMENT & ARCHITECTURE  /  SYNTHETIC DATA', {
    x: 0.6,
    y: 0.4,
    w: 9.0,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: '818CF8', // Indigo
    bold: true,
  });

  slide.addText('Why invoice exceptions need AI', {
    x: 0.6,
    y: 0.65,
    w: 9.0,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
  });

  slide.addText(
    'AI resolves the information and interpretation bottleneck so human AP controllers can decide faster.',
    {
      x: 0.6,
      y: 1.25,
      w: 9.0,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      color: '94A3B8',
    }
  );

  // Trust Boundary Stamp (Top Right)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.8,
    y: 0.45,
    w: 2.9,
    h: 1.15,
    fill: { color: '0F172A' },
    line: { color: '334155', width: 1 },
    rectRadius: 0.1,
  });

  slide.addText('TRUST BOUNDARY CERTIFIED', {
    x: 9.9,
    y: 0.55,
    w: 2.7,
    h: 0.22,
    fontSize: 8.5,
    fontFace: 'Arial',
    color: '34D399', // Emerald
    bold: true,
    align: 'center',
  });

  slide.addText('Hash: 0XA9E3D4AFEFEE2FBF', {
    x: 9.9,
    y: 0.8,
    w: 2.7,
    h: 0.22,
    fontSize: 8.5,
    fontFace: 'Courier New',
    color: '818CF8',
    align: 'center',
  });

  slide.addText('Decision Support · Never Auto-Pay', {
    x: 9.9,
    y: 1.05,
    w: 2.7,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Arial',
    color: '94A3B8',
    align: 'center',
  });

  // 2. Main Two-Column Split: The Problem vs. Why AI
  const colY = 1.75;
  const colH = 3.3;
  const colW = 5.95;
  const colSpacing = 0.23;

  // Left Column: The Problem
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: '0F172A' },
    line: { color: 'F43F5E', width: 1 }, // Rose accent
    rectRadius: 0.1,
  });

  slide.addText('THE PROBLEM', {
    x: 0.8,
    y: colY + 0.15,
    w: colW - 0.4,
    h: 0.25,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'FB7185',
    bold: true,
  });

  slide.addText(
    'An accounts-payable employee must reconstruct one transaction across four fragmented artifacts:',
    {
      x: 0.8,
      y: colY + 0.45,
      w: colW - 0.4,
      h: 0.4,
      fontSize: 10,
      fontFace: 'Arial',
      color: 'E2E8F0',
    }
  );

  // 4 Artifact Pill Badges
  const badgeY = colY + 0.9;
  const badgeW = 2.65;
  const badgeH = 0.35;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: badgeY,
    w: badgeW,
    h: badgeH,
    fill: { color: '1E293B' },
    line: { color: '3B82F6', width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('• Purchase Order (Authorized Scope)', {
    x: 0.85,
    y: badgeY + 0.05,
    w: badgeW - 0.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: '93C5FD',
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8 + badgeW + 0.2,
    y: badgeY,
    w: badgeW,
    h: badgeH,
    fill: { color: '1E293B' },
    line: { color: '818CF8', width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('• Vendor Invoice (Claim / Demand)', {
    x: 0.8 + badgeW + 0.25,
    y: badgeY + 0.05,
    w: badgeW - 0.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'C7D2FE',
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: badgeY + 0.45,
    w: badgeW,
    h: badgeH,
    fill: { color: '1E293B' },
    line: { color: '10B981', width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('• Goods-Receipt Note (Physical Count)', {
    x: 0.85,
    y: badgeY + 0.5,
    w: badgeW - 0.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'A7F3D0',
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8 + badgeW + 0.2,
    y: badgeY + 0.45,
    w: badgeW,
    h: badgeH,
    fill: { color: '1E293B' },
    line: { color: 'F59E0B', width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('• Supplier Email (Dispute / Context)', {
    x: 0.8 + badgeW + 0.25,
    y: badgeY + 0.5,
    w: badgeW - 0.1,
    h: 0.25,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'FDE68A',
  });

  slide.addText(
    'Traditional ERP / SQL rules can detect that 100 units were invoiced but only 80 were recorded as received.\n\n' +
    'They CANNOT reliably:\n' +
    '  - Understand the supplier’s explanation in unstructured text\n' +
    '  - Detect contradictory instructions or prompt injection attempts\n' +
    '  - Identify missing physical evidence or receiving log gaps\n' +
    '  - Prepare the appropriate factual follow-up response',
    {
      x: 0.8,
      y: colY + 1.85,
      w: colW - 0.4,
      h: 1.35,
      fontSize: 9,
      fontFace: 'Arial',
      color: '94A3B8',
    }
  );

  // Right Column: Why AI
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6 + colW + colSpacing,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: '0F172A' },
    line: { color: '6366F1', width: 1 }, // Indigo accent
    rectRadius: 0.1,
  });

  slide.addText('WHY AI', {
    x: 0.6 + colW + colSpacing + 0.2,
    y: colY + 0.15,
    w: colW - 0.4,
    h: 0.25,
    fontSize: 11,
    fontFace: 'Arial',
    color: '818CF8',
    bold: true,
  });

  slide.addText('ClearMatch uses server-side Gemini intelligence to:', {
    x: 0.6 + colW + colSpacing + 0.2,
    y: colY + 0.45,
    w: colW - 0.4,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: 'E2E8F0',
  });

  slide.addText(
    '✓  Interpret unstructured supplier correspondence\n' +
    '    Extracts intent, promises, and asserted delivery timelines.\n\n' +
    '✓  Connect the email with authoritative transaction records\n' +
    '    Cross-references PO line items, invoiced rates, and receiving manifests.\n\n' +
    '✓  Explain why the records conflict in plain auditor language\n' +
    '    Pinpoints whether variance is partial delivery, pricing mismatch, or timing gap.\n\n' +
    '✓  Identify missing or contradictory evidence\n' +
    '    Enforces that physical receiving notes govern over unverified emails.\n\n' +
    '✓  Cite the exact source text with verbatim substring proof\n' +
    '    100% audited quotes prevent AI hallucination or fabricated claims.\n\n' +
    '✓  Draft the next follow-up for human review\n' +
    '    Generates editable resolution communications for controller signoff.',
    {
      x: 0.6 + colW + colSpacing + 0.2,
      y: colY + 0.8,
      w: colW - 0.4,
      h: 2.35,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: 'CBD5E1',
    }
  );

  // 3. Visual ₹10,000 Case Strip
  const caseY = 5.2;
  const caseH = 0.95;
  const cardW = 2.85;
  const cardSpacing = 0.23;

  // Box 1: 100 Invoiced
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: caseY,
    w: cardW,
    h: caseH,
    fill: { color: '020617' },
    line: { color: '334155', width: 1 },
    rectRadius: 0.08,
  });
  slide.addText('INVOICED AMOUNT', {
    x: 0.7,
    y: caseY + 0.1,
    w: cardW - 0.2,
    h: 0.2,
    fontSize: 8,
    fontFace: 'Arial',
    color: '94A3B8',
    bold: true,
  });
  slide.addText('100 units invoiced', {
    x: 0.7,
    y: caseY + 0.3,
    w: cardW - 0.2,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
  });
  slide.addText('₹50,000 billed on INV-2026-4412', {
    x: 0.7,
    y: caseY + 0.62,
    w: cardW - 0.2,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Courier New',
    color: '64748B',
  });

  // Box 2: 80 Received
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6 + (cardW + cardSpacing),
    y: caseY,
    w: cardW,
    h: caseH,
    fill: { color: '020617' },
    line: { color: '334155', width: 1 },
    rectRadius: 0.08,
  });
  slide.addText('RECORDED RECEIVED', {
    x: 0.6 + (cardW + cardSpacing) + 0.1,
    y: caseY + 0.1,
    w: cardW - 0.2,
    h: 0.2,
    fontSize: 8,
    fontFace: 'Arial',
    color: '94A3B8',
    bold: true,
  });
  slide.addText('80 units received', {
    x: 0.6 + (cardW + cardSpacing) + 0.1,
    y: caseY + 0.3,
    w: cardW - 0.2,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: '34D399',
    bold: true,
  });
  slide.addText('₹40,000 accepted on GRN-5510', {
    x: 0.6 + (cardW + cardSpacing) + 0.1,
    y: caseY + 0.62,
    w: cardW - 0.2,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Courier New',
    color: '64748B',
  });

  // Box 3: 20-unit / ₹10,000 discrepancy
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6 + (cardW + cardSpacing) * 2,
    y: caseY,
    w: cardW,
    h: caseH,
    fill: { color: '020617' },
    line: { color: 'EF4444', width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText('DISCREPANCY (HOLD)', {
    x: 0.6 + (cardW + cardSpacing) * 2 + 0.1,
    y: caseY + 0.1,
    w: cardW - 0.2,
    h: 0.2,
    fontSize: 8,
    fontFace: 'Arial',
    color: 'FCA5A5',
    bold: true,
  });
  slide.addText('20-unit / ₹10,000 gap', {
    x: 0.6 + (cardW + cardSpacing) * 2 + 0.1,
    y: caseY + 0.3,
    w: cardW - 0.2,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'F87171',
    bold: true,
  });
  slide.addText('Status: HOLD_PAYMENT', {
    x: 0.6 + (cardW + cardSpacing) * 2 + 0.1,
    y: caseY + 0.62,
    w: cardW - 0.2,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Courier New',
    color: 'F87171',
  });

  // Box 4: Supplier Email
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6 + (cardW + cardSpacing) * 3,
    y: caseY,
    w: cardW,
    h: caseH,
    fill: { color: '020617' },
    line: { color: 'F59E0B', width: 1 },
    rectRadius: 0.08,
  });
  slide.addText('SUPPLIER EXPLANATION', {
    x: 0.6 + (cardW + cardSpacing) * 3 + 0.1,
    y: caseY + 0.1,
    w: cardW - 0.2,
    h: 0.2,
    fontSize: 8,
    fontFace: 'Arial',
    color: 'FDE68A',
    bold: true,
  });
  slide.addText('“Remaining 20 units will arrive later.”', {
    x: 0.6 + (cardW + cardSpacing) * 3 + 0.1,
    y: caseY + 0.3,
    w: cardW - 0.2,
    h: 0.52,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: 'F1F5F9',
    italic: true,
  });

  // 4. Trust Boundary & Punchline Strip
  const trustY = 6.25;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: trustY,
    w: 12.13,
    h: 0.55,
    fill: { color: '1E1B4B' }, // Deep indigo
    line: { color: '6366F1', width: 1.5 },
    rectRadius: 0.08,
  });

  slide.addText('TRUST BOUNDARY: Code calculates. AI interprets. A human decides.', {
    x: 0.8,
    y: trustY + 0.08,
    w: 4.8,
    h: 0.38,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
  });

  slide.addText(
    'ClearMatch turns a numerical mismatch into an evidence-backed explanation and a review-ready next action—without approving or executing payment.',
    {
      x: 5.6,
      y: trustY + 0.08,
      w: 7.0,
      h: 0.38,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: 'C7D2FE',
    }
  );

  // 5. Footer Compliance Bar
  slide.addText(
    'CERTIFICATION: Built exclusively with synthetic test data. Zero private InBharat.ai code reused. Public dependencies: React, Vite, Express, @google/genai.',
    {
      x: 0.6,
      y: 6.9,
      w: 8.5,
      h: 0.3,
      fontSize: 7.5,
      fontFace: 'Arial',
      color: '64748B',
    }
  );

  slide.addText(
    'CLEARMATCH-AI · RELEASE V1.0 · 26 SEPT 2026',
    {
      x: 9.3,
      y: 6.9,
      w: 3.4,
      h: 0.3,
      fontSize: 7.5,
      fontFace: 'Courier New',
      color: '818CF8',
      bold: true,
      align: 'right',
    }
  );

  // Write PPTX to docs/ and public/
  const docsDir = path.resolve(process.cwd(), 'docs');
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const docsPptxPath = path.join(docsDir, 'ClearMatch-One-Slide.pptx');
  const publicPptxPath = path.join(publicDir, 'ClearMatch-One-Slide.pptx');

  await pptx.writeFile({ fileName: docsPptxPath });
  fs.copyFileSync(docsPptxPath, publicPptxPath);

  console.log(`[SUCCESS] PPTX generated at: ${docsPptxPath}`);
  console.log(`[SUCCESS] Public PPTX copy placed at: ${publicPptxPath}`);
}

generateSlide().catch((err) => {
  console.error('[ERROR] Failed generating PPTX:', err);
  process.exit(1);
});
