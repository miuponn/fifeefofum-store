'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProductSummaryProps {
    id: string;
    image: string;
    name: string;
    price: string;
}

const ProductSummary: FC<ProductSummaryProps> = ({ id, image, name, price }) => {
    const router = useRouter();
    
    const handleClick = () => {
        router.push(`/products/${id}?from=search`);
    };
    
    return (
        <motion.div 
            className="flex items-center gap-4 p-3 bg-white hover:bg-[#FFF7F7] rounded-md cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            onClick={handleClick}
        >
            {/* Product Thumbnail */}
            <div className="w-12 h-12 flex-shrink-0 relative">
                <Image 
                    src={image} 
                    alt={name}
                    fill
                    sizes="48px"
                    className="object-cover rounded-sm"
                    priority={false}
                />
            </div>

            {/* Product Info */}
            <div className="flex-grow flex justify-between items-center">
                <h4 className="font-urbanist font-bold text-pink text-sm line-clamp-1">{name}</h4>
                <p className="font-urbanist font-semibold text-peach text-xs whitespace-nowrap">{price}</p>
            </div>
        </motion.div>
    );
};

export default ProductSummary;