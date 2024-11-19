import React, { useState } from 'react';
import { Shield, Edit2, Trash2, MapPin, FileText } from 'lucide-react';
import type { User, UserRole } from './UserSettings';
import { EditUserModal } from './EditUserModal';

const ROLE_COLORS = {
  owner: 'text-red-400',
  admin: 'text-purple-400',
  user: 'text-blue-400'
} as const;

const ROLE_BADGES = {
  owner: 'bg-red-500/10',
  admin: 'bg-purple-500/10',
  user: 'bg-blue-500/10'
} as const;

export function UserList() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@clinic.com',
      role: 'owner',
      locationAccess: ['1', '2'],
      permissions: {
        patientRecords: { view: true, edit: true, create: true },
        marketing: true,
        finance: true
      }
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@clinic.com',
      role: 'admin',
      locationAccess: ['1'],
      permissions: {
        patientRecords: { view: true, edit: true, create: true },
        marketing: true,
        finance: false
      }
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@clinic.com',
      role: 'user',
      locationAccess: ['2'],
      permissions: {
        patientRecords: { view: true, edit: false, create: false },
        marketing: false,
        finance: false
      }
    }
  ]);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <>
      <div className="space-y-4">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-[#1e293b] rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-200">{user.name}</h3>
                  <div className={`px-2 py-1 rounded text-sm ${ROLE_BADGES[user.role]} ${ROLE_COLORS[user.role]}`}>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400 mb-4">{user.email}</div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Access to: Main Branch, North Branch</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.patientRecords.view && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {user.permissions.patientRecords.create 
                          ? 'Full Records Access'
                          : user.permissions.patientRecords.edit
                            ? 'Edit Records'
                            : 'View Records'}
                      </span>
                    )}
                    {user.permissions.marketing && (
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs">
                        Marketing Access
                      </span>
                    )}
                    {user.permissions.finance && (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs">
                        Finance Access
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </>
  );
}