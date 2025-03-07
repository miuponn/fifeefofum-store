'use client';

import { FC } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/types/cart';

interface CartProductSummaryProps {
    item: CartItem;
    containerStyle?: string;
}

const CartProductSummary: FC<CartProductSummaryProps> = ({ 
    item, 
    containerStyle = '' 
}) => {
    const { updateQuantity, removeFromCart } = useCart();
    const subtotal = (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2);

    return (
        <div className={`flex items-center gap-4 py-4 border-b border-[#F9E1E1] last:border-b-0 ${containerStyle}`}>
            {/* Product Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0 relative">
                <Image 
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-md"
                    priority={false}
                />
            </div>

            {/* Product Info */}
            <div className="flex-grow">
                <h4 className="font-urbanist font-bold text-dark_pink text-sm">
                    {item.name}
                </h4>
                {item.variant && (
                    <span className="text-xs text-dark_pink_secondary mt-1 block">
                        Style: {item.variant}
                    </span>
                )}
                <p className="font-urbanist font-semibold text-dark_pink_secondary text-xs mt-1">
                    ${subtotal}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 border border-peach rounded-sm px-1 py-2">
                <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-dark_pink"
                    disabled={item.quantity <= 1}
                >
                    <FiMinus className="w-3 h-3" />
                </button>
                <span className="text-dark_pink font-poppins text-xs min-w-[20px] text-center">
                    {item.quantity}
                </span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-dark_pink"
                >
                    <FiPlus className="w-3 h-3" />
                </button>
            </div>

            {/* Remove Button */}
            <button 
                onClick={() => removeFromCart(item.id)}
                className="text-pink hover:opacity-75"
            >
                <FiX className="w-4 h-4" />
            </button>
        </div>
    );
};

export default CartProductSummary;