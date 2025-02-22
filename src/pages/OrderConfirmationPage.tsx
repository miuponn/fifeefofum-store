import { FC } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderConfirmationPage: FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg_pink">
            <Header />
            
            <main className="flex-grow py-8 md:py-12 lg:py-16">
                <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-chewie font-bold text-dark_pink text-center mb-8">
                        Thank You for Your Order!
                    </h1>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-dark_pink font-poppins text-center mb-6">
                            Your order has been received and is being processed.
                        </p>
                        <div className="flex justify-center">
                            <Link 
                                to="/products"
                                className="px-6 py-2 bg-button_pink text-white font-poppins rounded-md hover:bg-white hover:text-button_pink border border-transparent hover:border-button_pink transition-all duration-300"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderConfirmationPage;