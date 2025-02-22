import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import FAQsPage from './pages/FAQsPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/Cart/CartSideBar';

const App: FC = () => {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <CartSidebar onClose={() => {}} />
        </CartProvider>
    );
};

export default App;