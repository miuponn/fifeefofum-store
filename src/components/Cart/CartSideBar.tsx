import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartProductSummary from './CartProductSummary';

interface CartSideBarProps {
    onClose: () => void;
}

const overlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const sidebarVariants: Variants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' }
};

const CartSideBar: FC<CartSideBarProps> = ({ onClose }) => {
    const { cartItems, isCartOpen, setIsCartOpen, getCartTotal, getCartItemsCount } = useCart();
    const navigate = useNavigate();
    const isEmpty = cartItems.length === 0;

    const handleClose = (): void => {
        setIsCartOpen(false);
        onClose?.();
    };

    const handleViewCart = (): void => {
        navigate('/cart');
        handleClose();
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div 
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={handleClose}
                    />

                    <motion.div
                        variants={sidebarVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed right-0 top-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-lg"
                    >
                        {/* Cart Header */}
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
                            {isEmpty ? (
                                <p className="font-poppins text-dark_pink text-sm text-center py-8">
                                    Your cart is empty.
                                </p>
                            ) : (
                                cartItems.map(item => (
                                    <CartProductSummary
                                        key={item.id}
                                        item={item}
                                    />
                                ))
                            )}
                        </div>

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
                                    className="w-full py-3 border border-dark_pink text-dark_pink font-chewie text-md font-bold hover:bg-dark_pink hover:text-white transition-all duration-300 rounded-md"
                                >
                                    view cart
                                </button>
                                <button
                                    disabled={isEmpty}
                                    className={`w-full py-3 font-chewie text-md font-bold rounded-md transition-all duration-300 ${
                                        isEmpty 
                                            ? 'bg-[#F8DEE2] text-[#F1B3BD] cursor-not-allowed border-transparent' 
                                            : 'bg-dark_pink text-white hover:bg-white hover:text-dark_pink hover:border-dark_pink border border-transparent'
                                    }`}
                                >
                                    checkout now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSideBar;