export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  isMainBranch?: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: {
    patients: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    treatments: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    consents: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    users: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    locations: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    reports: {
      view: boolean;
      create: boolean;
      export: boolean;
    };
    settings: {
      view: boolean;
      edit: boolean;
    };
  };
}

export interface ClinicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  locations: Location[];
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_ROLES: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: {
      patients: { view: true, create: true, edit: true, delete: true },
      treatments: { view: true, create: true, edit: true, delete: true },
      consents: { view: true, create: true, edit: true, delete: true },
      users: { view: true, create: true, edit: true, delete: true },
      locations: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, export: true },
      settings: { view: true, edit: true }
    }
  },
  {
    id: 'doctor',
    name: 'Doctor',
    permissions: {
      patients: { view: true, create: true, edit: true, delete: false },
      treatments: { view: true, create: true, edit: true, delete: false },
      consents: { view: true, create: true, edit: true, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      locations: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: true, export: true },
      settings: { view: true, edit: false }
    }
  },
  {
    id: 'nurse',
    name: 'Nurse',
    permissions: {
      patients: { view: true, create: true, edit: true, delete: false },
      treatments: { view: true, create: true, edit: true, delete: false },
      consents: { view: true, create: true, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      locations: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: false, export: false },
      settings: { view: false, edit: false }
    }
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    permissions: {
      patients: { view: true, create: true, edit: false, delete: false },
      treatments: { view: true, create: false, edit: false, delete: false },
      consents: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      locations: { view: true, create: false, edit: false, delete: false },
      reports: { view: false, create: false, export: false },
      settings: { view: false, edit: false }
    }
  }
];