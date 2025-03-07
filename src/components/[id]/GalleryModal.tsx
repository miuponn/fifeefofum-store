'use client';

import { FC, useEffect, useCallback, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialImageIndex: number;
}

const GalleryModal: FC<GalleryModalProps> = ({ isOpen, onClose, images, initialImageIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  
  const handlePreviousImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialImageIndex);
    }
  }, [isOpen, initialImageIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          handlePreviousImage();
          break;
        case 'ArrowRight':
          handleNextImage();
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
  }, [isOpen, handlePreviousImage, handleNextImage, onClose]);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={handleBackgroundClick}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:text-peach transition-colors"
            aria-label="Close gallery"
          >
            <FiX className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div className="relative w-full max-w-5xl h-[80vh] max-h-[80vh]">
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`Product image ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
                className="object-contain"
              />
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
                className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all pointer-events-auto"
                disabled={images.length <= 1}
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-8 h-8 text-white" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all pointer-events-auto"
                disabled={images.length <= 1}
                aria-label="Next image"
              >
                <FiChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Pagination indicator */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-40'
                  } transition-all`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;