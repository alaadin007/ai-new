import React from 'react';
import { FileText, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Invoice {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{ description: string; amount: number }>;
}

const STATUS_STYLES = {
  paid: 'text-emerald-400 bg-emerald-500/10',
  pending: 'text-amber-400 bg-amber-500/10',
  overdue: 'text-red-400 bg-red-500/10'
};

const STATUS_ICONS = {
  paid: CheckCircle,
  pending: Clock,
  overdue: AlertCircle
};

export function InvoiceList() {
  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      patientName: 'Sarah Smith',
      amount: 850,
      date: '2024-02-20',
      dueDate: '2024-03-05',
      status: 'paid',
      items: [
        { description: 'Botox Treatment', amount: 600 },
        { description: 'Consultation', amount: 250 }
      ]
    },
    {
      id: 'INV-2024-002',
      patientName: 'James Wilson',
      amount: 1200,
      date: '2024-02-18',
      dueDate: '2024-03-03',
      status: 'pending',
      items: [
        { description: 'Dermal Fillers', amount: 1200 }
      ]
    },
    {
      id: 'INV-2024-003',
      patientName: 'Emma Brown',
      amount: 450,
      date: '2024-02-15',
      dueDate: '2024-03-01',
      status: 'overdue',
      items: [
        { description: 'Follow-up Treatment', amount: 450 }
      ]
    }
  ];

  return (
    <div className="bg-[#1e293b] rounded-xl border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-gray-200">Recent Invoices</h3>
      </div>

      <div className="divide-y divide-gray-800">
        {invoices.map(invoice => {
          const StatusIcon = STATUS_ICONS[invoice.status];
          
          return (
            <div
              key={invoice.id}
              className="p-4 hover:bg-[#2d3b4f] transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-200">{invoice.patientName}</h4>
                    <p className="text-xs text-gray-400">{invoice.id}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-[#374357] rounded-lg transition-colors duration-200">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-gray-200">£{invoice.amount}</span>
                  <span className="mx-2">•</span>
                  <span>Due {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${STATUS_STYLES[invoice.status]}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="capitalize">{invoice.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm text-gray-300">
          View All Invoices
        </button>
      </div>
    </div>
  );
}