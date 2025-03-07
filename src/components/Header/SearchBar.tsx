'use client';

import { useState, useEffect, useRef, ChangeEvent, FocusEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSummary from '../Search/ProductSummary';
import productsData from '@/data/products';
import type { Product } from '@/types/product';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = 'search...' }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || ''
  );
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (searchQuery.trim() === '') {
          setIsFocused(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsLoading(true);
      // Add small delay for better UX
      const timer = setTimeout(() => {
        const query = searchQuery.toLowerCase();
        const results = productsData.filter(product => {
          // Search in name
          if (product.name.toLowerCase().includes(query)) return true;
          
          // Search in category
          if (product.category?.toLowerCase().includes(query)) return true;
          
          // Search in description if available
          if (product.description?.toLowerCase().includes(query)) return true;
          
          // Search in styles/variants
          if (product.styles?.some(style => style.toLowerCase().includes(query))) return true;
          
          return false;
        })
        .slice(0, 3);
        
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleFocus = (): void => {
    setIsFocused(true);
    if (searchQuery.trim().length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (e.relatedTarget && searchRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    
    if (e.target.value === '') {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative transition-all duration-300 ease-in-out">
        <div
          className={`flex items-center border-b-2 border-[#F9E1E1] w-32 md:w-48 lg:w-64 py-1 px-3 
            transition-all duration-300 ease-in-out
            ${isFocused ? "border-2 border-pink w-64 md:w-80 lg:w-96 rounded-md" : ""}
          `}
        >
          {!isFocused && !searchQuery && (
            <span 
              className="absolute left-3 text-[#F9E1E1] font-viucobacoba text-lg 
                transition-opacity duration-300 pointer-events-none"
            >
              {placeholder}
            </span>
          )}

          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-grow bg-transparent outline-none font-viucobacoba text-dark_pink_secondary 
              text-sm transition-all duration-300 ease-in-out w-full"
          />
        </div>

        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
            hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <FiSearch
            className={`text-[#F9E1E1] text-lg transition-all duration-300 ease-in-out
              ${isFocused ? "text-accent_pink" : ""}
            `}
          />
        </button>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full bg-white shadow-md rounded-md overflow-hidden"
          >
            {isLoading ? (
              <div className="p-3 text-center">
                <div className="w-5 h-5 border-2 border-dark_pink border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-viucobacoba text-dark_pink_secondary mt-1">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
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
            ) : (
              <div className="p-3 text-center text-dark_pink_secondary text-sm">
                No products found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;