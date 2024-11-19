import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  showCamera?: boolean;
  type?: 'patient' | 'product';
}

export function ImageUpload({ onImagesSelected, maxFiles = 10, showCamera = true, type = 'patient' }: ImageUploadProps) {
  const [showCameraInput, setShowCameraInput] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup function for camera stream
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviewUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    onImagesSelected(acceptedFiles);
  }, [onImagesSelected]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play(); // Explicitly start playing
        streamRef.current = stream;
      }
      setShowCameraInput(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCameraInput(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if using front camera
    ctx.translate(videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(blob);
      setPreviewUrls(prev => [...prev, previewUrl]);
      onImagesSelected([file]);
      stopCamera();
    }, 'image/jpeg', 0.8); // 80% quality for compression
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {showCameraInput ? (
        <div className="relative bg-[#1e293b] rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[400px] object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={capturePhoto}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center gap-2 text-lg"
              type="button"
            >
              <Camera className="w-5 h-5" />
              Capture
            </button>
            <button
              onClick={stopCamera}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-lg"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-300">Upload Photos</h3>
            {showCamera && (
              <button
                onClick={startCamera}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2d3b4f] hover:bg-[#374357] rounded-lg transition-colors duration-200 text-sm"
                type="button"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
            )}
          </div>

          <div
            onClick={() => document.getElementById('file-upload')?.click()}
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors border-gray-700 hover:border-gray-600"
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple={maxFiles > 1}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                onDrop(files);
              }}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#2d3b4f] rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400">Drag & drop</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-[#2d3b4f] rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400">Browse files</p>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Supports: PNG, JPG, JPEG (max {maxFiles} {maxFiles === 1 ? 'file' : 'files'})
                <br />
                Images will be automatically compressed to {type === 'patient' ? '150KB' : '50KB'}
              </p>
            </div>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    type="button"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}