import React, { useState } from 'react';
import { X, Shield, Mail, CreditCard, FileText } from 'lucide-react';
import type { UserRole } from './UserSettings';

interface NewUserModalProps {
  onClose: () => void;
}

const PRICING = {
  user: 10,
  admin: 20,
  owner: 50
} as const;

export function NewUserModal({ onClose }: NewUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as UserRole,
    locationAccess: [] as string[],
    permissions: {
      patientRecords: {
        view: false,
        edit: false,
        create: false
      },
      marketing: false,
      finance: false
    }
  });

  const [isInviting, setIsInviting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);

    try {
      // In production, this would call your API to:
      // 1. Create a pending user record
      // 2. Send invitation email
      // 3. Handle billing for the new seat
      console.log('Create user and send invitation:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onClose();
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Add New User</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Notice */}
        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-1">Billing Information</h4>
              <p className="text-sm text-gray-400">
                Adding a new user will add £{PRICING[formData.role]}/month to your subscription.
                The new user will be invited to create their account via email.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
            >
              <option value="user">User (£{PRICING.user}/month)</option>
              <option value="admin">Admin (£{PRICING.admin}/month)</option>
              <option value="owner">Owner (£{PRICING.owner}/month)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location Access
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.locationAccess.includes('1')}
                  onChange={e => {
                    const newAccess = e.target.checked
                      ? [...formData.locationAccess, '1']
                      : formData.locationAccess.filter(id => id !== '1');
                    setFormData({ ...formData, locationAccess: newAccess });
                  }}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">Main Branch</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.locationAccess.includes('2')}
                  onChange={e => {
                    const newAccess = e.target.checked
                      ? [...formData.locationAccess, '2']
                      : formData.locationAccess.filter(id => id !== '2');
                    setFormData({ ...formData, locationAccess: newAccess });
                  }}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">North Branch</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Patient Records Access
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.patientRecords.view}
                  onChange={e => setFormData({
                    ...formData,
                    permissions: {
                      ...formData.permissions,
                      patientRecords: {
                        ...formData.permissions.patientRecords,
                        view: e.target.checked,
                        edit: e.target.checked ? formData.permissions.patientRecords.edit : false,
                        create: e.target.checked ? formData.permissions.patientRecords.create : false
                      }
                    }
                  })}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">View Records</span>
              </label>
              
              {formData.permissions.patientRecords.view && (
                <>
                  <label className="flex items-center gap-2 ml-6">
                    <input
                      type="checkbox"
                      checked={formData.permissions.patientRecords.edit}
                      onChange={e => setFormData({
                        ...formData,
                        permissions: {
                          ...formData.permissions,
                          patientRecords: {
                            ...formData.permissions.patientRecords,
                            edit: e.target.checked,
                            create: e.target.checked ? formData.permissions.patientRecords.create : false
                          }
                        }
                      })}
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Edit Records</span>
                  </label>

                  {formData.permissions.patientRecords.edit && (
                    <label className="flex items-center gap-2 ml-6">
                      <input
                        type="checkbox"
                        checked={formData.permissions.patientRecords.create}
                        onChange={e => setFormData({
                          ...formData,
                          permissions: {
                            ...formData.permissions,
                            patientRecords: {
                              ...formData.permissions.patientRecords,
                              create: e.target.checked
                            }
                          }
                        })}
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-300">Create New Records</span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Additional Access
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.marketing}
                  onChange={e => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions, marketing: e.target.checked }
                  })}
                  className="rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-gray-300">Marketing Access</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.finance}
                  onChange={e => setFormData({
                    ...formData,
                    permissions: { ...formData.permissions, finance: e.target.checked }
                  })}
                  className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-gray-300">Finance Access</span>
              </label>
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
              disabled={isInviting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:bg-blue-800 disabled:cursor-wait"
            >
              {isInviting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Invitation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}