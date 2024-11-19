import React, { useState } from 'react';
import { Camera, Upload, PencilLine, Trash2, Plus, CreditCard } from 'lucide-react';
import { DrawingCanvas } from './DrawingCanvas';
import { ImageUpload } from './ImageUpload';
import { PaymentSection } from './PaymentSection';

interface TreatmentRecordProps {
  onClose: () => void;
  onSave: (record: any) => void;
  patientEmail?: string;
}

export function TreatmentRecord({ onClose, onSave, patientEmail }: TreatmentRecordProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'products' | 'payment'>('overview');
  const [treatmentData, setTreatmentData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    discussion: '',
    treatment: '',
    photos: [] as File[],
    drawings: [] as string[],
    products: [] as { name: string; batch: string; serial: string; photo?: File }[],
    payment: {
      amount: 0,
      method: '',
      notes: '',
      sendReceipt: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(treatmentData);
    onClose();
  };

  const handleAddProduct = () => {
    setTreatmentData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', batch: '', serial: '' }]
    }));
  };

  const handleRemoveProduct = (index: number) => {
    setTreatmentData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-[#1e293b] rounded-xl p-6 m-4 max-w-4xl w-full">
        <h2 className="text-xl font-semibold mb-6">New Treatment Record</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: PencilLine },
              { id: 'photos', label: 'Photos', icon: Camera },
              { id: 'products', label: 'Products', icon: Upload },
              { id: 'payment', label: 'Payment', icon: CreditCard }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={treatmentData.date}
                    onChange={e => setTreatmentData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                  <select
                    value={treatmentData.type}
                    onChange={e => setTreatmentData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  >
                    <option value="">Select type...</option>
                    <option value="consultation">Consultation</option>
                    <option value="treatment">Treatment</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Discussion & Assessment
                </label>
                <textarea
                  value={treatmentData.discussion}
                  onChange={e => setTreatmentData(prev => ({ ...prev, discussion: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  placeholder="Enter discussion notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Treatment Overview
                </label>
                <textarea
                  value={treatmentData.treatment}
                  onChange={e => setTreatmentData(prev => ({ ...prev, treatment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  placeholder="Enter treatment details..."
                />
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <ImageUpload
                onImagesSelected={files => setTreatmentData(prev => ({
                  ...prev,
                  photos: [...prev.photos, ...files]
                }))}
              />
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Treatment Area Markup</h3>
                <DrawingCanvas
                  onSave={drawing => setTreatmentData(prev => ({
                    ...prev,
                    drawings: [...prev.drawings, drawing]
                  }))}
                />
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {treatmentData.products.map((product, index) => (
                <div key={index} className="p-4 bg-[#2d3b4f] rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-300">Product {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="p-1 hover:bg-[#374357] rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={product.name}
                      onChange={e => {
                        const newProducts = [...treatmentData.products];
                        newProducts[index].name = e.target.value;
                        setTreatmentData(prev => ({ ...prev, products: newProducts }));
                      }}
                      placeholder="Product name"
                      className="px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                    />
                    <input
                      type="text"
                      value={product.batch}
                      onChange={e => {
                        const newProducts = [...treatmentData.products];
                        newProducts[index].batch = e.target.value;
                        setTreatmentData(prev => ({ ...prev, products: newProducts }));
                      }}
                      placeholder="Batch number"
                      className="px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                    />
                    <input
                      type="text"
                      value={product.serial}
                      onChange={e => {
                        const newProducts = [...treatmentData.products];
                        newProducts[index].serial = e.target.value;
                        setTreatmentData(prev => ({ ...prev, products: newProducts }));
                      }}
                      placeholder="Serial number"
                      className="px-3 py-2 bg-[#1e293b] rounded-lg text-gray-200"
                    />
                    <ImageUpload
                      onImagesSelected={files => {
                        const newProducts = [...treatmentData.products];
                        newProducts[index].photo = files[0];
                        setTreatmentData(prev => ({ ...prev, products: newProducts }));
                      }}
                      maxFiles={1}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <PaymentSection
              payment={treatmentData.payment}
              onChange={payment => setTreatmentData(prev => ({ ...prev, payment }))}
              patientEmail={patientEmail}
            />
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}