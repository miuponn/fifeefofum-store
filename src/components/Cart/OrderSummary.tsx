'use client';

import { FC } from 'react';
import { useCart } from '@/context/CartContext';

interface OrderSummaryProps {
    className?: string;
}

const OrderSummary: FC<OrderSummaryProps> = ({ className = '' }) => {
    const { getCartTotal } = useCart();
    const subtotal = getCartTotal();

    return (
        <div className={`space-y-3 md:space-y-4 ${className}`}>
            {/* Subtotal Row */}
            <div className="flex md:justify-between justify-center items-center">
                <span className="font-poppins font-semibold text-accent_green">
                    Subtotal:
                </span>
                <span className="font-urbanist font-medium text-[#83CC6D] ml-2">
                    ${subtotal.toFixed(2)}
                </span>
            </div>

            {/* Shipping Info */}
            <p className="font-urbanist font-regular text-accent_green text-center md:text-left text-sm">
                Taxes and shipping calculated at checkout.
            </p>

            {/* Checkout Button */}
            <button
                className="w-full py-3 bg-[#D2E8B0] text-white font-poppins font-semibold rounded-md
                    hover:bg-white hover:text-[#D2E8B0] border border-[#D2E8B0] 
                    transition-all duration-300"
            >
                CHECK OUT
            </button>
        </div>
    );
};

export default OrderSummary;