import { FC } from 'react';
import { motion } from 'framer-motion';
import products from '../data/products';
import ProductCard from './ProductCard';
import gridPattern from '../assets/images/grid-pattern.svg';
import sparklesLeft from '../assets/images/sparkles-l.svg';
import sparklesRight from '../assets/images/sparkles-r.svg';
import { Product } from '../types/product';

const FeaturedItems: FC = () => {
    const displayedProducts: Product[] = products.slice(0, 4);

    // Product Card styles
    const buttonStyle = "mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 bg-button_pink text-white font-poppins font-normal";
    const priceStyle = "text-dark_green font-urbanist";
    const nameStyle = "font-urbanist text-dark_green";

    // Hover styles
    const buttonHoverStyle = "hover:bg-white hover:text-button_pink";
    const priceHoverStyle = "hover:text-peach";
    const nameHoverStyle = "hover:underline decoration-dark_green";

    return (
        <div className="relative w-full bg-[#DCEDC1]">
            {/* Grid Overlay */}
            <div
                style={{ backgroundImage: `url(${gridPattern})` }}
                className="absolute inset-0 w-full h-full bg-repeat opacity-50 pointer-events-none bg-cover"
            ></div>

            {/* Content Container */}
            <section className="relative w-full pt-6 pb-3 sm:pt-8 sm:pb-4 md:pt-10 md:pb-6 lg:pt-12 lg:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                {/* Section Header */}
                <div className="relative flex items-center justify-center gap-4 mb-3 sm:mb-4 md:mb-6">
                    {/* Left Sparkles */}
                    <img 
                        src={sparklesLeft} 
                        alt="Left Sparkles"
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    />

                    <h2 className="text-dark_green text-xl sm:text-2xl md:text-3xl font-chewie font-semibold text-center">
                        featured item header goes here!
                    </h2>

                    {/* Right Sparkles */}
                    <img 
                        src={sparklesRight} 
                        alt="Right Sparkles"
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    />
                </div>

                {/* Product Grid */}
                <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-6xl mx-auto">
                    {displayedProducts.map((product: Product) => (
                        <motion.div 
                            key={product.id}
                            className="w-[90%] mx-auto"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={product.thumbnail}
                                thumbnail2={product.thumbnail2}
                                name={product.name}
                                price={product.price}
                                buttonStyle={buttonStyle}
                                priceStyle={priceStyle}
                                nameStyle={nameStyle}
                                buttonHoverStyle={buttonHoverStyle}
                                priceHoverStyle={priceHoverStyle}
                                nameHoverStyle={nameHoverStyle}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FeaturedItems;