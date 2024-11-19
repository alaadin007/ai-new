import React, { useState } from 'react';
import { X, Upload, Globe, Mail, Phone, Instagram, Facebook, Link2, Plus } from 'lucide-react';

interface ClinicSettingsProps {
  onClose: () => void;
}

export function ClinicSettings({ onClose }: ClinicSettingsProps) {
  const [formData, setFormData] = useState({
    name: '',
    logo: null as File | null,
    address: '',
    phone: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    links: [] as { url: string; label: string }[]
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { url: '', label: '' }]
    }));
  };

  const handleUpdateLink = (index: number, field: 'url' | 'label', value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save clinic settings:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Clinic Settings</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Clinic Logo
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">
                  {formData.logo ? formData.logo.name : 'Upload clinic logo'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Supports: PNG, JPG (max 1MB)
                </span>
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Clinic Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              rows={2}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Online Presence */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={formData.website}
                onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={e => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  placeholder="@username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Facebook
              </label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={e => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                  placeholder="facebook.com/..."
                />
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Additional Links
              </label>
              <button
                type="button"
                onClick={handleAddLink}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>

            <div className="space-y-3">
              {formData.links.map((link, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={link.label}
                      onChange={e => handleUpdateLink(index, 'label', e.target.value)}
                      className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200 mb-2"
                      placeholder="Link Label"
                    />
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={link.url}
                        onChange={e => handleUpdateLink(index, 'url', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="p-2 h-fit hover:bg-[#374357] rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

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
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}