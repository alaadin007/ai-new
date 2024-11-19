import React, { useState } from 'react';
import { Users, MapPin, Shield, Plus, ChevronLeft, FileText, Settings as SettingsIcon } from 'lucide-react';
import { UserList } from './UserList';
import { LocationList } from './LocationList';
import { NewUserModal } from './NewUserModal';
import { NewLocationModal } from './NewLocationModal';
import { PatientRecordsSettings } from './PatientRecordsSettings';
import { ClinicSettings } from './ClinicSettings';

export type UserRole = 'owner' | 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  locationAccess: string[];
  permissions: {
    patientRecords: {
      view: boolean;
      edit: boolean;
      create: boolean;
    };
    marketing: boolean;
    finance: boolean;
  };
}

export interface Location {
  id: string;
  name: string;
  address: string;
  isMainBranch?: boolean;
}

interface UserSettingsProps {
  onBack?: () => void;
}

export function UserSettings({ onBack }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'locations'>('users');
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showNewLocationModal, setShowNewLocationModal] = useState(false);
  const [showPatientRecordsSettings, setShowPatientRecordsSettings] = useState(false);
  const [showClinicSettings, setShowClinicSettings] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to My Clinic
      </button>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-200">User Settings</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowClinicSettings(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200"
          >
            <SettingsIcon className="w-4 h-4" />
            Clinic Settings
          </button>
          <button
            onClick={() => setShowPatientRecordsSettings(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200"
          >
            <FileText className="w-4 h-4" />
            Records Settings
          </button>
          <button
            onClick={() => activeTab === 'users' ? setShowNewUserModal(true) : setShowNewLocationModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'users' ? 'User' : 'Location'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-800 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'users'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Users className="w-4 h-4" />
          Users
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'locations'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Locations
        </button>
      </div>

      {activeTab === 'users' ? (
        <UserList />
      ) : (
        <LocationList />
      )}

      {showNewUserModal && (
        <NewUserModal onClose={() => setShowNewUserModal(false)} />
      )}

      {showNewLocationModal && (
        <NewLocationModal onClose={() => setShowNewLocationModal(false)} />
      )}

      {showPatientRecordsSettings && (
        <PatientRecordsSettings onClose={() => setShowPatientRecordsSettings(false)} />
      )}

      {showClinicSettings && (
        <ClinicSettings onClose={() => setShowClinicSettings(false)} />
      )}
    </div>
  );
}