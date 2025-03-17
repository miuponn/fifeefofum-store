'use client';

import { CartProvider } from '@/context/CartContext';
import CartSideBar from '@/components/Cart/CartSideBar';
import MobileHeader from '@/components/Mobile/MobileHeader';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="relative">
          {/* Mobile nav elements - only include MobileHeader here */}
          <div className="md:hidden">
            <MobileHeader />
          </div>

          {/* Main Content */}
          {children}

          {/* Global Overlays */}
          <CartSideBar />
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
}