'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductSummaryProps {
    image: string;
    name: string;
    price: string;
    containerStyle?: string;
    nameStyle?: string;
    priceStyle?: string;
    hoverStyle?: {
        scale?: number;
        boxShadow?: string;
    };
}

const ProductSummary: FC<ProductSummaryProps> = ({ 
    image, 
    name, 
    price, 
    containerStyle = "", 
    nameStyle = "", 
    priceStyle = "",
    hoverStyle = {} 
}) => {
    return (
        <motion.div 
            className={`flex items-center gap-4 p-2 transition-all duration-300 ${containerStyle}`}
            whileHover={hoverStyle}
        >
            {/* Product Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0 relative">
                <Image 
                    src={image} 
                    alt={name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-md"
                    priority={false}
                />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
                <h4 className={nameStyle}>{name}</h4>
                <p className={priceStyle}>{price}</p>
            </div>
        </motion.div>
    );
};

export default ProductSummary;