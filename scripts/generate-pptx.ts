import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

export async function createClearMatchPresentation(): Promise<string> {
  const pptx = new pptxgen();

  // Set widescreen 16:9 layout (13.333 x 7.5 inches)
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'ClearMatch AI - Future Enterprise Innovation';
  pptx.author = 'InBharat.ai';
  pptx.company = 'InBharat.ai';
  pptx.subject = 'Enterprise AI Prototype & Future Roadmap';

  const slide = pptx.addSlide();

  // Slide Background (Clean off-white / light slate)
  slide.background = { color: 'F8FAFC' };

  // -------------------------------------------------------------
  // RIGHT SIDEBAR CARD (Dark Slate / Deep Forest Teal)
  // Coordinates: x = 8.8, y = 0.0, w = 4.533, h = 5.3
  // -------------------------------------------------------------
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.75,
    y: 0,
    w: 4.583,
    h: 5.35,
    fill: { color: '0A2830' },
    line: { color: '0A2830', width: 0 },
  });

  // Right Sidebar: LIVE PROOF / SYNTHETIC CASE
  slide.addText('LIVE PROOF / SYNTHETIC CASE', {
    x: 9.1,
    y: 0.5,
    w: 3.9,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: '38E1B0',
    charSpacing: 2,
  });

  // Right Sidebar: ₹10,000 (Giant Stat)
  slide.addText('₹10,000', {
    x: 9.1,
    y: 0.85,
    w: 3.9,
    h: 0.9,
    fontSize: 44,
    bold: true,
    color: '38E1B0',
    fontFace: 'Arial',
  });

  // Right Sidebar: Gap explanation
  slide.addText('20-unit gap valued at PO price', {
    x: 9.1,
    y: 1.75,
    w: 3.9,
    h: 0.35,
    fontSize: 14,
    color: 'E2E8F0',
  });

  // Right Sidebar: Breakdown
  slide.addText(
    [
      { text: '100 invoiced\n', options: { bold: true, fontSize: 15, color: 'FFFFFF' } },
      { text: '80 recorded received', options: { bold: true, fontSize: 15, color: 'FFFFFF' } },
    ],
    {
      x: 9.1,
      y: 2.3,
      w: 3.9,
      h: 0.7,
      lineSpacingMultiple: 1.3,
    }
  );

  // Right Sidebar: Callout Box (Darker container)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.05,
    y: 3.25,
    w: 3.95,
    h: 1.15,
    rectRadius: 0.08,
    fill: { color: '071E25' },
    line: { color: '144B57', width: 1 },
  });

  slide.addText('A supplier email provides evidence to interpret.\nIt never provides authority to approve.', {
    x: 9.2,
    y: 3.35,
    w: 3.65,
    h: 0.95,
    fontSize: 12,
    color: 'CCFBF1',
    lineSpacingMultiple: 1.25,
  });

  // Right Sidebar: Demo note
  slide.addText('Demo: change the email, then the receipt. The arithmetic and AI response must change independently.', {
    x: 9.1,
    y: 4.65,
    w: 3.9,
    h: 0.55,
    fontSize: 9.5,
    color: '94A3B8',
    lineSpacingMultiple: 1.15,
  });

  // -------------------------------------------------------------
  // LEFT CONTENT AREA (Top Half)
  // Coordinates: x = 0.8, w = 7.6
  // -------------------------------------------------------------

  // Tagline: INBHARAT.AI / ENTERPRISE AI / DAY-1 PROTOTYPE
  slide.addText('INBHARAT.AI / ENTERPRISE AI / DAY-1 PROTOTYPE', {
    x: 0.8,
    y: 0.45,
    w: 7.5,
    h: 0.25,
    fontSize: 9.5,
    bold: true,
    color: '0D7A68',
    charSpacing: 2,
  });

  // Title: ClearMatch AI
  slide.addText('ClearMatch AI', {
    x: 0.8,
    y: 0.75,
    w: 7.5,
    h: 0.65,
    fontSize: 32,
    bold: true,
    color: '0F172A',
    fontFace: 'Arial',
  });

  // Subtitle
  slide.addText('Rules detect the mismatch. AI explains the evidence around it.', {
    x: 0.8,
    y: 1.4,
    w: 7.5,
    h: 0.35,
    fontSize: 15,
    color: '334155',
  });

  // WHY AI Tag
  slide.addText('WHY AI', {
    x: 0.8,
    y: 1.95,
    w: 7.5,
    h: 0.2,
    fontSize: 9.5,
    bold: true,
    color: '0D7A68',
    charSpacing: 2,
  });

  // WHY AI explanation
  slide.addText(
    'A finance rule can calculate 100 invoiced versus 80 received. It cannot reliably interpret the supplier’s email, identify contradictory claims or prepare the next evidence request.',
    {
      x: 0.8,
      y: 2.2,
      w: 7.5,
      h: 0.55,
      fontSize: 12.5,
      color: '1E293B',
      lineSpacingMultiple: 1.25,
    }
  );

  // Horizontal pill band (PO / Invoice / Receipt / Email)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 2.9,
    w: 7.5,
    h: 0.65,
    rectRadius: 0.06,
    fill: { color: 'E6F4F1' },
    line: { color: 'BCE5DE', width: 1 },
  });

  // 4 items inside band
  slide.addText(
    [
      { text: 'PO  ', options: { bold: true, color: '0F172A' } },
      { text: '100 units', options: { color: '334155' } },
    ],
    { x: 1.0, y: 3.05, w: 1.6, h: 0.35, fontSize: 11 }
  );

  slide.addText(
    [
      { text: 'Invoice  ', options: { bold: true, color: '0F172A' } },
      { text: '100', options: { color: '334155' } },
    ],
    { x: 2.8, y: 3.05, w: 1.4, h: 0.35, fontSize: 11 }
  );

  slide.addText(
    [
      { text: 'Receipt  ', options: { bold: true, color: '0F172A' } },
      { text: '80', options: { color: '334155' } },
    ],
    { x: 4.4, y: 3.05, w: 1.4, h: 0.35, fontSize: 11 }
  );

  slide.addText(
    [
      { text: 'Email  ', options: { bold: true, color: '0D7A68' } },
      { text: '20 arrive later', options: { bold: true, color: '0D7A68' } },
    ],
    { x: 5.95, y: 3.05, w: 2.2, h: 0.35, fontSize: 11 }
  );

  // 3 Columns: Code verifies / AI interprets / Human decides
  const colWidth = 2.3;
  const colGap = 0.3;
  const colY = 3.75;

  // Col 1: Code verifies
  slide.addText('Code verifies', {
    x: 0.8,
    y: colY,
    w: colWidth,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Decimal calculations, record matching and exact source checks.', {
    x: 0.8,
    y: colY + 0.3,
    w: colWidth,
    h: 0.7,
    fontSize: 10.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // Col 2: AI interprets
  slide.addText('AI interprets', {
    x: 0.8 + colWidth + colGap,
    y: colY,
    w: colWidth,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Connects correspondence to records, explains uncertainty and cites evidence.', {
    x: 0.8 + colWidth + colGap,
    y: colY + 0.3,
    w: colWidth,
    h: 0.7,
    fontSize: 10.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // Col 3: Human decides
  slide.addText('Human decides', {
    x: 0.8 + (colWidth + colGap) * 2,
    y: colY,
    w: colWidth,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Reviews the evidence, edits the follow-up and authorizes any external action.', {
    x: 0.8 + (colWidth + colGap) * 2,
    y: colY + 0.3,
    w: colWidth,
    h: 0.7,
    fontSize: 10.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // -------------------------------------------------------------
  // BOTTOM SECTION (Future Roadmap - What We Would Build Next)
  // Full width banner from y = 5.35 to 7.5
  // -------------------------------------------------------------
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.35,
    w: 13.333,
    h: 2.15,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 1 },
  });

  // Left Section Header
  slide.addText('WHAT WE WOULD BUILD NEXT', {
    x: 0.8,
    y: 5.5,
    w: 5.0,
    h: 0.25,
    fontSize: 9.5,
    bold: true,
    color: '0D7A68',
    charSpacing: 2,
  });

  // Right Section Header
  slide.addText('FUTURE ROADMAP — NOT IMPLEMENTED TODAY', {
    x: 7.5,
    y: 5.5,
    w: 5.0,
    h: 0.25,
    fontSize: 9.5,
    bold: true,
    color: '64748B',
    charSpacing: 1.5,
    align: 'right',
  });

  // 3 Enterprise Innovations (Full Width across bottom)
  const bottomColWidth = 3.65;
  const bottomColGap = 0.45;
  const bottomColY = 5.85;

  // Innovation 1: Enterprise Evidence Graph
  slide.addText('1  EVIDENCE GRAPH', {
    x: 0.8,
    y: bottomColY,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: '0D7A68',
    charSpacing: 1,
  });
  slide.addText('One auditable case history', {
    x: 0.8,
    y: bottomColY + 0.25,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 11.5,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Connects ERP records, emails, documents, claims and source excerpts into one auditable case history. Connect ERP, document and messaging systems.', {
    x: 0.8,
    y: bottomColY + 0.52,
    w: bottomColWidth,
    h: 0.8,
    fontSize: 9.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // Innovation 2: Policy and Approval Gate
  slide.addText('2  POLICY + APPROVAL GATE', {
    x: 0.8 + bottomColWidth + bottomColGap,
    y: bottomColY,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: '0D7A68',
    charSpacing: 1,
  });
  slide.addText('Enterprise rules become enforceable', {
    x: 0.8 + bottomColWidth + bottomColGap,
    y: bottomColY + 0.25,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 11.5,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Enforces tolerances, role permissions, approval matrices and blocked-action rules before a case can progress.', {
    x: 0.8 + bottomColWidth + bottomColGap,
    y: bottomColY + 0.52,
    w: bottomColWidth,
    h: 0.8,
    fontSize: 9.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // Innovation 3: Universal Workflow Builder
  slide.addText('3  UNIVERSAL WORKFLOW BUILDER', {
    x: 0.8 + (bottomColWidth + bottomColGap) * 2,
    y: bottomColY,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: '0D7A68',
    charSpacing: 1,
  });
  slide.addText('Configure new use cases', {
    x: 0.8 + (bottomColWidth + bottomColGap) * 2,
    y: bottomColY + 0.25,
    w: bottomColWidth,
    h: 0.25,
    fontSize: 11.5,
    bold: true,
    color: '0F172A',
  });
  slide.addText('Lets companies configure ClearMatch for finance, procurement, contracts, operations and support.', {
    x: 0.8 + (bottomColWidth + bottomColGap) * 2,
    y: bottomColY + 0.52,
    w: bottomColWidth,
    h: 0.8,
    fontSize: 9.5,
    color: '475569',
    lineSpacingMultiple: 1.2,
  });

  // Slide Speaker Notes (Direct answer to "What would you build next with more time?")
  slide.addNotes(
    `Executive Presentation Note:
“With more time, we would transform ClearMatch from a single invoice prototype into a governed enterprise exception-resolution platform—connected to enterprise systems, controlled by company policies and configurable across multiple functions.”

Three Enterprise Innovations:
1. Enterprise Evidence Graph: Connects ERP records, emails, documents, claims and source excerpts into one auditable case history.
2. Policy and Approval Gate: Enforces tolerances, role permissions, approval matrices and blocked-action rules.
3. Universal Workflow Builder: Lets companies configure ClearMatch for finance, procurement, contracts, operations and support.

Note: Future capabilities are strictly labeled "Future roadmap — not implemented today" to adhere to enterprise disclosure integrity.`
  );

  // Write file to output locations
  const outputFileName = 'ClearMatch_AI_Future_Enterprise_Innovation_One_Slide_Final.pptx';
  
  // Save in public folder for direct HTTP download
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicFilePath = path.join(publicDir, outputFileName);
  await pptx.writeFile({ fileName: publicFilePath });

  // Also save in sandbox/workspace/scratch path requested if possible
  const scratchDir = path.resolve(process.cwd(), 'scratch/efafef38254d/clearmatch_slide_build/output');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }
  const scratchFilePath = path.join(scratchDir, outputFileName);
  await pptx.writeFile({ fileName: scratchFilePath });

  console.log(`[PPTX Generator] Successfully generated: ${publicFilePath}`);
  return publicFilePath;
}

if (process.argv[1]?.endsWith('generate-pptx.ts') || process.argv[1]?.endsWith('generate-pptx.js')) {
  createClearMatchPresentation()
    .then((path) => console.log('Done:', path))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
