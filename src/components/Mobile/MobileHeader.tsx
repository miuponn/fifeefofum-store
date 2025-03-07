'use client';

import { FC, useState, ChangeEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiX, FiShoppingBag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import AnnouncementBar from '@/components/Header/AnnouncementBar';
import HamburgerMenu from './HamburgerMenu';
import logoSvg from '@/assets/images/Fifeefofum.svg';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSummary from '../Search/ProductSummary';
import productsData from '@/data/products';
import type { Product } from '@/types/product';

const MobileHeader: FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { setIsCartOpen, getCartItemsCount } = useCart();
    const itemsCount = getCartItemsCount();
    const router = useRouter();
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e?: React.FormEvent): void => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                const query = searchQuery.toLowerCase();
                const results = productsData.filter(product => {
                    if (product.name.toLowerCase().includes(query)) return true;
                    if (product.category?.toLowerCase().includes(query)) return true;
                    if (product.description?.toLowerCase().includes(query)) return true;
                    if (product.styles?.some(style => style.toLowerCase().includes(query))) return true;
                    return false;
                }).slice(0, 3);
                
                setSearchResults(results);
                setIsLoading(false);
                setShowDropdown(true);
            }, 300);
            
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }
    }, [searchQuery]);

    // close overlay when clicking outside search
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node) && 
                event.target instanceof Element && 
                !event.target.closest('button[aria-label="search"]')) {
                setShowDropdown(false);
            }
        };
        
        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

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
                        aria-label="search"
                    >
                        <FiSearch className="text-xl" />
                    </button>
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-dark_pink_secondary hover:scale-105 transition duration-300"
                    >
                        <FiShoppingBag className="text-xl" />
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-peach text-white text-xs flex items-center justify-center">
                                {itemsCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Fixed position background overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsSearchOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* slide-in search bar with functionality */}
            <div 
                ref={searchRef}
                className={`absolute top-0 left-0 w-full bg-white transform transition-transform 
                           duration-300 ease-in-out ${
                               isSearchOpen ? 'translate-y-0' : '-translate-y-full'
                           } shadow-md z-50`}
            >
                <form onSubmit={handleSearchSubmit} className="flex items-center p-4 border-b border-[#F9E1E1]">
                    <button 
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="text-accent_pink mr-4"
                    >
                        <FiX className="text-xl" />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="search..."
                        className="flex-1 bg-transparent border-none outline-none text-dark_pink_secondary 
                                 placeholder-[#F9E1E1] font-viucobacoba text-lg"
                        autoFocus
                    />
                    <button 
                        type="submit" 
                        className="text-[#F9E1E1] text-lg hover:text-accent_pink transition duration-200"
                    >
                        <FiSearch className="text-lg" />
                    </button>
                </form>
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                    {isSearchOpen && showDropdown && searchQuery.trim() !== '' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-white overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="p-3 text-center">
                                    <div className="w-5 h-5 border-2 border-dark_pink border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p className="text-xs text-dark_pink_secondary mt-1">Searching...</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto border-t border-[#F9E1E1]">
                                    {searchResults.map((product) => (
                                        <ProductSummary
                                            key={product.id}
                                            id={product.id || ''}
                                            image={product.thumbnail}
                                            name={product.name}
                                            price={product.price}
                                        />
                                    ))}
                                </div>
                            ) : searchQuery.trim().length > 0 ? (
                                <div className="p-3 text-center text-dark_pink_secondary text-sm border-t border-[#F9E1E1]">
                                    No products found
                                </div>
                            ) : null}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default MobileHeader;