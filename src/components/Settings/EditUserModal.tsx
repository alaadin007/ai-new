import React, { useState } from 'react';
import { X, Shield, Save } from 'lucide-react';
import type { User, UserRole } from './UserSettings';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<User>({ ...user });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Edit User</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
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
              Permissions
            </label>
            <div className="space-y-4">
              {/* Patient Records */}
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
                )}

                {formData.permissions.patientRecords.edit && (
                  <label className="flex items-center gap-2 ml-12">
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
                    <span className="text-gray-300">Create Records</span>
                  </label>
                )}
              </div>

              {/* Marketing Access */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.marketing}
                  onChange={e => setFormData({
                    ...formData,
                    permissions: {
                      ...formData.permissions,
                      marketing: e.target.checked
                    }
                  })}
                  className="rounded border-gray-600 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-gray-300">Marketing Access</span>
              </label>

              {/* Finance Access */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.finance}
                  onChange={e => setFormData({
                    ...formData,
                    permissions: {
                      ...formData.permissions,
                      finance: e.target.checked
                    }
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
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}