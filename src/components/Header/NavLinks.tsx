'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser, FiShoppingBag, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

interface CategoryItem {
    name: string;
    path: string;
}

const SHOP_CATEGORIES: CategoryItem[] = [
    { name: "Bracelets", path: "/products/bracelets" },
    { name: "Charms & Keychains", path: "/products/charms-keychains" },
    { name: "Rings", path: "/products/rings" },
    { name: "Necklaces", path: "/products/necklaces" },
    { name: "Stickers", path: "/products/stickers" },
];

const NavLinks = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { setIsCartOpen, getCartItemsCount } = useCart();
    const itemsCount = getCartItemsCount();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsShopOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setIsShopOpen(false);
    }, [pathname]);

    return (
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5 text-dark_pink_secondary font-normal font-poppins text-xs sm:text-sm md:text-base">
            <Link 
                href="/" 
                className={`hover:text-peach transition duration-300 hover:scale-105 ${
                    pathname === '/' ? 'text-peach' : ''
                }`}
            >
                Home
            </Link>

            {/* Shop Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsShopOpen(!isShopOpen)}
                    className="flex items-center gap-1 relative transition duration-300 ease-in-out group hover:scale-105"
                >
                    <span className={`group-hover:text-peach relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-peach after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                        pathname.startsWith('/products') ? 'text-peach' : ''
                    }`}>
                        Shop
                    </span>
                    {isShopOpen ? (
                        <FiChevronUp className="ml-1 text-button_pink transition-transform duration-300" />
                    ) : (
                        <FiChevronDown className="ml-1 text-button_pink transition-transform duration-300" />
                    )}
                </button>

                {isShopOpen && (
                    <div 
                        className="absolute left-0 mt-2 w-48 bg-white border border-pink rounded-md shadow-md z-50"
                        role="menu"
                    >
                        <Link 
                            href="/products"
                            className="block px-4 py-2 text-dark_pink_secondary hover:text-peach transition duration-300 hover:scale-105"
                            role="menuitem"
                        >
                            <li className="uppercase list-none">
                                Shop All
                            </li>
                        </Link>
                        {SHOP_CATEGORIES.map((category) => (
                            <Link 
                                key={category.name}
                                href={category.path}
                                className={`block px-4 py-2 text-dark_pink_secondary hover:text-peach transition duration-300 hover:scale-105 ${
                                    pathname === category.path ? 'text-peach' : ''
                                }`}
                                role="menuitem"
                            >
                                <li className="uppercase list-none">
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Navigation Links */}
            {['about', 'faqs', 'contact'].map((path) => (
                <Link 
                    key={path}
                    href={`/${path}`}
                    className={`hover:text-peach transition duration-300 hover:scale-105 ${
                        pathname === `/${path}` ? 'text-peach' : ''
                    }`}
                >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
            ))}

            {/* User Icon */}
            <button 
                className="hover:scale-105 transition duration-300"
            >
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Cart Icon */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative hover:scale-105 transition duration-300"
            >
                <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-dark_pink_secondary" />
                {itemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-button_pink text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                        {itemsCount}
                    </span>
                )}
            </button>
        </div>
    );
};

export default NavLinks;