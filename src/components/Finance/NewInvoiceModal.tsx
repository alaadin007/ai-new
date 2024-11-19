import React, { useState } from 'react';
import { X, Plus, Trash2, CreditCard, Send, Wallet, FileText, Mail, Banknote, Building } from 'lucide-react';

interface NewInvoiceModalProps {
  onClose: () => void;
  patientName?: string;
  patientEmail?: string;
}

interface InvoiceItem {
  description: string;
  amount: number;
}

interface FormData {
  items: InvoiceItem[];
  dueDate: string;
  notes: string;
  collectPayment: boolean;
  paymentMethod?: 'card' | 'cash' | 'transfer';
  sendEmail: boolean;
}

export function NewInvoiceModal({ onClose, patientName, patientEmail }: NewInvoiceModalProps) {
  const [formData, setFormData] = useState<FormData>({
    items: [{ description: '', amount: 0 }],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
    collectPayment: false,
    sendEmail: true
  });

  const total = formData.items.reduce((sum, item) => sum + item.amount, 0);

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', amount: 0 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit invoice:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">New Invoice</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Info */}
          {patientName && (
            <div className="bg-[#2d3b4f] rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Patient</h4>
              <p className="text-gray-200">{patientName}</p>
              {patientEmail && <p className="text-sm text-gray-400">{patientEmail}</p>}
            </div>
          )}

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-400">Invoice Items</h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 hover:bg-[#374357] rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <div className="bg-[#2d3b4f] rounded-lg px-6 py-3">
                <span className="text-sm text-gray-400">Total:</span>
                <span className="text-lg font-semibold text-gray-200 ml-2">£{total}</span>
              </div>
            </div>
          </div>

          {/* Due Date & Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                placeholder="Add any notes..."
              />
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-6 h-6 text-emerald-400" />
              <h4 className="text-lg font-medium text-gray-200">Payment Options</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, collectPayment: false }))}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${
                  !formData.collectPayment
                    ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10'
                    : 'bg-[#2d3b4f] border-transparent hover:bg-[#374357]'
                }`}
              >
                <FileText className={`w-8 h-8 ${!formData.collectPayment ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className={`text-lg ${!formData.collectPayment ? 'text-blue-400' : 'text-gray-300'}`}>
                  Create Invoice Only
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, collectPayment: true }))}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${
                  formData.collectPayment
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#2d3b4f] border-transparent hover:bg-[#374357]'
                }`}
              >
                <Wallet className={`w-8 h-8 ${formData.collectPayment ? 'text-emerald-400' : 'text-gray-400'}`} />
                <span className={`text-lg ${formData.collectPayment ? 'text-emerald-400' : 'text-gray-300'}`}>
                  Create & Collect Payment
                </span>
              </button>
            </div>

            {formData.collectPayment && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {['card', 'cash', 'transfer'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method as any }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.paymentMethod === method
                        ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/10'
                        : 'bg-[#2d3b4f] border-transparent hover:bg-[#374357]'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {method === 'card' && <CreditCard className={`w-6 h-6 ${formData.paymentMethod === method ? 'text-purple-400' : 'text-gray-400'}`} />}
                      {method === 'cash' && <Banknote className={`w-6 h-6 ${formData.paymentMethod === method ? 'text-purple-400' : 'text-gray-400'}`} />}
                      {method === 'transfer' && <Building className={`w-6 h-6 ${formData.paymentMethod === method ? 'text-purple-400' : 'text-gray-400'}`} />}
                      <span className={`text-base capitalize ${formData.paymentMethod === method ? 'text-purple-400' : 'text-gray-300'}`}>
                        {method}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {patientEmail && (
            <div className="py-6">
              <button
                type="button"
                onClick={(e) => setFormData(prev => ({ ...prev, sendEmail: !prev.sendEmail }))}
                className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.sendEmail
                    ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10'
                    : 'bg-[#2d3b4f] border-transparent hover:bg-[#374357]'
                }`}
              >
                <Mail className={`w-6 h-6 ${formData.sendEmail ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className={`text-lg ${formData.sendEmail ? 'text-blue-400' : 'text-gray-300'}`}>
                  Send invoice to patient's email
                </span>
              </button>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
              {formData.collectPayment ? 'Create & Collect' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}