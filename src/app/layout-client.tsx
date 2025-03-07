'use client';

import { CartProvider } from '@/context/CartContext';
import CartSideBar from '@/components/Cart/CartSideBar';
import MobileHeader from '@/components/Mobile/MobileHeader';
import FilterSidebar from '@/components/Mobile/FilterSidebar';
import HamburgerMenu from '@/components/Mobile/HamburgerMenu';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}