import { FC } from 'react';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';

interface CartProductSummaryProps {
    item: CartItem;
    containerStyle?: string;
}

const CartProductSummary: FC<CartProductSummaryProps> = ({ 
    item, 
    containerStyle = ''
}) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className={`flex gap-4 py-4 ${containerStyle}`}>
            <img 
                src={item.thumbnail} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md" 
            />
            
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-urbanist font-bold text-button_pink text-sm">
                            {item.name}
                        </h3>
                        {item.selectedStyle && (
                            <span className="text-xs text-dark_pink_secondary mt-1">
                                Style: {item.selectedStyle}
                            </span>
                        )}
                        <p className="font-urbanist font-semibold text-pink text-xs mt-1">
                            {item.price}
                        </p>
                    </div>

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

                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-pink hover:opacity-75"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartProductSummary;