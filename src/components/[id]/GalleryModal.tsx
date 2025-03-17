'use client';

import { FC, useEffect, useCallback, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryModal: FC<GalleryModalProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex,
  onPrevious,
  onNext
}) => {
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          if (!isFirstImage) onPrevious();
          break;
        case 'ArrowRight':
          if (!isLastImage) onNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFirstImage, isLastImage, onPrevious, onNext, onClose]);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackgroundClick}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-peach transition-colors"
            aria-label="Close gallery"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Main image */}
          <motion.div
            className="relative max-h-[90vh] max-w-[90vw] aspect-square"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Product view ${currentIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              quality={100}
              priority
            />
          </motion.div>

          {/* Navigation arrows */}
          {!isFirstImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                       transition-transform duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}
          
          {!isLastImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                       transition-transform duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <FiChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-white font-poppins text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;