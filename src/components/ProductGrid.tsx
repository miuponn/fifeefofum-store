import { FC, useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products';
import { Product } from '../types/product';

interface ProductGridProps {
    backgroundColor?: string;
}

type SortOption = 'Bestselling' | 'Alphabetical' | 'PriceLowHigh' | 'PriceHighLow';

const ProductGrid: FC<ProductGridProps> = ({ backgroundColor = "white" }) => {
    const [sortOption, setSortOption] = useState<SortOption>("Bestselling");
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const productsPerPage = 16;
    const totalPages = Math.ceil(productsData.length / productsPerPage);

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSortOption(event.target.value as SortOption);
    };

    const displayedProducts = productsData.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <section className="w-full flex flex-col" style={{ backgroundColor }}>
            {/* Sorting Options - Hidden on mobile */}
            <div className="hidden md:flex justify-between items-center px-4 sm:px-6 md:px-8 py-3">
                <span className="text-sm text-dark_pink_secondary">
                    {productsData.length} Products
                </span>

                <div className="flex items-center gap-6">
                    <span className="text-pink font-poppins text-sm">Sort by:</span>
                    <select
                        className="border border-pink rounded-md px-3 py-2 text-sm bg-transparent text-dark_pink_secondary"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="Bestselling">Bestselling</option>
                        <option value="Alphabetical">Alphabetical, A-Z</option>
                        <option value="PriceLowHigh">Price, Low to High</option>
                        <option value="PriceHighLow">Price, High to Low</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8">
                {displayedProducts.map((product: Product) => (
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6 md:mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`font-poppins font-medium text-xs sm:text-sm md:text-base ${
                            currentPage === pageNum 
                            ? 'text-pink underline' 
                            : 'text-pink hover:underline'
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="font-poppins font-medium text-pink hover:underline flex items-center gap-1 text-xs sm:text-sm md:text-base"
                    >
                        Next <span className="text-pink">&gt;</span>
                    </button>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;