'use client';

import { FC } from 'react';
import CartListItem from './CartListItem';
import { useCart } from '@/context/CartContext';
import type { Styles } from '@/types/cart';

const CartList: FC = () => {
    const { cartItems, updateQuantity } = useCart();

    const styles: Styles = {
        nameStyle: "font-urbanist font-medium text-button_pink",
        priceStyle: "font-urbanist font-regular text-pink",
        subtotalStyle: "font-urbanist font-regular text-dark_pink",
        quantityStyle: "font-poppins font-light text-dark_pink"
    };

    return (
        <div className="w-full hidden md:block">
            {/* Column Headers */}
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-6 pb-4 border-b border-[#F9E1E1]">
                <span className="font-poppins font-medium text-accent_green text-sm">
                    PRODUCT
                </span>
                <span className="font-poppins font-medium text-accent_green text-sm text-center">
                    PRICE
                </span>
                <span className="font-poppins font-medium text-accent_green text-sm text-center">
                    QUANTITY
                </span>
                <span className="font-poppins font-medium text-accent_green text-sm text-right">
                    TOTAL
                </span>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-[#F9E1E1]">
                {cartItems.map((item) => (
                    <CartListItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        styles={styles}
                    />
                ))}
            </div>
        </div>
    );
};

export default CartList;