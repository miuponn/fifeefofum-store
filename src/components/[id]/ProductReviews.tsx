'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import StarRating from './ReviewSection/StarRating';
import ReviewModal from './ReviewSection/ReviewModal';
import reviewsData from '@/data/reviews';
import productsData from '@/data/products';
import type { Review } from '@/types/review';

interface ProductReviewsProps {
    productId: string;
}

interface ReviewTextProps {
    text: string;
}

const ReviewText: FC<ReviewTextProps> = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        if (textRef.current) {
            setShowButton(textRef.current.scrollHeight > 72);
        }
    }, [text]);

    return (
        <div>
            <p
                ref={textRef}
                className={`font-poppins text-dark_pink transition-all duration-300 ${
                    !isExpanded ? 'line-clamp-3' : ''
                }`}
            >
                {text}
            </p>
            {showButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-button_pink text-sm font-poppins mt-2"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

const ProductReviews: FC<ProductReviewsProps> = ({ productId }) => {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);

    const reviewsPerPage = 5;
    const productReviews = reviewsData.find(
        product => product.productId === productId
    )?.reviews || [];

    const allMedia = productReviews.flatMap(review => 
        review.media.map(media => ({ media, review }))
    );

    const reviewsWithMedia = productReviews.filter(review => review.media?.length > 0);
    const productData = productsData.find(p => p.id === productId);

    const handleReviewSelect = (review: Review): void => {
        setSelectedReview(review);
        const index = reviewsWithMedia.findIndex(r => r === review);
        setCurrentReviewIndex(index);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = productReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(productReviews.length / reviewsPerPage);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-chewie font-semibold text-dark_pink text-center mb-6">
                Customer Reviews
            </h2>
            
            {allMedia.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-poppins font-medium text-[#E57485] mb-4">
                        Photos from Reviews
                    </h3>
                    <div className="grid grid-cols-auto-fit gap-2" 
                         style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
                    >
                        {allMedia.map(({ media, review }, index) => (
                            <button
                                key={index}
                                onClick={() => handleReviewSelect(review)}
                                className="aspect-square rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={media}
                                        alt={`Review ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100px, 150px"
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {productReviews.length > 0 ? (
                    <>
                        {currentReviews.map((review, index) => (
                            <div key={index} className="border-b border-[#F9E1E1] pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-button_pink" 
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar 
                                                key={i} 
                                                className={`fill-current ${
                                                    i < review.rating ? 'text-button_pink' : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-dark_pink font-poppins text-sm">
                                        {review.username}
                                    </span>
                                    <time 
                                        className="text-dark_pink text-xs ml-2"
                                        dateTime={new Date(review.date).toISOString()}
                                    >
                                        {new Date(review.date).toLocaleDateString()}
                                    </time>
                                </div>
                                
                                <ReviewText text={review.comment} />

                                {review.media.length > 0 && (
                                    <div className="grid grid-cols-auto-fit gap-2 mt-4" 
                                         style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
                                    >
                                        {review.media.map((media, mediaIndex) => (
                                            <button
                                                key={mediaIndex}
                                                onClick={() => handleReviewSelect(review)}
                                                className="aspect-square rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                                            >
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={media}
                                                        alt={`${review.username}'s review photo ${mediaIndex + 1}`}
                                                        fill
                                                        sizes="(max-width: 768px) 100px, 150px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Pagination */}
                        <nav className="flex justify-center items-center gap-2 mt-8" 
                        >
                            {/* prev page button */}
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentPage === 1 
                                        ? 'bg-[#F9E1E1] text-white cursor-not-allowed' 
                                        : 'bg-button_pink text-white hover:bg-white hover:text-button_pink border border-transparent hover:border-button_pink'
                                }`}
                                disabled={currentPage === 1}
                            >
                                <FiChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Page nums */}
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentPage === i + 1
                                            ? 'bg-button_pink text-white'
                                            : 'text-button_pink hover:bg-[#F9E1E1] hover:text-white'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* Next page button */}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentPage === totalPages
                                        ? 'bg-[#F9E1E1] text-white cursor-not-allowed'
                                        : 'bg-button_pink text-white hover:bg-white hover:text-button_pink border border-transparent hover:border-button_pink'
                                }`}
                                disabled={currentPage === totalPages}
                            >
                                <FiChevronRight className="w-4 h-4" />
                            </button>
                        </nav>
                    </>
                ) : (
                    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 md:gap-8">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <StarRating productId={productId} />
                            <p className="text-dark_pink_secondary font-poppins text-sm">
                                Be the first to write a review
                            </p>
                        </div>
                        <button 
                            className="px-6 py-2 bg-button_pink text-white font-poppins rounded-md 
                                     hover:bg-white hover:text-button_pink border border-transparent 
                                     hover:border-button_pink transition-all duration-300"
                        >
                            Write a review
                        </button>
                    </div>
                )}
            </div>

            {productData && (
                <ReviewModal
                    review={selectedReview}
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    product={productData}
                    allMediaReviews={reviewsWithMedia}
                    currentReviewIndex={currentReviewIndex}
                    onNavigateReview={(newIndex: number) => {
                        setCurrentReviewIndex(newIndex);
                        setSelectedReview(reviewsWithMedia[newIndex]);
                    }}
                />
            )}
        </div>
    );
};

export default ProductReviews;