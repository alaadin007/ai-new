import React from 'react';
import { Download, Calendar, User } from 'lucide-react';

interface ConsentFormViewerProps {
  formId: string;
  title: string;
  content: string;
  signedAt?: string;
  signedBy?: string;
  signature?: string;
  onDownload?: () => void;
}

export function ConsentFormViewer({
  title,
  content,
  signedAt,
  signedBy,
  signature,
  onDownload
}: ConsentFormViewerProps) {
  return (
    <div className="bg-[#1e293b] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-200">{title}</h3>
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
          >
            <Download className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="prose prose-invert max-w-none mb-6">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {signature && (
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Signed on {new Date(signedAt!).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                <span>by {signedBy}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[#2d3b4f] rounded-lg">
            <img
              src={signature}
              alt="Signature"
              className="max-h-20 w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}