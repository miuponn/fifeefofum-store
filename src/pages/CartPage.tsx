import { FC } from "react";
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartList from '../components/Cart/CartList';
import MobileCartList from '../components/Mobile/MobileCartList';
import OrderMessage from '../components/Cart/OrderMessage';
import OrderSummary from '../components/Cart/OrderSummary';
import EmptyCart from '../components/Cart/EmptyCart';

const CartPage: FC = () => {
    const { getCartItemsCount, cartItems } = useCart();
    const isEmpty = cartItems.length === 0;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            
            <main className="flex-grow py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                    {/* Header with conditional border */}
                    <div className={`flex justify-between items-baseline ${isEmpty ? 'border-b border-[#F9E1E1]' : ''} pb-6`}>
                        <div className="flex items-baseline gap-2">
                            <h1 className="font-magicalsnow text-accent_green text-5xl pt-2">
                                Your Cart
                            </h1>
                            <span className="font-poppins font-regular text-accent_green text-2xl">
                                ({getCartItemsCount()})
                            </span>
                        </div>
                        
                        {!isEmpty && (
                            <>
                                {/* Desktop Link */}
                                <Link 
                                    to="/products"
                                    className="hidden md:inline-flex items-center gap-2 font-poppins text-peach text-sm font-regular"
                                >
                                    <span className="relative after:content-[''] after:absolute after:bottom-[-2px] 
                                        after:left-0 after:w-full after:h-[1px] after:bg-peach
                                        hover:[#F9E1E1] hover:after:bg-[#F9E1E1]
                                        after:transition-colors after:duration-300"
                                    >
                                        Continue shopping
                                    </span>
                                    <FiArrowRight className="w-4 h-4 text-peach hover:[#F9E1E1] transition-colors duration-300" />
                                </Link>
                                
                                {/* Mobile Icon */}
                                <Link 
                                    to="/products"
                                    className="md:hidden text-dark_pink hover:text-peach transition-colors duration-300"
                                >
                                    <FiArrowLeft className="w-6 h-6" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Cart Content */}
                    <div className="py-8">
                        {isEmpty ? (
                            <EmptyCart buttonStyle="bg-dark_pink text-white hover:bg-white hover:text-dark_pink hover:border-dark_pink border border-transparent transition-all duration-300" />
                        ) : (
                            <>
                                <div className="border-b border-[#F9E1E1]">
                                    <CartList />
                                    <MobileCartList />
                                </div>
                                
                                {/* Order Details Section */}
                                <div className="flex flex-col md:flex-row md:justify-between gap-8 mt-8 pt-2">
                                    <div className="w-full md:w-1/2">
                                        <OrderMessage />
                                    </div>
                                    <div className="w-full md:w-96">
                                        <OrderSummary />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;