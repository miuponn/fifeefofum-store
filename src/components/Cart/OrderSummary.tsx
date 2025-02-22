import { FC } from 'react';
import { useCart } from '../../context/CartContext';

interface OrderSummaryProps {
    className?: string;
}

const OrderSummary: FC<OrderSummaryProps> = ({ className = '' }) => {
    const { getCartTotal } = useCart();
    const subtotal = getCartTotal();
    const shipping: number = 0; 
    const total = subtotal + shipping;

    return (
        <div className={`space-y-6 ${className}`}>
            <h2 className="font-poppins font-semibold text-dark_pink text-lg">
                Order Summary
            </h2>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="font-poppins text-dark_pink_secondary">Subtotal</span>
                    <span className="font-urbanist font-semibold text-dark_pink">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-poppins text-dark_pink_secondary">Shipping</span>
                    <span className="font-urbanist font-semibold text-dark_pink">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#F9E1E1]">
                    <span className="font-poppins font-medium text-dark_pink">Total</span>
                    <span className="font-urbanist font-bold text-dark_pink">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>

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