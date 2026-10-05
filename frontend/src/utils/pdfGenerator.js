import jsPDF from 'jspdf';

export function savePDFFile(doc, filename) {
  const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;

  try {
    const blob = doc.output('blob');
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(pdfBlob, safeFilename);
      return;
    }

    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = safeFilename;
    link.setAttribute('download', safeFilename);
    document.body.appendChild(link);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    link.dispatchEvent(clickEvent);

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 10000);
  } catch (err) {
    console.error("Custom blob download failed, fallback to doc.save():", err);
    doc.save(safeFilename);
  }
}

export function openPDFInNewTab(doc) {
  const blob = doc.output('blob');
  const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, '_blank');
}

export async function generateMedicalReportPDF({ patient, symptoms, result, imagePreview }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 15;

  // Colors
  const primaryBlue = [2, 132, 199];   // #0284c7
  const darkNavy = [15, 23, 42];       // #0f172a
  const cyanAccent = [6, 182, 212];    // #06b6d4
  const lightBg = [248, 250, 252];     // #f8fafc
  const alertRed = [225, 29, 72];      // #e11d48

  // 1. HOSPITAL LETTERHEAD HEADER
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Decorative Accent bar
  doc.setFillColor(...cyanAccent);
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("MediVision AI", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("CLINICAL AI MEDICAL IMAGE ANALYSIS & SCREENING REPORT", margin, 20);

  // Top Right Header Info
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  doc.setFontSize(8);
  doc.text(`Report ID: MV-${Math.floor(100000 + Math.random() * 900000)}`, pageWidth - margin - 45, 12);
  doc.text(`Generated: ${reportDate}`, pageWidth - margin - 45, 17);
  doc.text(`Status: PRELIMINARY SCREENING`, pageWidth - margin - 45, 22);

  y = 38;

  // 2. PATIENT INFORMATION BOX
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 34, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 34, 3, 3, 'D');

  doc.setTextColor(...darkNavy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("PATIENT DEMOGRAPHICS & CLINICAL DATA", margin + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const col1 = margin + 4;
  const col2 = margin + 65;
  const col3 = margin + 125;

  doc.text(`Name: ${patient.full_name || 'Anonymous'}`, col1, y + 15);
  doc.text(`Age: ${patient.age || 'N/A'} yrs`, col1, y + 21);
  doc.text(`Gender: ${patient.gender || 'N/A'}`, col1, y + 27);

  doc.text(`Height: ${patient.height || 'N/A'}`, col2, y + 15);
  doc.text(`Weight: ${patient.weight || 'N/A'}`, col2, y + 21);
  doc.text(`Blood Group: ${patient.blood_group || 'N/A'}`, col2, y + 27);

  doc.text(`Medical History: ${patient.medical_history || 'None'}`, col3, y + 15);
  doc.text(`Current Medication: ${patient.current_medication || 'None'}`, col3, y + 21);
  doc.text(`Initial Severity: ${patient.severity || 'Moderate'}`, col3, y + 27);

  y += 42;

  // 3. PRIMARY AI SCREENING FINDINGS
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(...primaryBlue);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 26, 3, 3, 'FD');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...primaryBlue);
  doc.text("PRIMARY AI SCREENING IMPRESSION", margin + 4, y + 7);

  doc.setFontSize(15);
  doc.setTextColor(...darkNavy);
  doc.text(result.possible_disease || "Clinical Impression Pending", margin + 4, y + 16);

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Confidence Level: ${result.confidence || 'N/A'}`, pageWidth - margin - 75, y + 12);
  doc.text(`Assessed Severity: ${result.severity || 'Moderate'}`, pageWidth - margin - 75, y + 18);
  doc.text(`Target Specialist: ${result.specialist || 'General Medicine'}`, pageWidth - margin - 75, y + 24);

  y += 32;

  // 4. SYMPTOMS & IMAGE FINDINGS (SIDE-BY-SIDE OR STACKED)
  const boxWidth = imagePreview ? (pageWidth - (margin * 2) - 6) / 2 : pageWidth - (margin * 2);

  // Symptoms Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, boxWidth, 48, 2, 2, 'DF');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...darkNavy);
  doc.text("REPORTED SYMPTOMS SUMMARY", margin + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const splitSymptoms = doc.splitTextToSize(symptoms || "No symptoms listed.", boxWidth - 8);
  doc.text(splitSymptoms.slice(0, 5), margin + 4, y + 14);

  if (result.summary && Array.isArray(result.summary)) {
    let sumY = y + 28;
    doc.setFont("helvetica", "bold");
    doc.text("Key Observations:", margin + 4, sumY);
    doc.setFont("helvetica", "normal");
    result.summary.slice(0, 3).forEach((item, idx) => {
      sumY += 5;
      if (sumY < y + 45) {
        doc.text(`• ${item}`, margin + 4, sumY);
      }
    });
  }

  // Uploaded Image Box
  if (imagePreview) {
    const imgX = margin + boxWidth + 6;
    doc.roundedRect(imgX, y, boxWidth, 48, 2, 2, 'DF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...darkNavy);
    doc.text("ATTACHED MEDICAL IMAGE FINDINGS", imgX + 4, y + 7);

    try {
      doc.addImage(imagePreview, 'PNG', imgX + 4, y + 11, 30, 30);
    } catch (e) {
      console.warn("Could not embed image in PDF:", e);
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    let imgY = y + 14;
    const textX = imgX + 38;
    const maxTextW = boxWidth - 42;

    if (result.image_findings && Array.isArray(result.image_findings)) {
      result.image_findings.forEach((finding) => {
        const lines = doc.splitTextToSize(`• ${finding}`, maxTextW);
        lines.forEach(l => {
          if (imgY < y + 44) {
            doc.text(l, textX, imgY);
            imgY += 4.5;
          }
        });
      });
    }
  }

  y += 54;

  // 5. RECOMMENDED TESTS & LIFESTYLE ADVICE
  const halfW = (pageWidth - (margin * 2) - 6) / 2;

  // Recommended Diagnostic Tests
  doc.roundedRect(margin, y, halfW, 40, 2, 2, 'DF');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryBlue);
  doc.text("RECOMMENDED DIAGNOSTIC TESTS", margin + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let testY = y + 14;
  if (result.tests && Array.isArray(result.tests)) {
    result.tests.forEach((t) => {
      if (testY < y + 36) {
        doc.text(`✓ ${t}`, margin + 4, testY);
        testY += 5.5;
      }
    });
  }

  // Lifestyle Guidance
  const rightX = margin + halfW + 6;
  doc.roundedRect(rightX, y, halfW, 40, 2, 2, 'DF');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryBlue);
  doc.text("LIFESTYLE & PREVENTIVE GUIDANCE", rightX + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  let lifeY = y + 14;
  if (result.lifestyle && Array.isArray(result.lifestyle)) {
    result.lifestyle.forEach((l) => {
      if (lifeY < y + 36) {
        const lines = doc.splitTextToSize(`• ${l}`, halfW - 8);
        lines.forEach(line => {
          if (lifeY < y + 36) {
            doc.text(line, rightX + 4, lifeY);
            lifeY += 4.5;
          }
        });
      }
    });
  }

  y += 46;

  // 6. EMERGENCY WARNING SIGNS (RED HIGHLIGHT BOX)
  doc.setFillColor(255, 241, 242);
  doc.setDrawColor(...alertRed);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 24, 2, 2, 'FD');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...alertRed);
  doc.text("⚠️ CRITICAL EMERGENCY WARNING SIGNS (SEEK IMMEDIATE CARE IF PRESENT)", margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(159, 18, 57);
  let emY = y + 12;
  if (result.emergency_signs && Array.isArray(result.emergency_signs)) {
    const signsStr = result.emergency_signs.map(s => `• ${s}`).join("   ");
    const splitEmergency = doc.splitTextToSize(signsStr, pageWidth - (margin * 2) - 8);
    doc.text(splitEmergency.slice(0, 2), margin + 4, emY);
  }

  y += 29;

  // 7. MEDICAL DISCLAIMER & FOOTER
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 2, 2, 'F');

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const footerText = "DISCLAIMER: This report is AI-generated for educational and screening purposes only and should not replace professional medical diagnosis. Always consult a licensed medical doctor for clinical guidance.";
  const splitFooter = doc.splitTextToSize(footerText, pageWidth - (margin * 2) - 8);
  doc.text(splitFooter, margin + 4, y + 5);

  // Bottom Border Signature Bar
  doc.setFillColor(...primaryBlue);
  doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("MediVision AI Medical System — Official Screening Report", margin, pageHeight - 2);

  // Save File
  const filename = `MediVision_Report_${patient?.full_name ? patient.full_name.replace(/\s+/g, '_') : 'Patient'}.pdf`;
  savePDFFile(doc, filename);
}

export async function generateChatbotReportPDF({ item }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 15;

  const primaryBlue = [2, 132, 199];   // #0284c7
  const darkNavy = [15, 23, 42];       // #0f172a
  const cyanAccent = [6, 182, 212];    // #06b6d4
  const lightBg = [248, 250, 252];     // #f8fafc

  // 1. HEADER
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setFillColor(...cyanAccent);
  doc.rect(0, 28, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("MediVision AI", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("AI CLINICAL SYMPTOM SCREENING CHAT TRANSCRIPT & REPORT", margin, 20);

  const reportDate = new Date(item.timestamp || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  doc.setFontSize(8);
  doc.text(`Session ID: CHAT-${String(item.id).slice(-6)}`, pageWidth - margin - 50, 12);
  doc.text(`Date: ${reportDate}`, pageWidth - margin - 50, 17);
  doc.text(`Status: COMPLETED SCREENING`, pageWidth - margin - 50, 22);

  y = 38;

  // 2. SUMMARY BOX
  const resultMsg = (item.conversation || []).find(m => m.role === "assistant" && m.content.includes("## Screening Result"));
  const riskMatch = resultMsg?.content.match(/\*\*Risk level:\*\*\s*([^\n*]+)/i);
  const riskLevel = riskMatch?.[1]?.trim() || "Screening Evaluation Complete";

  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 26, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 26, 3, 3, 'D');

  doc.setTextColor(...darkNavy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("SCREENING SUMMARY & ASSESSMENT", margin + 4, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Identified Condition / Symptom: ${item.diseaseName || "General Symptom Screening"}`, margin + 4, y + 13);
  doc.text(`Assessed Risk Level: ${riskLevel}`, margin + 4, y + 18);
  doc.text(`Total Screening Exchanges: ${item.conversation?.length || 0} messages`, margin + 4, y + 23);

  y += 32;

  // 3. IF SCREENING RESULT PRESENT, RENDER FINDINGS BOX
  if (resultMsg) {
    const rawResult = resultMsg.content.replace("## Screening Result", "").trim();
    const cleanLines = rawResult.split("\n").filter(l => l.trim().length > 0).map(l => l.replace(/\*\*/g, '').trim());

    doc.setFillColor(240, 249, 255); // Sky/blue highlight
    doc.setDrawColor(186, 230, 253);
    const boxHeight = Math.min(50, Math.max(26, cleanLines.length * 4.5 + 10));
    doc.roundedRect(margin, y, pageWidth - (margin * 2), boxHeight, 3, 3, 'FD');

    doc.setTextColor(2, 132, 199);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("PRELIMINARY CLINICAL FINDINGS", margin + 4, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);

    let fy = y + 11;
    for (const cline of cleanLines) {
      if (fy > y + boxHeight - 3) break;
      const splitL = doc.splitTextToSize(`• ${cline}`, pageWidth - (margin * 2) - 8);
      doc.text(splitL[0], margin + 4, fy);
      fy += 4.2;
    }

    y += boxHeight + 6;
  }

  // 4. CONVERSATION TRANSCRIPT HEADER
  doc.setTextColor(...darkNavy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("COMPLETE CONVERSATION TRANSCRIPT", margin, y);
  y += 6;

  // Render conversation lines
  doc.setFontSize(8);
  const contentWidth = pageWidth - (margin * 2) - 8;

  for (const msg of (item.conversation || [])) {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = 15;
    }

    const isUser = msg.role === "user";
    const speakerLabel = isUser ? "User / Patient:" : "MediVision Assistant:";
    doc.setFont("helvetica", "bold");
    doc.setTextColor(isUser ? 2 : 15, isUser ? 132 : 23, isUser ? 199 : 42);
    doc.text(speakerLabel, margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    // Strip markdown formatting for clean text
    const cleanContent = msg.content
      .replace(/\*\*/g, '')
      .replace(/## /g, '')
      .replace(/### /g, '');
    const lines = doc.splitTextToSize(cleanContent, contentWidth);
    
    for (const line of lines) {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, margin + 2, y);
      y += 3.8;
    }
    y += 2.5;
  }

  // Footer / Disclaimer
  if (y > pageHeight - 25) {
    doc.addPage();
    y = 15;
  }
  y += 4;
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 14, 2, 2, 'F');
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const footerText = "DISCLAIMER: This screening record is generated based on user-reported answers. It is intended for informational and preliminary screening purposes and does not constitute a definitive medical diagnosis.";
  const splitFooter = doc.splitTextToSize(footerText, pageWidth - (margin * 2) - 8);
  doc.text(splitFooter, margin + 4, y + 5);

  const cleanDisease = (item.diseaseName || "Screening").replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
  const cleanDate = new Date(item.timestamp || Date.now()).toISOString().slice(0, 10);
  const filename = `MediVision_${cleanDisease}_${cleanDate}.pdf`;
  savePDFFile(doc, filename);
}

