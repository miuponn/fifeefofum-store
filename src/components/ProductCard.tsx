'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import useImagePreloader from '@/hooks/useImagePreloader';
import type { Product } from '@/types/product';

interface ProductCardProps {
    id: string;
    image: string;
    thumbnail2?: string;
    name: string;
    price: string;
    buttonStyle?: string;
    priceStyle?: string;
    nameStyle?: string;
    buttonHoverStyle?: string;
    priceHoverStyle?: string;
    nameHoverStyle?: string;
}

const ProductCard: FC<ProductCardProps> = ({
    id,
    image,
    thumbnail2,
    name,
    price,
    buttonStyle = '',
    priceStyle = '',
    nameStyle = '',
    buttonHoverStyle = 'hover:bg-pink hover:text-white',
    priceHoverStyle = 'hover:text-peach',
    nameHoverStyle = 'hover:underline decoration-dark_green'
}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { addToCart, setIsCartOpen } = useCart();
    const imagesLoaded = useImagePreloader([image, thumbnail2 || '']);

    const handleProductClick = (): void => {
        router.push(`/product/${id}`);
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        const product: Product = {
            id,
            name,
            price,
            thumbnail: image,
            quantity: 1
        };
        addToCart(product, 1);
        setIsCartOpen(true);
    };

    return (
        <motion.div
            className="p-[4%] flex flex-col items-center h-full justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <div className="w-full flex flex-col items-center space-y-[3%]">
                <div 
                    className="w-full aspect-square relative cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleProductClick}
                >
                    {imagesLoaded ? (
                        <>
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                priority={false}
                                className={`object-cover transition-opacity duration-300 ease-in-out ${
                                    isHovered ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            {thumbnail2 && (
                                <Image
                                    src={thumbnail2}
                                    alt={`${name} - alternate view`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    priority={false}
                                    className={`object-cover transition-opacity duration-300 ease-in-out ${
                                        isHovered ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            )}
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                </div>

                <h3 
                    onClick={handleProductClick}
                    className={`text-base sm:text-sm md:text-base lg:text-base xl:text-base text-center font-bold transition-all duration-300 cursor-pointer ${nameStyle} ${nameHoverStyle}`}
                >
                    {name}
                </h3>
                <p 
                    onClick={handleProductClick}
                    className={`text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm font-semibold cursor-pointer transition-all duration-300 ${priceStyle} ${priceHoverStyle}`}
                >
                    {price}
                </p>
            </div>

            <motion.button
                className={`w-[75%] py-[4%] mt-[7%] rounded-md text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm transition-all duration-300 ${buttonStyle} ${buttonHoverStyle}`}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
            >
                ADD TO CART
            </motion.button>
        </motion.div>
    );
};

export default ProductCard;