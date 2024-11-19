import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  AlertTriangle,
  FileText,
  Image,
  Lock,
  ClipboardList,
  Plus,
  History,
  BarChart,
  Camera,
  DollarSign
} from 'lucide-react';
import { SecretNotesModal } from '../components/PatientManagement/SecretNotesModal';
import { MedicalHistoryForm } from '../components/PatientManagement/MedicalHistoryForm';
import { MedicalHistoryView } from '../components/PatientManagement/MedicalHistoryView';
import { TreatmentRecord } from '../components/PatientManagement/TreatmentRecord';
import { MediaGallery } from '../components/PatientManagement/MediaGallery';
import { ConsentManagement } from '../components/PatientManagement/ConsentManagement';
import { AestheticAssessment } from '../components/PatientManagement/AestheticAssessment';
import { ImageUpload } from '../components/PatientManagement/ImageUpload';
import { NewInvoiceModal } from '../components/Finance/NewInvoiceModal';

// Sample patient data
const samplePatient = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Smith',
  dateOfBirth: '1985-06-15',
  email: 'sarah.smith@email.com',
  phone: '+44 7700 900123',
  address: '123 High Street, London, SW1A 1AA',
  patientNumber: 'P-2024-001',
  nationalId: 'NHS-123456789',
  allergies: ['Amox', 'X'],
  medicalHistory: {
    id: '1',
    date: '2024-02-21',
    provider: 'Dr. Johnson',
    questions: {
      pregnantOrBreastFeeding: false,
      previousBotox: true,
      previousFiller: false,
      hypersensitivity: false,
      permanentImplants: false,
      facialHerpes: false,
      laserTreatment: false,
      allergies: true,
      anaphylacticShock: false,
      bloodThinners: false,
      roaccutane: false,
      muscleDisorders: false,
      antibiotics: false,
      currentMedications: false,
      generalAnaesthetic: false,
      bleedingDisorder: false,
      bellsPalsy: false,
      illnesses: false,
      recentSurgery: false,
      dentalSurgery: false,
      keloidScarring: false,
      needlePhobia: false,
      proneToBruising: false,
      sunExposure: false,
      smoking: false
    },
    notes: "Previous Botox treatment 3 months ago in forehead area. Allergic to Amoxicillin and Product X.",
    smokingPerDay: ''
  },
  treatments: [
    {
      id: '1',
      type: 'Consultation + Treatment',
      date: '2024-03-15',
      provider: 'Dr. Johnson',
      category: 'Injectables'
    },
    {
      id: '2',
      type: 'Follow-up',
      date: '2024-02-01',
      provider: 'Dr. Johnson',
      category: 'Injectables'
    }
  ]
};

export default function PatientDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'history' | 'assessment' | 'consent' | 'records' | 'media' | 'payment'>('history');
  const [showNewHistoryForm, setShowNewHistoryForm] = useState(false);
  const [isSecretNotesOpen, setIsSecretNotesOpen] = useState(false);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showProfilePhotoUpload, setShowProfilePhotoUpload] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showNewRecord, setShowNewRecord] = useState(false);

  const handleProfilePhotoUpload = (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
    setShowProfilePhotoUpload(false);
  };

  const handleCopyDetails = async () => {
    const details = `
Name: ${samplePatient.firstName} ${samplePatient.lastName}
DOB: ${new Date(samplePatient.dateOfBirth).toLocaleDateString()}
Email: ${samplePatient.email}
Phone: ${samplePatient.phone}
Address: ${samplePatient.address}
    `.trim();

    await navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-8">
        <Link 
          to="/patients"
          className="text-gray-400 hover:text-gray-300 mb-4 inline-block"
        >
          ← Back to Patients
        </Link>
      </div>

      {/* Patient Header */}
      <div className="bg-[#1e293b] rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div 
              className="relative flex-shrink-0 w-20 h-20 bg-[#2d3b4f] rounded-full overflow-hidden group cursor-pointer"
              onClick={() => setShowProfilePhotoUpload(true)}
            >
              {profilePhoto ? (
                <img 
                  src={profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Patient Info */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-200">
                {samplePatient.firstName} {samplePatient.lastName}
              </h1>
              <div className="text-sm text-gray-400 mt-1">
                Patient #: {samplePatient.patientNumber} • NHS: {samplePatient.nationalId}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {samplePatient.allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded text-xs text-red-400"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Allergic to {allergy}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSecretNotesOpen(true)}
              className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200 group"
              title="Confidential Notes"
            >
              <Lock className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors duration-200" />
            </button>
            <button
              onClick={handleCopyDetails}
              className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200"
              title="Copy patient details"
            >
              {copied ? (
                <span className="text-green-400 text-sm">Copied!</span>
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm truncate">
              {new Date(samplePatient.dateOfBirth).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm truncate">{samplePatient.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span className="text-sm truncate">{samplePatient.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm truncate">{samplePatient.address}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-800 mb-6">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'history'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Medical History
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'assessment'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <BarChart className="w-4 h-4" />
          Aesthetic Assessment
        </button>
        <button
          onClick={() => setActiveTab('consent')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'consent'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          Consent Forms
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'records'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          Records
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'media'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Image className="w-4 h-4" />
          Photos/Media
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
            activeTab === 'payment'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Payment
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-[#1e293b] rounded-xl">
        {activeTab === 'history' && (
          <div className="p-6">
            <MedicalHistoryView
              questions={samplePatient.medicalHistory.questions}
              lastUpdated={samplePatient.medicalHistory.date}
              provider={samplePatient.medicalHistory.provider}
              notes={samplePatient.medicalHistory.notes}
            />
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="p-6">
            <AestheticAssessment />
          </div>
        )}

        {activeTab === 'consent' && (
          <div className="p-6">
            <ConsentManagement />
          </div>
        )}

        {activeTab === 'records' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-200">Treatment Records</h3>
              <button
                onClick={() => setShowNewRecord(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-sm"
              >
                <Plus className="w-4 h-4" />
                New Record
              </button>
            </div>

            <div className="space-y-4">
              {samplePatient.treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-[#2d3b4f] rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-200">{treatment.type}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(treatment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {treatment.provider} • {treatment.category}
                  </div>
                </div>
              ))}
            </div>

            {showNewRecord && (
              <TreatmentRecord
                onClose={() => setShowNewRecord(false)}
                onSave={(record) => {
                  console.log('New record:', record);
                  setShowNewRecord(false);
                }}
                patientEmail={samplePatient.email}
              />
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="p-6">
            <MediaGallery
              photos={[]}
              onAddPhotos={(files, type) => {
                console.log('Adding photos:', files, 'type:', type);
              }}
            />
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-200">Payment History</h3>
              <button
                onClick={() => setShowNewInvoice(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-sm"
              >
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>

            {/* Payment history will be displayed here */}
          </div>
        )}
      </div>

      {/* Modals */}
      <SecretNotesModal
        isOpen={isSecretNotesOpen}
        onClose={() => setIsSecretNotesOpen(false)}
        patientId={id || ''}
      />

      {showProfilePhotoUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-200 mb-4">Update Profile Photo</h3>
            <ImageUpload
              onImagesSelected={handleProfilePhotoUpload}
              maxFiles={1}
              showCamera={true}
              type="patient"
            />
            <button
              onClick={() => setShowProfilePhotoUpload(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNewInvoice && (
        <NewInvoiceModal
          onClose={() => setShowNewInvoice(false)}
          patientName={`${samplePatient.firstName} ${samplePatient.lastName}`}
          patientEmail={samplePatient.email}
        />
      )}
    </div>
  );
}