export async function generateImageAnalysisReportPDF({ analysis, imagePreview, userNotes }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 15;

  const primaryBlue = [0, 102, 255];
  const darkNavy = [15, 23, 42];
  const lightBg = [248, 250, 252];

  // 1. HEADER
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setFillColor(14, 165, 233);
  doc.rect(0, 28, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AI-BASED MEDICAL IMAGE ANALYSIS SYSTEM", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("FOR EARLY DISEASE DETECTION & CLINICAL SCREENING", margin, 20);

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  doc.setFontSize(8);
  doc.text(`Report ID: IMG-${Math.floor(100000 + Math.random() * 900000)}`, pageWidth - margin - 48, 12);
  doc.text(`Date: ${reportDate}`, pageWidth - margin - 48, 17);
  doc.text(`Status: PRELIMINARY VISION ANALYSIS`, pageWidth - margin - 48, 22);

  y = 38;

  // 2. IMAGE METADATA & SPECS BOX
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 30, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 30, 3, 3, 'D');

  doc.setTextColor(...darkNavy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("MEDICAL IMAGE SPECIFICATIONS", margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const col1 = margin + 4;
  const col2 = margin + 65;
  const col3 = margin + 125;

  doc.text(`Image Type / Modality: ${analysis.image_type || 'N/A'}`, col1, y + 13);
  doc.text(`Quality Rating: ${analysis.image_quality || 'Good'}`, col1, y + 19);
  doc.text(`Resolution: ${analysis.resolution || 'Standard'}`, col1, y + 25);

  doc.text(`Confidence Level: ${analysis.confidence || 'Moderate'}`, col2, y + 13);
  doc.text(`Image Format: ${analysis.format || 'JPEG/PNG'}`, col2, y + 19);
  doc.text(`Analysis Status: Completed`, col2, y + 25);

  if (userNotes) {
    doc.text(`Clinical Notes: ${userNotes.slice(0, 35)}${userNotes.length > 35 ? '...' : ''}`, col3, y + 13);
  }

  y += 36;

  // 3. IMAGE PREVIEW & OBSERVED FINDINGS
  const boxWidth = imagePreview ? (pageWidth - (margin * 2) - 6) / 2 : pageWidth - (margin * 2);

  if (imagePreview) {
    // Left Box: Image Thumbnail
    doc.roundedRect(margin, y, boxWidth, 54, 2, 2, 'DF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...darkNavy);
    doc.text("ANALYZED MEDICAL SCAN PREVIEW", margin + 4, y + 7);

    try {
      doc.addImage(imagePreview, 'PNG', margin + 4, y + 11, 40, 38);
    } catch (e) {
      console.warn("Image embed error in PDF:", e);
    }

    // Right Box: Visual Findings
    const rightX = margin + boxWidth + 6;
    doc.roundedRect(rightX, y, boxWidth, 54, 2, 2, 'DF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryBlue);
    doc.text("AI VISUAL FINDINGS & FEATURES", rightX + 4, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    let fy = y + 14;

    if (analysis.findings && Array.isArray(analysis.findings)) {
      analysis.findings.slice(0, 4).forEach((f) => {
        if (fy < y + 50) {
          doc.setFont("helvetica", "bold");
          doc.text(`• ${f.finding}:`, rightX + 4, fy);
          fy += 4;
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(f.description, boxWidth - 10);
          descLines.slice(0, 2).forEach(line => {
            if (fy < y + 50) {
              doc.text(line, rightX + 8, fy);
              fy += 4;
            }
          });
        }
      });
    }
  } else {
    // Full width findings
    doc.roundedRect(margin, y, pageWidth - (margin * 2), 54, 2, 2, 'DF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryBlue);
    doc.text("AI VISUAL FINDINGS & FEATURES", margin + 4, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    let fy = y + 14;
    if (analysis.findings && Array.isArray(analysis.findings)) {
      analysis.findings.forEach((f) => {
        if (fy < y + 50) {
          doc.setFont("helvetica", "bold");
          doc.text(`• ${f.finding}: ${f.description}`, margin + 4, fy);
          fy += 5;
        }
      });
    }
  }

  y += 60;

  // 4. POSSIBLE CONDITIONS & RISK ALIGNMENT
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(...primaryBlue);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 36, 3, 3, 'FD');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...primaryBlue);
  doc.text("POSSIBLE CONDITIONS & RISK ALIGNMENT", margin + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  let condY = y + 14;
  if (analysis.possible_conditions && Array.isArray(analysis.possible_conditions)) {
    analysis.possible_conditions.slice(0, 3).forEach((c) => {
      if (condY < y + 33) {
        doc.setFont("helvetica", "bold");
        doc.text(`Condition: ${c.condition} (${c.likelihood} Likelihood)`, margin + 4, condY);
        doc.setFont("helvetica", "normal");
        const reasonLine = doc.splitTextToSize(`Reason: ${c.reason}`, pageWidth - (margin * 2) - 10);
        doc.text(reasonLine[0], margin + 8, condY + 4.5);
        condY += 10;
      }
    });
  }

  y += 42;

  // 5. OVERALL ASSESSMENT & RECOMMENDATION
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 30, 2, 2, 'DF');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...darkNavy);
  doc.text("OVERALL PRELIMINARY ASSESSMENT & RECOMMENDATIONS", margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const assessLines = doc.splitTextToSize(`Assessment: ${analysis.overall_assessment}`, pageWidth - (margin * 2) - 8);
  doc.text(assessLines.slice(0, 2), margin + 4, y + 13);

  const recLines = doc.splitTextToSize(`Recommendation: ${analysis.recommendation}`, pageWidth - (margin * 2) - 8);
  doc.text(recLines.slice(0, 2), margin + 4, y + 22);

  y += 36;

  // 6. DISCLAIMER
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 2, 2, 'F');

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const disclaimerText = analysis.disclaimer || "AI-ASSISTED PRELIMINARY MEDICAL IMAGE ANALYSIS: This document contains preliminary automated computer vision screening findings. It is not a clinical diagnosis or medical prescription. Always consult a licensed radiologist or healthcare provider.";
  const splitDisc = doc.splitTextToSize(disclaimerText, pageWidth - (margin * 2) - 8);
  doc.text(splitDisc, margin + 4, y + 5);

  // Footer bar
  doc.setFillColor(...primaryBlue);
  doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("AI-BASED MEDICAL IMAGE ANALYSIS SYSTEM FOR EARLY DISEASE DETECTION", margin, pageHeight - 2);

  const filename = `Medical_Image_Analysis_Report_${Date.now()}.pdf`;
  savePDFFile(doc, filename);
}

