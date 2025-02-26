'use client';

import { FC, useState, TouchEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const isFirstImage = selectedImage === 0;
    const isLastImage = selectedImage === images.length - 1;

    const nextImage = (): void => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const previousImage = (): void => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleTouchStart = (e: TouchEvent): void => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent): void => {
        if (!touchStart) return;

        const currentTouch = e.touches[0].clientX;
        const diff = touchStart - currentTouch;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && !isLastImage) {
                nextImage();
            } else if (diff < 0 && !isFirstImage) {
                previousImage();
            }
            setTouchStart(null);
        }
    };

    const toggleFullscreen = (): void => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image Container */}
            <div 
                className="w-full aspect-square overflow-hidden relative rounded-lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setTouchStart(null)}
            >
                {/* desktop nav arrows */}
                <AnimatePresence>
                    {isHovering && (
                        <>
                            {!isFirstImage && (
                                <motion.button
                                    className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 
                                             transition-transform duration-300 hover:scale-110"
                                    onClick={previousImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronLeft className="w-8 h-8 text-white" />
                                </motion.button>
                            )}
                            {!isLastImage && (
                                <motion.button
                                    className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 
                                             transition-transform duration-300 hover:scale-110"
                                    onClick={nextImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronRight className="w-8 h-8 text-white" />
                                </motion.button>
                            )}
                        </>
                    )}
                </AnimatePresence>

                {/* main image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        className="relative w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggleFullscreen}
                    >
                        <Image
                            src={images[selectedImage]}
                            alt={`Product view ${selectedImage + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={selectedImage === 0}
                            className="object-cover cursor-pointer"
                            quality={90}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* mobile pagination */}
            <div className="flex md:hidden justify-center items-center gap-3 py-2">
                <button 
                    onClick={previousImage}
                    disabled={isFirstImage}
                >
                    <FiChevronLeft 
                        className={`w-4 h-4 ${isFirstImage ? 'text-[#F9E1E1]' : 'text-pink'}`} 
                    />
                </button>
                <span className="font-poppins text-xs text-pink">
                    {selectedImage + 1}/{images.length}
                </span>
                <button 
                    onClick={nextImage}
                    disabled={isLastImage}
                >
                    <FiChevronRight 
                        className={`w-4 h-4 ${isLastImage ? 'text-[#F9E1E1]' : 'text-pink'}`}
                    />
                </button>
            </div>

            {/* desktop thumbnail grid */}
            <div className="hidden md:grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden border-2 rounded-md relative
                            transition-all duration-300 ease-in-out ${
                            selectedImage === index ? 'border-dark_pink' : 'border-transparent hover:border-pink'
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`Product view ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 25vw, 15vw"
                            className="object-cover transition-transform duration-300 hover:scale-110"
                            quality={75}
                        />
                    </button>
                ))}
            </div>

            {/* fullscreen modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleFullscreen}
                    >
                        <motion.div
                            className="relative max-h-[90vh] max-w-[90vw] aspect-square"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                        >
                            <Image
                                src={images[selectedImage]}
                                alt={`Product view ${selectedImage + 1}`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductGallery;