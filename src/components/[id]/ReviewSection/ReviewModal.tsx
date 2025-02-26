'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSummary from './ProductSummary';
import type { ReviewModalProps } from '@/types/review';

interface HoverStyle {
    scale: number;
    boxShadow: string;
}

const hoverStyle: HoverStyle = {
    scale: 1.02,
    boxShadow: "2px 4px 12px rgba(100, 0, 0, 0.2)"
};

const ReviewModal: FC<ReviewModalProps> = ({ 
    review, 
    onClose, 
    isOpen, 
    product, 
    allMediaReviews, 
    currentReviewIndex,
    onNavigateReview
}) => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const router = useRouter();
    
    if (!review || !isOpen || !product) return null;

    const hasMultipleMedia = review.media?.length > 1;
    const hasMultipleReviews = allMediaReviews?.length > 1;

    const handleProductClick = (): void => {
        onClose();
        if (product) {
            router.push(`/product/${product.id}`);
        }
    };

    const handleNextReview = (): void => {
        if (currentReviewIndex < allMediaReviews.length - 1) {
            setCurrentImage(0);
            onNavigateReview(currentReviewIndex + 1);
        }
    };

    const handlePrevReview = (): void => {
        if (currentReviewIndex > 0) {
            setCurrentImage(0);
            onNavigateReview(currentReviewIndex - 1);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4 md:px-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Review Navigation */}
                    {hasMultipleReviews && (
                        <>
                            <button 
                                onClick={handlePrevReview}
                                className={`absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[60] ${
                                    currentReviewIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                }`}
                                disabled={currentReviewIndex === 0}
                            >
                                <FiChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            </button>
                            <button 
                                onClick={handleNextReview}
                                className={`absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[60] ${
                                    currentReviewIndex === allMediaReviews.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                }`}
                                disabled={currentReviewIndex === allMediaReviews.length - 1}
                            >
                                <FiChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            </button>
                        </>
                    )}

                    <div className="bg-white rounded-lg w-[95%] md:w-[90%] max-w-5xl h-[90vh] flex flex-col md:flex-row overflow-hidden relative">
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-dark_pink hover:opacity-75 transition-opacity z-[55]"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        {/* Media Section */}
                        <div className="w-full md:w-2/3 h-1/2 md:h-full relative bg-black">
                            <div className="relative w-full h-full">
                                <Image
                                    key={currentImage}
                                    src={review.media[currentImage]}
                                    alt={`Review image ${currentImage + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            
                            {/* Image Navigation */}
                            {hasMultipleMedia && (
                                <>
                                    <button 
                                        onClick={() => setCurrentImage(prev => prev - 1)}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                                            currentImage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                        }`}
                                        disabled={currentImage === 0}
                                    >
                                        <FiChevronLeft className="w-8 h-8 text-white" />
                                    </button>
                                    <button 
                                        onClick={() => setCurrentImage(prev => prev + 1)}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                                            currentImage === review.media.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                                        }`}
                                        disabled={currentImage === review.media.length - 1}
                                    >
                                        <FiChevronRight className="w-8 h-8 text-white" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Review Details */}
                        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between h-1/2 md:h-full">
                            <div className="space-y-6">
                                <div className="mb-4">
                                    <time className="text-xs text-dark_pink_secondary">
                                        {new Date(review.date).toLocaleDateString()}
                                    </time>
                                    <h4 className="text-sm font-poppins text-dark_pink">
                                        {review.username}
                                    </h4>
                                </div>
                                
                                <div className="flex mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar 
                                            key={i} 
                                            className={`w-4 h-4 ${
                                                i < (review?.rating || 0) ? 'text-button_pink fill-button_pink' : 'text-button_pink'
                                            }`} 
                                        />
                                    ))}
                                </div>

                                <p className="text-[#E57485] font-poppins">
                                    {review.comment}
                                </p>
                            </div>

                            {/* Product Summary */}
                            <div className="mt-auto">
                                <h3 className="font-poppins text-dark_pink mb-4">
                                    Purchased Item
                                </h3>
                                
                                {product && (
                                    <button 
                                        onClick={handleProductClick}
                                        className="w-full text-left"
                                    >
                                        <ProductSummary 
                                            image={product.thumbnail}
                                            name={product.name}
                                            price={product.price}
                                            containerStyle="rounded-lg"
                                            nameStyle="font-urbanist font-bold text-button_pink text-sm"
                                            priceStyle="font-urbanist font-semibold text-pink text-xs mt-1"
                                            hoverStyle={hoverStyle}
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;