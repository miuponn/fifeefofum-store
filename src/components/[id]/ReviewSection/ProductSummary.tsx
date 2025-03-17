'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductSummaryProps {
    image: string;
    name: string;
    price: number;
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
    const { isLoading, getNativeSymbol, getCurrencyCode, convertProductPrice } = useCurrency();

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
                <p className={priceStyle}>
                    {isLoading 
                        ? `${price}` 
                        : `${getNativeSymbol()}${convertProductPrice(price).toFixed(2)}`
                    }
                </p>
            </div>
        </motion.div>
    );
};

export default ProductSummary;