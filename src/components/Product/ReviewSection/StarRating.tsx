import { FC } from 'react';
import { FiStar } from 'react-icons/fi';
import reviewsData from '../../../data/reviews';
import { Review } from '../../../types/review';

interface StarRatingProps {
    productId: string;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

interface Reviews {
    productId: string;
    reviews: Review[];
}

const StarRating: FC<StarRatingProps> = ({ 
    productId, 
    size = 'md',
    showCount = true 
}) => {
    const productReviews = (reviewsData as Reviews[])
        .find(p => p.productId === productId)?.reviews || [];

    const averageRating = productReviews.length > 0
        ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
        : 0;

    const starSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                        key={star}
                        className={`${starSizes[size]} ${
                            star <= averageRating 
                                ? 'text-button_pink fill-button_pink' 
                                : 'text-button_pink'
                        }`}
                    />
                ))}
            </div>
            {showCount && productReviews.length > 0 && (
                <span className="text-xs font-poppins text-button_pink">
                    ({productReviews.length})
                </span>
            )}
        </div>
    );
};

export default StarRating;