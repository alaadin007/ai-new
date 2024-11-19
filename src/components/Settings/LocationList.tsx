import React from 'react';
import { MapPin, Users, Edit2, Trash2, CheckCircle } from 'lucide-react';
import type { Location } from './UserSettings';

export function LocationList() {
  const locations: Location[] = [
    {
      id: '1',
      name: 'Main Branch',
      address: '123 High Street, London, SW1A 1AA',
      isMainBranch: true
    },
    {
      id: '2',
      name: 'North Branch',
      address: '45 Park Lane, Manchester, M1 4BH'
    }
  ];

  const handleEditLocation = (locationId: string) => {
    console.log('Edit location:', locationId);
  };

  const handleDeleteLocation = (locationId: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      console.log('Delete location:', locationId);
    }
  };

  return (
    <div className="space-y-4">
      {locations.map(location => (
        <div
          key={location.id}
          className="bg-[#1e293b] rounded-lg p-6 border border-gray-800"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-gray-200">{location.name}</h3>
                {location.isMainBranch && (
                  <div className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-sm flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Main Branch
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                {location.address}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>3 users have access</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditLocation(location.id)}
                className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleDeleteLocation(location.id)}
                className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
                disabled={location.isMainBranch}
              >
                <Trash2 className={`w-4 h-4 ${location.isMainBranch ? 'text-gray-600' : 'text-red-400'}`} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}