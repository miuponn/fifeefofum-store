'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import AnnouncementBar from '@/components/Header/AnnouncementBar';
import HamburgerMenu from './HamburgerMenu';
import logoSvg from '@/assets/images/Fifeefofum.svg';

const MobileHeader: FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const { setIsCartOpen, getCartItemsCount } = useCart();
    const itemsCount = getCartItemsCount();

    return (
        <header className="w-full relative z-50 md:hidden">
            {/* mobile announcement bar */}
            <div className="text-[10px] sm:text-xs">
                <AnnouncementBar message="Fun message or important notification goes here!" />
            </div>

            {/* main navbar */}
            <nav className="bg-white py-2 px-4 flex items-center justify-between relative">
                {/* left: hamburger menu */}
                <HamburgerMenu />

                {/* center: logo */}
                <Link 
                    href="/" 
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <Image 
                        src={logoSvg}
                        alt="Fifeefofum Logo"
                        width={80}
                        height={28}
                        priority
                        className="h-6 sm:h-7 w-auto"
                    />
                </Link>

                {/* right: search and cart icons */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className="text-dark_pink_secondary hover:scale-105 transition duration-300"
                    >
                        <FiSearch className="text-xl" />
                    </button>
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-dark_pink_secondary hover:scale-105 transition duration-300"
                    >
                        <FiShoppingBag className="text-xl" />
                        {itemsCount > 0 && (
                            <span 
                                className="absolute -top-2 -right-2 bg-button_pink text-white text-xs 
                                         font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                {itemsCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* slide-in search bar */}
            <div 
                className={`absolute top-0 left-0 w-full bg-white transform transition-transform 
                           duration-300 ease-in-out ${
                               isSearchOpen ? 'translate-y-0' : '-translate-y-full'
                           } shadow-md z-50`}
            >
                <div className="flex items-center p-4 border-b border-[#F9E1E1]">
                    <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="text-accent_pink mr-4"
                    >
                        <FiX className="text-xl" />
                    </button>
                    <input
                        type="text"
                        placeholder="search..."
                        className="flex-1 bg-transparent border-none outline-none text-dark_pink_secondary 
                                 placeholder-[#F9E1E1] font-viucobacoba text-lg"
                    />
                    <FiSearch className="text-[#F9E1E1] text-lg" />
                </div>
            </div>

            {/* search overlay */}
            {isSearchOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSearchOpen(false)}
                />
            )}
        </header>
    );
};

export default MobileHeader;