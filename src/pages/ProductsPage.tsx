import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import FilterButton from '../components/Mobile/FilterButton';
import FilterSidebar from '../components/Mobile/FilterSidebar';

const ProductsPage: FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF7F7]">
            <Header />
            
            <main className="flex-grow w-full max-w-7xl mx-auto">
                {/* Mobile Header */}
                <div className="md:hidden text-center py-6">
                    <h1 className="text-2xl font-chewie text-dark_pink font-extrabold mb-2">
                        Products
                    </h1>
                    <nav className="text-xs font-poppins font-light text-dark_pink pt-2">
                        <Link to="/" className="hover:underline text-[#AF001A]">Home</Link>
                        <span className="text-[#AF001A] mx-3">&gt;</span>
                        <span className="text-dark_pink">Products</span>
                    </nav>
                </div>

                {/* Mobile Filters Row */}
                <div className="md:hidden px-4 py-4 flex items-center justify-between">
                    <FilterButton openFilter={() => setIsFilterOpen(true)} />
                    <select
                        className="border border-pink bg-transparent rounded-md px-3 py-2 text-sm text-dark_pink_secondary"
                        defaultValue="Bestselling"
                    >
                        <option value="Bestselling">Bestselling</option>
                        <option value="Alphabetical">Alphabetical, A-Z</option>
                        <option value="PriceLowHigh">Price, Low to High</option>
                        <option value="PriceHighLow">Price, High to Low</option>
                    </select>
                </div>

                {/* Mobile Filter Sidebar */}
                <FilterSidebar 
                    isOpen={isFilterOpen} 
                    closeFilter={() => setIsFilterOpen(false)} 
                />

                {/* Desktop Layout */}
                <div className="flex flex-col md:flex-row gap-6 py-8">
                    <aside className="hidden md:block w-64 px-4 md:px-0">
                        <Sidebar backgroundColor="#FFF7F7" />
                    </aside>
                    <div className="flex-1">
                        <ProductGrid backgroundColor="#FFF7F7" />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;