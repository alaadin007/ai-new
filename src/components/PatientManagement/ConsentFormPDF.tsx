import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface ConsentFormPDFProps {
  title: string;
  content: string;
  signature: string;
  signedAt: string;
  signedBy: string;
}

export async function generateConsentFormPDF({
  title,
  content,
  signature,
  signedAt,
  signedBy
}: ConsentFormPDFProps): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Add title
  page.drawText(title, {
    x: 50,
    y: height - 50,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0)
  });

  // Add content
  const contentLines = content.split('\n');
  let yOffset = height - 100;
  
  for (const line of contentLines) {
    if (yOffset < 100) {
      // Add new page if we run out of space
      const newPage = pdfDoc.addPage();
      yOffset = newPage.getSize().height - 50;
    }

    page.drawText(line, {
      x: 50,
      y: yOffset,
      size: 12,
      font: font,
      color: rgb(0, 0, 0)
    });

    yOffset -= 20;
  }

  // Add signature
  const signatureImage = await pdfDoc.embedPng(signature);
  const signatureWidth = 200;
  const signatureHeight = 100;

  page.drawImage(signatureImage, {
    x: 50,
    y: yOffset - signatureHeight,
    width: signatureWidth,
    height: signatureHeight
  });

  // Add signature details
  yOffset -= (signatureHeight + 40);
  page.drawText(`Signed by: ${signedBy}`, {
    x: 50,
    y: yOffset,
    size: 10,
    font: font,
    color: rgb(0, 0, 0)
  });

  yOffset -= 20;
  page.drawText(`Date: ${new Date(signedAt).toLocaleDateString()}`, {
    x: 50,
    y: yOffset,
    size: 10,
    font: font,
    color: rgb(0, 0, 0)
  });

  return pdfDoc.save();
}