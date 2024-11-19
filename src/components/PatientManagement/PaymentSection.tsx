import React, { useState } from 'react';
import { CreditCard, Receipt, Mail, Check } from 'lucide-react';

interface Payment {
  amount: number;
  method: string;
  notes: string;
  sendReceipt?: boolean;
  patientEmail?: string;
}

interface PaymentSectionProps {
  payment: Payment;
  onChange: (payment: Payment) => void;
  patientEmail?: string;
}

export function PaymentSection({ payment, onChange, patientEmail }: PaymentSectionProps) {
  const [emailSent, setEmailSent] = useState(false);

  const handleSendReceipt = async () => {
    // In production, this would call your API to send the email
    console.log('Sending receipt to:', patientEmail);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Amount
            </div>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
            <input
              type="number"
              value={payment.amount}
              onChange={e => onChange({ ...payment, amount: parseFloat(e.target.value) })}
              className="w-full pl-8 pr-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Payment Method</label>
          <select
            value={payment.method}
            onChange={e => onChange({ ...payment, method: e.target.value })}
            className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
          >
            <option value="">Select method...</option>
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Payment Notes
          </div>
        </label>
        <textarea
          value={payment.notes}
          onChange={e => onChange({ ...payment, notes: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
          placeholder="Enter any additional payment notes..."
        />
      </div>

      {/* Email Receipt Section */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-300">Email Receipt</h4>
            <p className="text-xs text-gray-500">
              Send a payment receipt to {patientEmail || 'patient email'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={payment.sendReceipt}
                onChange={e => onChange({ ...payment, sendReceipt: e.target.checked })}
                className="form-checkbox h-4 w-4 text-blue-600 bg-[#2d3b4f] border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400">Send automatically</span>
            </label>
            <button
              type="button"
              onClick={handleSendReceipt}
              disabled={!patientEmail || emailSent}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                emailSent
                  ? 'bg-green-600 text-white'
                  : patientEmail
                  ? 'bg-[#2d3b4f] hover:bg-[#374357] text-gray-300'
                  : 'bg-[#2d3b4f] opacity-50 cursor-not-allowed text-gray-500'
              }`}
            >
              {emailSent ? (
                <>
                  <Check className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}