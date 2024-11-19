export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string;
  medicalHistory: string;
  lastVisit?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  type: string;
  date: string;
  notes: string;
  provider: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  patientId: string;
  treatmentId?: string;
  url: string;
  type: 'before' | 'after' | 'progress';
  date: string;
  notes?: string;
  createdAt: string;
}

export interface Consent {
  id: string;
  patientId: string;
  treatmentId: string;
  signedAt: string;
  expiresAt?: string;
  documentUrl: string;
  createdAt: string;
}