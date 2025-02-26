'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import heroData from '@/data/hero.json';

interface HeroImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images?: string[];
}

const ImageSlider: FC<ImageSliderProps> = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sliderImages, setSliderImages] = useState<HeroImage[]>([]);

  useEffect(() => {
    if (images.length > 0) {
      const formattedImages = images.map((src, index) => ({
        src,
        alt: `Hero Image ${index + 1}`
      }));
      setSliderImages(formattedImages);

      Promise.all(
        formattedImages.map(({ src }) => {
          return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = resolve;
            img.onerror = () => reject(`Failed to load image: ${src}`);
          });
        })
      )
        .then(() => setIsLoaded(true))
        .catch((error: string) => {
          console.error(error);
          setError(error);
        });
    } else if (heroData?.images?.length > 0) {
      const formattedImages = heroData.images.map((src, index) => ({
        src,
        alt: `Hero Image ${index + 1}`
      }));
      setSliderImages(formattedImages);

      Promise.all(
        formattedImages.map(({ src }) => {
          return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = resolve;
            img.onerror = () => reject(`Failed to load image: ${src}`);
          });
        })
      )
        .then(() => setIsLoaded(true))
        .catch((error: string) => {
          console.error(error);
          setError(error);
        });
    }
  }, [images]);

  const prevSlide = (): void => {
    setCurrentIndex(prev => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrentIndex(prev => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  if (error) {
    return (
      <div className="text-red bg-peach/10 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out">
        {sliderImages.length > 0 ? (
          sliderImages.map(({ src, alt }, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-accent_pink/10">
            <p className="text-dark_pink_secondary text-lg font-poppins">
              No images available
            </p>
          </div>
        )}
      </div>

      {sliderImages.length > 1 && isLoaded && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
              transition-all duration-300 hover:scale-125 focus:scale-125
              focus:outline-none ${isHovered ? "opacity-100" : "opacity-0"}`}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-4xl text-dark_pink_secondary 
              drop-shadow-lg transition-opacity duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
              transition-all duration-300 hover:scale-125 focus:scale-125
              focus:outline-none ${isHovered ? "opacity-100" : "opacity-0"}`}
            aria-label="Next slide"
          >
            <FiChevronRight className="text-4xl text-dark_pink_secondary 
              drop-shadow-lg transition-opacity duration-300" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 
            flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === currentIndex 
                    ? "bg-dark_pink_secondary w-4" 
                    : "bg-dark_pink_secondary/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;