'use client';

import { FC } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import type { CartItem, Styles } from '@/types/cart';

interface CartListItemProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    styles: Styles; 
}

const CartListItem: FC<CartListItemProps> = ({ item, onUpdateQuantity, styles }) => {
    const { removeFromCart } = useCart();
    const { getNativeSymbol, convertProductPrice, getCurrencyCode, isLoading } = useCurrency();

    const calculateSubtotal = (): string => {
        const convertedPrice = convertProductPrice(item.price);
        return (convertedPrice * item.quantity).toFixed(2);
    };

    return (
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-6 items-center py-6">
            {/* Product Info */}
            <div className="flex items-center gap-4 md:gap-10">
                <div className="w-24 h-24 flex-shrink-0 relative">
                    <Image 
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 96px, 96px"
                        className="object-cover rounded-md"
                        priority={false}
                    />
                </div>
                <h3 className={`${styles.nameStyle} text-md truncate`}>
                    {item.name}
                </h3>
            </div>

            {/* Price */}
            <span className={`${styles.priceStyle} text-center text-sm`}>
                {isLoading
                    ? `${item.price}`
                    : `${getNativeSymbol()}${convertProductPrice(item.price).toFixed(2)}`
                }
            </span>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 border border-button_pink rounded-sm px-3 py-1.5">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className={styles.quantityStyle}
                        disabled={item.quantity <= 1}
                    >
                        <FiMinus className="w-3 h-3" />
                    </button>
                    <span className={`${styles.quantityStyle} min-w-[20px] text-center`}>
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className={styles.quantityStyle}
                    >
                        <FiPlus className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <span className={`${styles.subtotalStyle} text-right text-sm`}>
                {getNativeSymbol()}{calculateSubtotal()}
            </span>

            {/* Remove Button */}
            <button 
                onClick={() => removeFromCart(item.id)}
                className="text-pink hover:opacity-75 justify-self-end"
            >
                <FiX className="w-4 h-4" />
            </button>
        </div>
    );
};

export default CartListItem;