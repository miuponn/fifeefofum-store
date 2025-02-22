import { FC } from 'react';
import { useCart } from '../../context/CartContext';
import CartProductSummary from '../Cart/CartProductSummary';
import EmptyCart from '../Cart/EmptyCart';
import { CartItem } from '../../types/cart';

const MobileCartList: FC = () => {
    const { cartItems } = useCart();
    const isEmpty = cartItems.length === 0;

    if (isEmpty) {
        return <EmptyCart />;
    }

    return (
        <div className="w-full md:hidden">
            {/* Column Headers */}
            <div className="flex justify-between pb-4 border-b border-[#F9E1E1]">
                <span className="font-poppins font-medium text-dark_pink text-sm">PRODUCT</span>
                <span className="font-poppins font-medium text-dark_pink text-sm">QUANTITY</span>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-[#F9E1E1]">
                {cartItems.map((item: CartItem) => (
                    <CartProductSummary
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileCartList;