import React, { useState } from 'react';
import { FileText, Lock, Save, X, AlertCircle } from 'lucide-react';

interface PatientRecordsSettingsProps {
  onClose: () => void;
}

export function PatientRecordsSettings({ onClose }: PatientRecordsSettingsProps) {
  const [formData, setFormData] = useState({
    unlockPassword: '0000',
    defaultPermissions: {
      view: true,
      edit: false,
      create: false
    },
    patientHistoryLock: true,
    autoLockTimeout: 5, // minutes
    requireSignature: true,
    auditLog: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
    console.log('Save patient records settings:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold">Patient Records Settings</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-400 mb-1">Important Security Notice</h4>
            <p className="text-sm text-gray-300">
              These settings affect how patient records are accessed and protected across your clinic. 
              Ensure compliance with local data protection regulations.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Security Settings */}
          <div>
            <h4 className="text-lg font-medium text-gray-200 mb-4">Security Settings</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Patient History Form Password
                </label>
                <div className="flex gap-4">
                  <input
                    type="password"
                    value={formData.unlockPassword}
                    onChange={e => setFormData(prev => ({ ...prev, unlockPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  This password is required to exit the patient history form
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Auto-Lock Timeout (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={formData.autoLockTimeout}
                  onChange={e => setFormData(prev => ({ ...prev, autoLockTimeout: parseInt(e.target.value) }))}
                  className="w-32 px-4 py-2 bg-[#2d3b4f] rounded-lg text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.patientHistoryLock}
                    onChange={e => setFormData(prev => ({ ...prev, patientHistoryLock: e.target.checked }))}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Lock patient history form during completion</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.requireSignature}
                    onChange={e => setFormData(prev => ({ ...prev, requireSignature: e.target.checked }))}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Require signature for record modifications</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.auditLog}
                    onChange={e => setFormData(prev => ({ ...prev, auditLog: e.target.checked }))}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Enable audit logging for all record access</span>
                </label>
              </div>
            </div>
          </div>

          {/* Default Permissions */}
          <div>
            <h4 className="text-lg font-medium text-gray-200 mb-4">Default User Permissions</h4>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.defaultPermissions.view}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    defaultPermissions: {
                      ...prev.defaultPermissions,
                      view: e.target.checked,
                      edit: e.target.checked ? prev.defaultPermissions.edit : false,
                      create: e.target.checked ? prev.defaultPermissions.create : false
                    }
                  }))}
                  className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">View patient records</span>
              </label>

              {formData.defaultPermissions.view && (
                <label className="flex items-center gap-2 ml-6">
                  <input
                    type="checkbox"
                    checked={formData.defaultPermissions.edit}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      defaultPermissions: {
                        ...prev.defaultPermissions,
                        edit: e.target.checked,
                        create: e.target.checked ? prev.defaultPermissions.create : false
                      }
                    }))}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Edit existing records</span>
                </label>
              )}

              {formData.defaultPermissions.edit && (
                <label className="flex items-center gap-2 ml-12">
                  <input
                    type="checkbox"
                    checked={formData.defaultPermissions.create}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      defaultPermissions: {
                        ...prev.defaultPermissions,
                        create: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Create new records</span>
                </label>
              )}
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
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}