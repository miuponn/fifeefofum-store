import { FC } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import { Product } from '../../types/product';

interface RecommendedProductsProps {
    products: Product[];
    currentProductId: string;
}

const RecommendedProducts: FC<RecommendedProductsProps> = ({ products, currentProductId }) => {
    // Filter out current product and get random 4 products
    const filteredProducts = products
        .filter(product => product.id !== currentProductId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    if (filteredProducts.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-chewie text-dark_pink text-center mb-8 md:mb-12"
            >
                You May Also Like
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.thumbnail}
                        thumbnail2={product.thumbnail2}
                        name={product.name}
                        price={product.price}
                        buttonStyle="px-4 py-2 bg-transparent border border-pink text-dark_pink_secondary hover:bg-pink hover:text-white"
                        priceStyle="text-dark_pink_secondary font-urbanist"
                        nameStyle="text-sm md:text-md text-dark_pink font-bold font-urbanist"
                        nameHoverStyle="hover:underline decoration-dark_pink"
                    />
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;