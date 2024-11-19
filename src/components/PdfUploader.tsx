import React, { useCallback } from 'react';
import { FileUp } from 'lucide-react';

interface PdfUploaderProps {
  onPdfContent: (text: string) => void;
}

export function PdfUploader({ onPdfContent }: PdfUploaderProps) {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      // In a real application, you would send this to your backend
      // For demo purposes, we'll use a placeholder response
      const extractedText = `Extracted content from ${file.name}:\n\nThis is a sample text that would be extracted from the PDF. In a real implementation, this would be the actual content from your PDF file.`;
      
      onPdfContent(extractedText);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF file');
    }
  }, [onPdfContent]);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl blur opacity-25"></div>
      <div className="relative bg-[#111827] border border-gray-800 rounded-xl p-6">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <FileUp className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-gray-300 mb-2">Upload PDF Document</span>
          <span className="text-sm text-gray-500">Upload a PDF to extract its content</span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}