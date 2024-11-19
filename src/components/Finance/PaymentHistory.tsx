import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

interface Payment {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  method: 'card' | 'cash' | 'transfer';
  invoiceId: string;
}

export function PaymentHistory() {
  const payments: Payment[] = [
    {
      id: 'PAY-2024-001',
      patientName: 'Sarah Smith',
      amount: 850,
      date: '2024-02-20',
      method: 'card',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 'PAY-2024-002',
      patientName: 'Michael Chen',
      amount: 1500,
      date: '2024-02-19',
      method: 'transfer',
      invoiceId: 'INV-2024-002'
    },
    {
      id: 'PAY-2024-003',
      patientName: 'Emma Wilson',
      amount: 600,
      date: '2024-02-18',
      method: 'cash',
      invoiceId: 'INV-2024-003'
    }
  ];

  return (
    <div className="bg-[#1e293b] rounded-xl border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-gray-200">Payment History</h3>
      </div>

      <div className="divide-y divide-gray-800">
        {payments.map(payment => (
          <div
            key={payment.id}
            className="p-4 hover:bg-[#2d3b4f] transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-200">{payment.patientName}</h4>
                  <p className="text-xs text-gray-400">{payment.invoiceId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-200">£{payment.amount}</p>
                <p className="text-xs text-gray-400">{new Date(payment.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <CreditCard className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400 capitalize">{payment.method}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm text-gray-300">
          View All Payments
        </button>
      </div>
    </div>
  );
}