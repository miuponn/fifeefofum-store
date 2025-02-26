'use client';

import { FC } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Thank you for your order at Fifeefofum!'
};

const OrderConfirmationPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg_pink">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.h1 
            className="text-2xl md:text-3xl lg:text-4xl font-chewie font-bold text-dark_pink text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Thank You for Your Order!
          </motion.h1>
          
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-dark_pink font-poppins text-center mb-6">
              Your order has been received and is being processed.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/products"
                className="px-6 py-2 bg-button_pink text-white font-poppins rounded-md 
                          hover:bg-white hover:text-button_pink border border-transparent 
                          hover:border-button_pink transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;