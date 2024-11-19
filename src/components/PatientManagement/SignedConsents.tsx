import React from 'react';
import { FileText, Download, Calendar, User } from 'lucide-react';

interface SignedConsent {
  id: string;
  title: string;
  signedAt: string;
  provider: string;
  signature: string;
}

export function SignedConsents() {
  // This would come from your database in production
  const [signedConsents, setSignedConsents] = React.useState<SignedConsent[]>([]);

  // Add new consent to the list
  const addSignedConsent = (consent: SignedConsent) => {
    setSignedConsents(prev => [consent, ...prev]);
  };

  return (
    <div className="mt-8 border-t border-gray-800 pt-8">
      <h3 className="text-lg font-medium text-gray-200 mb-4">Previously Signed Consents</h3>
      
      {signedConsents.length > 0 ? (
        <div className="space-y-2">
          {signedConsents.map(consent => (
            <div
              key={consent.id}
              className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg hover:bg-[#2d3b4f] transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">{consent.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>Signed on {new Date(consent.signedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      <span>by {consent.provider}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // In production, this would download the signed consent form
                    console.log('Downloading consent:', consent.id);
                  }}
                  className="p-2 hover:bg-[#374357] rounded-lg transition-colors duration-200 group"
                >
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-[#1e293b] rounded-lg">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No signed consent forms yet</p>
        </div>
      )}
    </div>
  );
}