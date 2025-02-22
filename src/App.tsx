import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/index';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product/[id]';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import CartPage from './pages/cart';
import FAQsPage from './pages/faqs';
import OrderConfirmationPage from './pages/order-confirmation';
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