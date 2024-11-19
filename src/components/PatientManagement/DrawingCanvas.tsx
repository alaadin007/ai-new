import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Pencil, Square, Circle, Type, Eraser, Download, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface DrawingCanvasProps {
  photos?: string[];
  onSave: (drawings: { original: string; marked: string }[]) => void;
}

export function DrawingCanvas({ photos = [], onSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [tool, setTool] = useState<'draw' | 'rect' | 'circle' | 'text' | 'eraser'>('draw');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [drawings, setDrawings] = useState<{ original: string; marked: string }[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize canvas
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 800,
        height: 600,
        backgroundColor: '#1e293b'
      });

      const canvas = fabricRef.current;

      // Set up drawing brush
      canvas.freeDrawingBrush.color = '#ffffff';
      canvas.freeDrawingBrush.width = 2;

      // Load current photo if available
      if (photos.length > 0) {
        fabric.Image.fromURL(photos[currentPhotoIndex], (img) => {
          // Scale image to fit canvas while maintaining aspect ratio
          const scale = Math.min(
            canvas.width! / img.width!,
            canvas.height! / img.height!
          );

          img.scale(scale);
          img.center();
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }

      return () => {
        canvas.dispose();
      };
    }
  }, [currentPhotoIndex, photos]);

  const handleToolChange = (newTool: typeof tool) => {
    if (!fabricRef.current) return;

    setTool(newTool);
    const canvas = fabricRef.current;

    canvas.isDrawingMode = newTool === 'draw' || newTool === 'eraser';
    
    if (newTool === 'eraser') {
      canvas.freeDrawingBrush.color = '#1e293b';
      canvas.freeDrawingBrush.width = 20;
    } else {
      canvas.freeDrawingBrush.color = '#ffffff';
      canvas.freeDrawingBrush.width = 2;
    }
  };

  const handleAddShape = () => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    let shape;

    if (tool === 'rect') {
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: '#ffffff',
        width: 100,
        height: 100,
        strokeWidth: 2
      });
    } else if (tool === 'circle') {
      shape = new fabric.Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: '#ffffff',
        radius: 50,
        strokeWidth: 2
      });
    } else if (tool === 'text') {
      shape = new fabric.IText('Text', {
        left: 100,
        top: 100,
        fill: '#ffffff',
        fontSize: 20
      });
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
    }
  };

  const handleClear = () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    
    // Clear all objects but keep background image
    const backgroundImage = canvas.backgroundImage;
    canvas.clear();
    canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas));
  };

  const handleSaveCurrentPhoto = () => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const originalPhoto = photos[currentPhotoIndex];
    const markedPhoto = canvas.toDataURL();

    const newDrawings = [...drawings];
    newDrawings[currentPhotoIndex] = { original: originalPhoto, marked: markedPhoto };
    setDrawings(newDrawings);

    // Move to next photo if available
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else {
      onSave(newDrawings);
    }
  };

  const handleNavigatePhotos = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? currentPhotoIndex + 1 : currentPhotoIndex - 1;
    if (newIndex >= 0 && newIndex < photos.length) {
      setCurrentPhotoIndex(newIndex);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#1e293b] rounded-lg border-2 border-dashed border-gray-700">
        <ImageIcon className="w-12 h-12 text-gray-500 mb-4" />
        <p className="text-gray-400 text-center">No photos available for markup.</p>
        <p className="text-sm text-gray-500 text-center mt-2">Please upload or take photos first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {[
            { tool: 'draw', icon: Pencil, label: 'Draw' },
            { tool: 'rect', icon: Square, label: 'Rectangle' },
            { tool: 'circle', icon: Circle, label: 'Circle' },
            { tool: 'text', icon: Type, label: 'Text' },
            { tool: 'eraser', icon: Eraser, label: 'Eraser' }
          ].map(({ tool: t, icon: Icon, label }) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                handleToolChange(t as typeof tool);
                if (t !== 'draw' && t !== 'eraser') {
                  handleAddShape();
                }
              }}
              className={`p-3 rounded-lg ${
                tool === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#2d3b4f] text-gray-400 hover:text-gray-300'
              }`}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="p-3 bg-[#2d3b4f] text-gray-400 hover:text-gray-300 rounded-lg"
            title="Clear"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative border border-gray-700 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />

        {/* Photo Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1e293b]/90 px-4 py-2 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => handleNavigatePhotos('prev')}
            disabled={currentPhotoIndex === 0}
            className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm text-gray-300">
            Photo {currentPhotoIndex + 1} of {photos.length}
          </span>
          
          <button
            onClick={() => handleNavigatePhotos('next')}
            disabled={currentPhotoIndex === photos.length - 1}
            className="p-2 hover:bg-[#2d3b4f] rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveCurrentPhoto}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          {currentPhotoIndex === photos.length - 1 ? (
            <>
              <Download className="w-5 h-5" />
              Save All Photos
            </>
          ) : (
            <>
              <ChevronRight className="w-5 h-5" />
              Next Photo
            </>
          )}
        </button>
      </div>
    </div>
  );
}