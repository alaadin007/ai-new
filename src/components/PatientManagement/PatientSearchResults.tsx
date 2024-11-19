import React from 'react';
import { Calendar, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  lastVisit?: string;
}

interface PatientSearchResultsProps {
  results: Patient[];
  isLoading: boolean;
}

export function PatientSearchResults({ results, isLoading }: PatientSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-[#1e293b] rounded-xl p-6">
            <div className="h-5 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No patients found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((patient) => (
        <Link
          key={patient.id}
          to={`/patients/${patient.id}`}
          className="block bg-[#1e293b] hover:bg-[#2d3b4f] rounded-xl p-6 transition-colors duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">
                {patient.firstName} {patient.lastName}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
                
                {patient.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{patient.email}</span>
                  </div>
                )}
                
                {patient.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {patient.lastVisit && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}