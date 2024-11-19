import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar, Download, Filter, TrendingUp, CreditCard, CheckCircle, Clock, AlertCircle, FileText, MoreVertical } from 'lucide-react';
import { NewInvoiceModal } from './NewInvoiceModal';
import { RevenueChart } from './RevenueChart';
import { DateRangePicker } from './DateRangePicker';

interface FinancePortalProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: 'invoice' | 'payment';
  patientName: string;
  amount: number;
  date: string;
  status?: 'paid' | 'pending' | 'overdue';
  method?: 'card' | 'cash' | 'transfer';
  invoiceId?: string;
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

export function FinancePortal({ onBack }: FinancePortalProps) {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | '7d' | '30d' | '90d' | 'custom'>('30d');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Combined transactions list
  const transactions: Transaction[] = [
    {
      id: 'PAY-2024-001',
      type: 'payment',
      patientName: 'Sarah Smith',
      amount: 850,
      date: '2024-02-20',
      method: 'card',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 'INV-2024-002',
      type: 'invoice',
      patientName: 'James Wilson',
      amount: 1200,
      date: '2024-02-18',
      status: 'pending'
    },
    {
      id: 'PAY-2024-002',
      type: 'payment',
      patientName: 'Michael Chen',
      amount: 1500,
      date: '2024-02-19',
      method: 'transfer',
      invoiceId: 'INV-2024-002'
    },
    {
      id: 'INV-2024-003',
      type: 'invoice',
      patientName: 'Emma Brown',
      amount: 450,
      date: '2024-02-15',
      status: 'overdue'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to My Clinic
      </button>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-200">Finance Portal</h2>
        <button
          onClick={() => setShowNewInvoice(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Monthly Revenue</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-200">£24,500</p>
          <p className="text-sm text-emerald-400 mt-1">↑ 12% from last month</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Outstanding</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-200">£3,250</p>
          <p className="text-sm text-gray-400 mt-1">5 unpaid invoices</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Download className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400">Recent Activity</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-200">15</p>
          <p className="text-sm text-gray-400 mt-1">Transactions this week</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-[#1e293b] rounded-xl border border-gray-800 mb-8">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-200">Recent Transactions</h3>
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm"
          >
            <Filter className="w-4 h-4" />
            {dateRange === 'custom' ? 'Custom Range' : `Last ${dateRange}`}
          </button>
        </div>

        <div className="divide-y divide-gray-800">
          {transactions.map(transaction => {
            const isPayment = transaction.type === 'payment';
            const StatusIcon = isPayment ? CheckCircle : STATUS_ICONS[transaction.status!];
            
            return (
              <div
                key={transaction.id}
                className="p-4 hover:bg-[#2d3b4f] transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isPayment ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}>
                      {isPayment ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-200">{transaction.patientName}</h4>
                      <p className="text-xs text-gray-400">
                        {isPayment ? `Payment for ${transaction.invoiceId}` : transaction.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-200">£{transaction.amount}</p>
                      <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    {!isPayment && (
                      <button className="p-1 hover:bg-[#374357] rounded-lg transition-colors duration-200">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {isPayment ? (
                    <>
                      <CreditCard className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 capitalize">{transaction.method}</span>
                    </>
                  ) : (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${STATUS_STYLES[transaction.status!]}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{transaction.status}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm text-gray-300">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-200">Revenue Overview</h3>
        </div>
        <RevenueChart />
      </div>

      {showNewInvoice && (
        <NewInvoiceModal onClose={() => setShowNewInvoice(false)} />
      )}

      {showDatePicker && (
        <DateRangePicker
          onClose={() => setShowDatePicker(false)}
          onSelect={(range) => {
            setDateRange(range);
            setShowDatePicker(false);
          }}
        />
      )}
    </div>
  );
}