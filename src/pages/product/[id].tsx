import { FC } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGallery from '../components/Product/ProductGallery';
import ProductSelection from '../components/Product/ProductSelection';
import ProductDescription from '../components/Product/ProductDescription';
import ProductReviews from '../components/Product/ProductReviews';
import RecommendedItems from '../components/Product/RecommendedItems';
import productsData from '../data/products';
import { Product } from '../types/product';

interface LocationState {
    from?: string;
}

const ProductDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation() as { state: LocationState | null };
    const product = productsData.find(p => p.id === id) as Product | undefined;
    const fromProducts = state?.from === '/products';

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
                {/* Mobile Breadcrumb */}
                <nav className="md:hidden text-sm font-poppins font-light text-dark_pink text-center pt-6 pb-2">
                    <Link to="/" className="hover:underline text-[#AF001A]">Home</Link>
                    <span className="text-[#AF001A] mx-3">&gt;</span>
                    {fromProducts && (
                        <>
                            <Link to="/products" className="hover:underline text-[#AF001A]">Products</Link>
                            <span className="text-[#AF001A] mx-3">&gt;</span>
                        </>
                    )}
                    <span className="text-dark_pink">{product.name}</span>
                </nav>

                {/* Product Details Container */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-12 w-[90%]">
                    {/* Desktop Layout: Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 lg:gap-20">
                        {/* Left Column: Gallery + Reviews */}
                        <div className="space-y-12">
                            <ProductGallery images={product.images || []} />
                            {/* Reviews only shows in this position on desktop */}
                            <div className="hidden md:block">
                                <ProductReviews productId={product.id} />
                            </div>
                        </div>

                        {/* Right Column: Selection + Description */}
                        <div className="space-y-12">
                            <ProductSelection 
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                variants={product.styles || []}
                                fromPath={state?.from || ''}
                                image={product.thumbnail}
                            />
                            {/* Description only shows in this position on desktop */}
                            <div className="hidden md:block">
                                <ProductDescription description={product.description || ''} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout: Stacked Sections */}
                    <div className="md:hidden space-y-12 mt-12">
                        <ProductDescription description={product.description || ''} />
                        <ProductReviews productId={product.id} />
                    </div>
                </div>

                {/* Recommended Products Section */}
                <section className="w-full py-12">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                    <RecommendedItems 
                        products={productsData}
                        currentProductId={product.id}/>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
