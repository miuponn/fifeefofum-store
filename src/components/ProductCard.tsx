'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import useImagePreloader from '@/hooks/useImagePreloader';
import { isVariantInStock } from '@/data/inventory';
import type { Product } from '@/types/product';
import productsData from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductCardProps {
    id: string;
    image: string;
    thumbnail2?: string;
    name: string;
    price: number;
    fromPath?: string;
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
    fromPath,
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
    const [isStyleSelectOpen, setIsStyleSelectOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const styleSelectRef = useRef<HTMLDivElement>(null);
    const { formatPrice, isLoading, getNativeSymbol, getCurrencyCode, convertProductPrice } = useCurrency();
    
    // find product in data to get styles
    const product = productsData.find(p => p.id === id);
    const hasStyles = product?.styles && product.styles.length > 0;
    
    // close style selector when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (styleSelectRef.current && !styleSelectRef.current.contains(event.target as Node)) {
                setIsStyleSelectOpen(false);
            }
        };
        
        if (isStyleSelectOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isStyleSelectOpen]);

    const handleProductClick = (): void => {
        const queryParam = fromPath ? `?from=${fromPath.replace('/', '')}` : '';
        router.push(`/products/${id}${queryParam}`);
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        
        if (hasStyles && !selectedStyle) {
            setIsStyleSelectOpen(true);
            return;
        }

        const cartProduct: any = {
            id,
            name,
            price,
            thumbnail: image,
            quantity: 1
        };
        
        if (selectedStyle) {
            cartProduct.variant = selectedStyle;
        }
        
        addToCart(cartProduct, 1);
        setIsCartOpen(true);
        setIsStyleSelectOpen(false);
        setSelectedStyle(null);
    };
    
    const selectStyle = (style: string): void => {
        setSelectedStyle(style);
        setIsStyleSelectOpen(false);

        const cartProduct: any = {
            id,
            name,
            price,
            thumbnail: image,
            variant: style,
            quantity: 1
        };
        
        addToCart(cartProduct, 1);
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
            {/* Product image and info */}
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
                    {isLoading 
                        ? `${price}` 
                        : `${getNativeSymbol()}${convertProductPrice(price).toFixed(2)} ${getCurrencyCode()}`
                    }                 
                </p>
            </div>

            <div className="relative w-[75%]" ref={styleSelectRef}>
                <motion.button
                    className={`w-full py-[5%] mt-[7%] rounded-md text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm transition-all duration-300 flex items-center justify-center ${buttonStyle} ${buttonHoverStyle}`}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                >
                    {hasStyles && selectedStyle ? (
                        <>
                            ADD TO CART ({selectedStyle})
                        </>
                    ) : (
                        "ADD TO CART"
                    )}
                </motion.button>
                
                {/* Style Quick Select Dropdown */}
                <AnimatePresence>
                    {isStyleSelectOpen && hasStyles && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-md shadow-md z-40 max-h-[150px] overflow-y-auto"
                        >
                            <div className="p-2">
                                {product?.styles?.map((style, index) => {
                                    const inStock = isVariantInStock(id, style);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => inStock && selectStyle(style)}
                                            className={`w-full text-left px-3 py-2 text-xs rounded-sm mb-1 last:mb-0 flex items-center justify-between
                                                ${inStock ? 'hover:bg-[#FFF7F7] text-dark_pink' : 'text-peach cursor-not-allowed'}`}
                                            disabled={!inStock}
                                        >
                                            <span>{style}{!inStock && " (Out of Stock)"}</span>
                                            {selectedStyle === style && <FiCheck className="text-dark_pink" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProductCard;