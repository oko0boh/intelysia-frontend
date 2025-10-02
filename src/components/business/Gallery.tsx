import React, { useState } from 'react';
import { X } from 'lucide-react';
interface GalleryProps {
  images: string[];
  businessName: string;
}
const Gallery: React.FC<GalleryProps> = ({
  images,
  businessName
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Photo Gallery
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => <div key={index} className="aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={() => setActiveImage(image)}>
            <img src={image} alt={`${businessName} image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>)}
      </div>
      {/* Lightbox */}
      {activeImage && <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setActiveImage(null)}>
            <X className="h-8 w-8" />
          </button>
          <img src={activeImage} alt={businessName} className="max-w-full max-h-[90vh] object-contain" />
        </div>}
    </div>
  );
};
export default Gallery;