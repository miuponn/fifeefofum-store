'use client';

import { FC } from 'react';
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

const RecommendedItems: FC<RecommendedItemsProps> = ({ products, currentProductId }) => {
    const buttonStyle = "mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 border border-dark_pink text-dark_pink font-poppins text-xs sm:text-sm md:text-lg font-normal hover:bg-dark_pink hover:text-white";
    const priceStyle = "text-xs sm:text-sm md:text-md text-dark_pink font-urbanist font-semibold";
    const nameStyle = "text-sm sm:text-base md:text-lg font-urbanist text-dark_pink font-bold";
    const nameHoverStyle = "hover:underline decoration-button_pink";

    // Filter out current product and get random 4 products
    const recommendedProducts = products
        .filter(product => product.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

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