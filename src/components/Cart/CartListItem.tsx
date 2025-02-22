import { FC } from 'react';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';

interface CartListItemProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    styles: {
        nameStyle: string;
        priceStyle: string;
        subtotalStyle: string;
        quantityStyle: string;
    };
}

const CartListItem: FC<CartListItemProps> = ({ item, onUpdateQuantity, styles }) => {
    const { removeFromCart } = useCart();

    const calculateSubtotal = (): string => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return (price * item.quantity).toFixed(2);
    };

    return (
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-6 py-6 items-center">
            <div className="flex gap-4">
                <img 
                    src={item.thumbnail} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md" 
                />
                <div className="flex flex-col justify-center">
                    <h3 className={styles.nameStyle}>{item.name}</h3>
                    {item.selectedStyle && (
                        <span className="text-xs text-dark_pink_secondary mt-1">
                            Style: {item.selectedStyle}
                        </span>
                    )}
                </div>
            </div>

            <span className={`${styles.priceStyle} text-center text-sm`}>
                {item.price}
            </span>

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

            <div className="flex items-center justify-end gap-4">
                <span className={`${styles.subtotalStyle} text-right text-sm`}>
                    ${calculateSubtotal()}
                </span>
                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-pink hover:opacity-75"
                >
                    <FiX className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CartListItem;