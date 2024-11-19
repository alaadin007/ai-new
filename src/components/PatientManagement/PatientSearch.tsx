import React, { useState } from 'react';
import { Search, UserPlus, Calendar, Mail, Phone, MapPin, Settings, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewPatientModal } from './NewPatientModal';
import { UserSettings } from '../Settings/UserSettings';
import { FinancePortal } from '../Finance/FinancePortal';

export function PatientSearch() {
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Smith',
      dateOfBirth: '1985-06-15',
      email: 'sarah.smith@email.com',
      phone: '+44 7700 900123',
      address: '123 High Street, London, SW1A 1AA',
      lastVisit: '2024-02-15'
    },
    {
      id: '2',
      firstName: 'James',
      lastName: 'Wilson',
      dateOfBirth: '1978-03-22',
      email: 'james.wilson@email.com',
      phone: '+44 7700 900456',
      address: '45 Park Lane, Manchester, M1 4BH',
      lastVisit: '2024-02-20'
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Brown',
      dateOfBirth: '1990-11-08',
      email: 'emma.brown@email.com',
      phone: '+44 7700 900789',
      address: '78 Queen Street, Edinburgh, EH2 1JR',
      lastVisit: '2024-02-18'
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = filteredPatients.filter(patient => 
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phone.includes(query) ||
      patient.address.toLowerCase().includes(query)
    );
    setFilteredPatients(filtered);
  };

  if (showSettings) {
    return <UserSettings onBack={() => setShowSettings(false)} />;
  }

  if (showFinance) {
    return <FinancePortal onBack={() => setShowFinance(false)} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-200">Patient Management</h2>
        <button
          onClick={() => setIsNewPatientModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <UserPlus className="w-4 h-4" />
          New Patient
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by name, email, phone, or address..."
            className="w-full px-6 py-4 bg-[#1e293b] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400 pr-12"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredPatients.map((patient) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="block bg-[#1e293b] hover:bg-[#2d3b4f] rounded-xl p-6 transition-all duration-200 border border-gray-800 hover:border-gray-700"
          >
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              {patient.firstName} {patient.lastName}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{patient.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{patient.address}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Settings Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setShowSettings(true)}
          className="bg-[#1e293b] hover:bg-[#2d3b4f] rounded-xl p-6 transition-all duration-200 border border-gray-800 hover:border-gray-700 cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
              <Settings className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-200">User Settings</h3>
          </div>
          <p className="text-sm text-gray-400">Manage your clinic profile, staff, and preferences</p>
        </div>

        <div className="bg-[#1e293b] hover:bg-[#2d3b4f] rounded-xl p-6 transition-all duration-200 border border-gray-800 hover:border-gray-700 cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-200">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-200">Marketing</h3>
          </div>
          <p className="text-sm text-gray-400">Track campaigns and manage patient communications</p>
        </div>

        <div
          onClick={() => setShowFinance(true)}
          className="bg-[#1e293b] hover:bg-[#2d3b4f] rounded-xl p-6 transition-all duration-200 border border-gray-800 hover:border-gray-700 cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-200">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-200">Finance</h3>
          </div>
          <p className="text-sm text-gray-400">Monitor revenue, expenses, and financial reports</p>
        </div>
      </div>

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
      />
    </div>
  );
}