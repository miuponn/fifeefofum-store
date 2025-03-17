'use client';

import { FC, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import productsData from '@/data/products';
import { isVariantInStock } from '@/data/inventory';
import type { Product } from '@/types/product';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductGridProps {
    backgroundColor: string;
    sortOption: 'Bestselling' | 'Alphabetical' | 'PriceLowHigh' | 'PriceHighLow';
    onSortChange: (value: 'Bestselling' | 'Alphabetical' | 'PriceLowHigh' | 'PriceHighLow') => void;
    categoryFilters: string[];
    availabilityFilters: string[];
}

const ProductGrid: FC<ProductGridProps> = ({ 
    backgroundColor, 
    sortOption,
    onSortChange,
    categoryFilters,
    availabilityFilters
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const productsPerPage = 16;

    const filteredAndSortedProducts = useMemo(() => {
        // start w/ all products
        let filtered = [...productsData];
        
        // apply category filter if any
        if (categoryFilters.length > 0) {
            filtered = filtered.filter(product => 
                product.category && categoryFilters.includes(product.category)
            );
        }
        
        // apply availability filter if any
        if (availabilityFilters.includes("In Stock")) {
            // filter to show products that are in stock
            filtered = filtered.filter(product => {
                // if product has style variants, check if any variant is in stock
                if (product.styles && product.styles.length > 0) {
                    return product.styles.some(style => 
                        isVariantInStock(product.id || '', style)
                    );
                } 
                // if product has no styles, consider the product itself as in stock
                return isVariantInStock(product.id || '', 'default');
            });
        } else if (availabilityFilters.includes("Out of Stock")) {
            // filter to show products that are out of stock
            filtered = filtered.filter(product => {
                // if product has style variants, check if all variants are out of stock
                if (product.styles && product.styles.length > 0) {
                    return product.styles.every(style => 
                        !isVariantInStock(product.id || '', style)
                    );
                }
                // if product has no styles, consider the product itself as out of stock
                return !isVariantInStock(product.id || '', 'default');
            });
        }
        
        // apply sorting
        switch (sortOption) {
            case 'Alphabetical':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case 'PriceLowHigh':
                return filtered.sort((a, b) => a.price - b.price);
            case 'PriceHighLow':
                return filtered.sort((a, b) => b.price - a.price);
            default:
                return filtered; // bstselling (default order)
        }
    }, [sortOption, categoryFilters, availabilityFilters]);

    const displayedProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // dynamically calculate total pages based on filtered products
    const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / productsPerPage));

    return (
        <section className="w-full flex flex-col" style={{ backgroundColor }}>
            {/* sorting options - hidden on mobile */}
            <div className="hidden md:flex justify-between items-center px-4 sm:px-6 md:px-8 py-3">
                <span className="text-sm text-dark_pink_secondary">
                    {filteredAndSortedProducts.length} Products
                </span>

                <div className="flex items-center gap-6">
                    <span className="text-pink font-poppins text-sm">Sort by:</span>
                    <select
                        className="border border-pink rounded-md px-3 py-2 text-sm bg-transparent text-dark_pink_secondary"
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value as typeof sortOption)}
                    >
                        <option value="Bestselling">Bestselling</option>
                        <option value="Alphabetical">Alphabetical, A-Z</option>
                        <option value="PriceLowHigh">Price, Low to High</option>
                        <option value="PriceHighLow">Price, High to Low</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {displayedProducts.map((product: Product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard
                                id={product.id}
                                image={product.thumbnail}
                                thumbnail2={product.thumbnail2}
                                name={product.name}
                                price={product.price}
                                buttonStyle="px-4 py-2 bg-transparent border border-pink text-dark_pink_secondary hover:bg-pink hover:text-white"
                                priceStyle="text-dark_pink_secondary font-urbanist font-regular"
                                nameStyle="text-sm md:text-md text-dark_pink font-bold font-urbanist"
                                nameHoverStyle="hover:underline decoration-dark_pink"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {filteredAndSortedProducts.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav className="flex justify-center items-center gap-2">
                        {/* prev page button */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className="w-8 h-8 flex items-center justify-center"
                            disabled={currentPage === 1}
                        >
                            <FiChevronLeft 
                                className={`${
                                    currentPage === 1 
                                    ? 'text-peach cursor-not-allowed' 
                                    : 'text-button_pink hover:text-peach hover:scale-125 transition-all duration-200'
                                } w-5 h-5`} 
                            />
                        </button>

                        {/* Page nums - using dynamic totalPages */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    text-dark_pink transition-all duration-300
                                    ${currentPage === page
                                        ? 'font-medium text-peach underline decoration-2 underline-offset-4 decoration-peach' 
                                        : 'hover:underline hover:decoration-button_pink hover:decoration-2 hover:underline-offset-4'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next page button */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className="w-8 h-8 flex items-center justify-center"
                            disabled={currentPage === totalPages}
                        >
                            <FiChevronRight 
                                className={`${
                                    currentPage === totalPages 
                                    ? 'text-peach cursor-not-allowed' 
                                    : 'text-button_pink hover:text-peach hover:scale-125 transition-all duration-200'
                                } w-5 h-5`} 
                            />
                        </button>
                    </nav>
                </div>
            )}

            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-dark_pink">No products match your current filters.</p>
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
export type { ProductGridProps };