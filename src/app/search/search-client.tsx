'use client';

import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products';
import { Product } from '@/types/product';

interface SearchPageClientProps {
  initialQuery?: string;
}

const SearchPageClient: FC<SearchPageClientProps> = ({ initialQuery = '' }) => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || initialQuery;
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const buttonStyle = "mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 border border-dark_pink text-dark_pink font-poppins text-xs sm:text-sm md:text-lg font-normal hover:text-white hover:border-pink";
    const priceStyle = "text-xs sm:text-sm md:text-md text-dark_pink font-urbanist font-semibold";
    const nameStyle = "text-sm sm:text-base md:text-lg font-urbanist text-dark_pink font-bold";
    const nameHoverStyle = "hover:underline decoration-button_pink";

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = productsData.filter(product => {
                // search in name
                if (product.name.toLowerCase().includes(query)) return true;
                
                // search in category
                if (product.category?.toLowerCase().includes(query)) return true;
                
                // search in description if available
                if (product.description?.toLowerCase().includes(query)) return true;
                
                // search in styles/variants
                if (product.styles?.some(style => style.toLowerCase().includes(query))) return true;
                
                return false;
            });
            setSearchResults(results);
        }
    }, [searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF7F7]">
            <Header />
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-chewie font-semibold text-center text-dark_pink mt-6">
                    {searchResults.length > 0 
                        ? `Search results for "${searchQuery}"`
                        : `No results found for "${searchQuery}"`
                    }
                </h1>
                
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {searchResults.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard
                                    id={product.id || ''}
                                    name={product.name}
                                    price={product.price}
                                    image={product.thumbnail}
                                    fromPath="/search"
                                    buttonStyle={buttonStyle}
                                    priceStyle={priceStyle}
                                    nameStyle={nameStyle}
                                    nameHoverStyle={nameHoverStyle}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center my-12">
                        <p className="text-dark_pink_secondary mb-4">
                            Try searching for a different term or check these popular products:
                        </p>
                        
                        {/* show some popular products as suggestions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                            {productsData.slice(0, 4).map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ProductCard
                                        id={product.id || ''}
                                        name={product.name}
                                        price={product.price}
                                        image={product.thumbnail}
                                        fromPath="/search"
                                        buttonStyle={buttonStyle}
                                        priceStyle={priceStyle}
                                        nameStyle={nameStyle}
                                        nameHoverStyle={nameHoverStyle}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default SearchPageClient;