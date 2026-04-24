import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function downloadResumePdf(node: HTMLElement, filename = "resume.pdf") {
  const canvas = await html2canvas(node, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    logging: false,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const ratio = canvas.height / canvas.width;
  const imgW = pageW;
  const imgH = imgW * ratio;
  let y = 0;
  if (imgH <= pageH) {
    pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH);
  } else {
    // Multi-page
    let remaining = imgH;
    while (remaining > 0) {
      pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
      remaining -= pageH;
      if (remaining > 0) {
        pdf.addPage();
        y -= pageH;
      }
    }
  }
  pdf.save(filename);
}