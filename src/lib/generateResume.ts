import { jsPDF } from "jspdf";
import { personalInfo, experiences, skillCategories, certifications, projects } from "./data";

export function generateResume() {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function addSection(title: string) {
    y += 6;
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, y, contentWidth, 0.8, "F");
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
  }

  function addText(text: string, size = 10, bold = false, color = [50, 50, 50]) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += size * 0.4;
    });
  }

  function addBullet(text: string) {
    const lines = doc.splitTextToSize(text, contentWidth - 4);
    lines.forEach((line: string, i: number) => {
      if (y > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(i === 0 ? `• ${line}` : `  ${line}`, margin, y);
      y += 4;
    });
  }

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(personalInfo.name.toUpperCase(), pageWidth / 2, 22, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Software Engineer & Full-Stack Developer", pageWidth / 2, 32, { align: "center" });
  doc.text(`${personalInfo.email}  |  ${personalInfo.location}  |  github.com/ANGELcode-coder`, pageWidth / 2, 40, { align: "center" });

  y = 52;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const summaryLines = doc.splitTextToSize(personalInfo.tagline, contentWidth);
  summaryLines.forEach((line: string) => {
    doc.text(line, margin, y);
    y += 5;
  });

  addSection("Experience");
  experiences.forEach((exp) => {
    if (y > 265) { doc.addPage(); y = margin; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(`${exp.title} - ${exp.company}`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.period, margin + contentWidth - doc.getTextWidth(exp.period), y);
    y += 5;
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    exp.achievements.forEach((a) => addBullet(a));
    y += 3;
  });

  addSection("Skills");
  const skillsPerRow = 2;
  const skillColWidth = contentWidth / skillsPerRow;
  let skillX = margin;
  skillCategories.slice(0, 6).forEach((cat, i) => {
    if (y > 270) { doc.addPage(); y = margin; }
    if (i > 0 && i % skillsPerRow === 0) {
      skillX = margin;
      y += 12;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235);
    doc.text(cat.title, skillX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(cat.skills.join(", "), skillX, y + 4, { maxWidth: skillColWidth - 4 });
    skillX += skillColWidth;
    if ((i + 1) % skillsPerRow === 0) {
      skillX = margin;
    }
  });
  y += 14;

  addSection("Projects");
  projects.slice(0, 4).forEach((proj) => {
    if (y > 265) { doc.addPage(); y = margin; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(proj.title, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(proj.tagline, margin + 2, y + 4);
    y += 9;
  });

  addSection("Certifications");
  certifications.slice(0, 8).forEach((cert) => {
    if (y > 275) { doc.addPage(); y = margin; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    doc.text(`• ${cert.title}`, margin, y);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`${cert.issuer} (${cert.year})`, margin + contentWidth - doc.getTextWidth(`${cert.issuer} (${cert.year})`), y);
    y += 5;
  });

  return doc;
}
