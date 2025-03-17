'use client';

import { FC, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import sparklesLeft from '@/assets/images/twinkles-l.svg';
import sparklesRight from '@/assets/images/twinkles-r.svg';
import type { Product } from '@/types/product';

interface RecommendedItemsProps {
    products: Product[];
    currentProductId: string;
}

interface ProductSimilarity {
    product: Product;
    similarityScore: number;
}

const RecommendedItems: FC<RecommendedItemsProps> = ({ products, currentProductId }) => {
    const buttonStyle = "mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 border border-dark_pink text-dark_pink font-poppins text-xs sm:text-sm md:text-lg font-normal hover:text-white hover:border-pink";
    const priceStyle = "text-xs sm:text-sm md:text-md text-dark_pink font-urbanist font-semibold";
    const nameStyle = "text-sm sm:text-base md:text-lg font-urbanist text-dark_pink font-bold";
    const nameHoverStyle = "hover:underline decoration-button_pink";

    // get current product details
    const currentProduct = useMemo(() => 
        products.find(product => product.id === currentProductId),
        [products, currentProductId]
    );

    // recommended products based on similarity
    const recommendedProducts = useMemo(() => {
        if (!currentProduct) return [];

        const otherProducts = products.filter(product => product.id !== currentProductId);
        
        // calculate similarity score for each product
        const similarityScores: ProductSimilarity[] = otherProducts.map(product => {
            let score = 0;
            
            // 1. same category: highest priority (+10 points)
            if (product.category === currentProduct.category) {
                score += 10;
            }
            
            // 2. price similarity: closer prices get higher scores (max +5 points)
            const currentPrice = currentProduct.price
            const otherPrice = product.price
            const priceDiff = Math.abs(currentPrice - otherPrice);
            
            // if price difference is <$5 give high score
            // score decreases as price difference increases
            if (priceDiff < 5) {
                score += 5;
            } else if (priceDiff < 10) {
                score += 3;
            } else if (priceDiff < 20) {
                score += 1;
            }
            
            // 3. similar styles (if any), check for overlapping styles (+3 points per match)
            if (currentProduct.styles && product.styles) {
                const commonStyles = currentProduct.styles.filter(style => 
                    product.styles?.includes(style)
                );
                score += commonStyles.length * 3;
            }
            
            // 4. name similarity: check for common keywords (+2 points per match)
            const currentProductWords = currentProduct.name.toLowerCase().split(/\s+/);
            const otherProductWords = product.name.toLowerCase().split(/\s+/);
            
            const commonWords = currentProductWords.filter(word => 
                word.length > 3 && otherProductWords.includes(word)
            );
            
            score += commonWords.length * 2;
            
            return {
                product,
                similarityScore: score
            };
        });
        
        // sort by similarity score (highest first) and take top 4
        return similarityScores
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .slice(0, 4)
            .map(item => item.product);
    }, [currentProduct, currentProductId, products]);

    if (recommendedProducts.length === 0) return null;

    return (
        <section className="relative w-full pt-6 pb-3 sm:pt-8 sm:pb-4 md:pt-10 md:pb-6 lg:pt-12 lg:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            {/* section header w/ sparkles */}
            <div className="relative flex items-center justify-center gap-4 mb-3 sm:mb-4 md:mb-6">
                <Image 
                    src={sparklesLeft} 
                    alt="Left Sparkles"
                    width={32}
                    height={32}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    priority={false}
                />
                
                <motion.h2 
                    className="text-dark_pink text-xl sm:text-2xl md:text-3xl font-chewie font-semibold text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    you may also like
                </motion.h2>

                <Image 
                    src={sparklesRight} 
                    alt="Right Sparkles"
                    width={32}
                    height={32}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    priority={false}
                />
            </div>
            
            {/* Product Grid */}
            <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-6xl mx-auto">
                {recommendedProducts.map((product) => (
                    <motion.div 
                        key={product.id}
                        className="w-[90%] mx-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductCard
                            id={product.id}
                            image={product.thumbnail}
                            thumbnail2={product.thumbnail2}
                            name={product.name}
                            price={product.price}
                            buttonStyle={buttonStyle}
                            priceStyle={priceStyle}
                            nameStyle={nameStyle}
                            nameHoverStyle={nameHoverStyle}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedItems;