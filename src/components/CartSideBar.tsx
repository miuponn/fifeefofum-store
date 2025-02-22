import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext'
import CartProductSummary from "./Cart/CartProductSummary";

interface CartSidebarProps {
    onClose?: () => void;
}

const CartSidebar: FC<CartSidebarProps> = ({ onClose }) => {
    const { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        getCartTotal,
        getCartItemsCount 
    } = useCart();
    const navigate = useNavigate();

    const handleClose = (): void => {
        setIsCartOpen(false);
        onClose?.();
    };
    
    const handleViewCart = (): void => {
        setIsCartOpen(false);
        navigate('/cart');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={handleClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed right-0 top-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-lg"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[#F9E1E1] flex justify-between items-center">
                            <h2 className="font-poppins text-dark_pink text-lg">
                                Your Cart ({getCartItemsCount()})
                            </h2>
                            <button onClick={handleClose}>
                                <FiX className="w-5 h-5 text-dark_pink hover:opacity-75" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="px-6 py-4 flex-grow overflow-auto max-h-[calc(100vh-200px)]">
                            {cartItems.map(item => (
                                <CartProductSummary
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F9E1E1] p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-poppins text-xs text-dark_pink">SUBTOTAL</span>
                                <span className="font-urbanist font-semibold text-dark_pink">
                                    ${getCartTotal().toFixed(2)}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={handleViewCart}
                                    className="w-full py-2 border border-dark_pink text-dark_pink font-poppins text-sm
                                        hover:bg-dark_pink hover:text-white transition-all duration-300 rounded-md"
                                >
                                    VIEW CART
                                </button>
                                <button
                                    className="w-full py-2 bg-dark_pink text-white font-poppins text-sm
                                        hover:bg-white hover:text-dark_pink hover:border-dark_pink border border-transparent
                                        transition-all duration-300 rounded-md"
                                >
                                    CHECKOUT NOW
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;