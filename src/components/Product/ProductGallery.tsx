import { FC, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const handleNextImage = (): void => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = (): void => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const toggleFullscreen = (): void => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={`Product view ${selectedImage + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={toggleFullscreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Mobile Navigation Arrows */}
                <div className="md:hidden absolute inset-0 flex items-center justify-between p-4">
                    <button
                        onClick={handlePrevImage}
                        className="bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                        <FiChevronLeft className="w-6 h-6 text-dark_pink" />
                    </button>
                    <button
                        onClick={handleNextImage}
                        className="bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                        <FiChevronRight className="w-6 h-6 text-dark_pink" />
                    </button>
                </div>
            </div>

            {/* Desktop Thumbnail Grid */}
            <div className="hidden md:grid grid-cols-4 gap-2 mt-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden border-2 rounded-md transition-all duration-300 ease-in-out
                            ${selectedImage === index ? 'border-dark_pink' : 'border-transparent hover:border-pink'}`}
                    >
                        <img
                            src={image}
                            alt={`Product view ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </button>
                ))}
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleFullscreen}
                    >
                        <motion.img
                            src={images[selectedImage]}
                            alt={`Product view ${selectedImage + 1}`}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductGallery;