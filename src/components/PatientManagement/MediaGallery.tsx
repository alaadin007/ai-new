import React, { useState } from 'react';
import { Camera, Plus, Calendar, Clock } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface Photo {
  id: string;
  url: string;
  type: 'before' | 'after' | 'progress';
  date: string;
  treatmentId?: string;
  treatmentType?: string;
  notes?: string;
}

interface MediaGalleryProps {
  photos: Photo[];
  onAddPhotos: (files: File[], type: 'before' | 'after' | 'progress') => void;
}

export function MediaGallery({ photos, onAddPhotos }: MediaGalleryProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState<'before' | 'after' | 'progress'>('before');

  const handleAddClick = (type: typeof uploadType) => {
    setUploadType(type);
    setShowUpload(true);
  };

  const handleImagesSelected = (files: File[]) => {
    onAddPhotos(files, uploadType);
    setShowUpload(false);
  };

  const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.type]) {
      acc[photo.type] = [];
    }
    acc[photo.type].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex gap-4">
        {[
          { type: 'before' as const, label: 'Add Before Photos' },
          { type: 'after' as const, label: 'Add After Photos' },
          { type: 'progress' as const, label: 'Add Progress Photos' }
        ].map(({ type, label }) => (
          <button
            key={type}
            onClick={() => handleAddClick(type)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="bg-[#2d3b4f] rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Upload {uploadType} Photos</h3>
          <ImageUpload onImagesSelected={handleImagesSelected} />
        </div>
      )}

      {/* Photo Galleries */}
      {(['before', 'after', 'progress'] as const).map(type => (
        <div key={type} className="space-y-4">
          <h3 className="text-lg font-medium capitalize">{type} Photos</h3>
          {groupedPhotos[type]?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedPhotos[type].map(photo => (
                <div key={photo.id} className="group relative">
                  <img
                    src={photo.url}
                    alt={`${type} photo`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col justify-end p-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                      {photo.treatmentType && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{photo.treatmentType}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-[#2d3b4f] rounded-lg">
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500">No {type} photos yet</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}