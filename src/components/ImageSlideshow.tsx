
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlideshowProps {
  images: string[];
  title: string;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg overflow-hidden shadow-xl border-2 border-red-200">
      {/* Main image display */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img 
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`}
                alt={`${title} - Ansicht ${index + 1}`}
                className="w-full h-full object-cover filter sepia-[15%] saturate-[120%] contrast-[110%] brightness-[95%]"
              />
              {/* Vintage grain overlay */}
              <div className="absolute inset-0 bg-vintage-grain opacity-20 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold font-mono">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="p-4 bg-gradient-to-r from-red-100 to-yellow-100">
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentImage === index 
                  ? 'border-red-600 shadow-lg scale-110' 
                  : 'border-gray-300 hover:border-red-400'
              }`}
            >
              <img 
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=100&q=80`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover filter sepia-[10%] saturate-[110%]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-colors duration-200 ${
            isAutoPlaying 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-600 text-white'
          }`}
        >
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </button>
      </div>
    </div>
  );
};

export default ImageSlideshow;
