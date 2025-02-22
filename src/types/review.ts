import { Product } from "./product";

export interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
  media: string[];
}

export interface ProductReviews {
  productId: string;
  reviews: Review[];
}

export interface ReviewModalProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  allMediaReviews: Review[];
  currentReviewIndex: number;
  onNavigateReview: (index: number) => void;
}