'use client';

import { FC } from 'react';
import { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import CartSideBar from '@/components/Cart/CartSideBar';
import MobileHeader from '@/components/Mobile/MobileHeader';
import FilterSidebar from '@/components/Mobile/FilterSidebar';
import HamburgerMenu from '@/components/Mobile/HamburgerMenu';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-urbanist',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#ffffff'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        <CartProvider>
          <div className="relative">
            {/* Mobile nav elements */}
            <div className="md:hidden">
              <MobileHeader />
              <HamburgerMenu />
              <FilterSidebar 
                isOpen={false} 
                closeFilter={() => {}} 
              />
            </div>

            {/* Main Content */}
            {children}

            {/* Global Overlays */}
            <CartSideBar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}