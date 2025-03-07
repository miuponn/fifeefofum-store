'use client';

import { FC } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/[id]/ProductGallery';
import ProductSelection from '@/components/[id]/ProductSelection';
import ProductDescription from '@/components/[id]/ProductDescription';
import ProductReviews from '@/components/[id]/ProductReviews';
import RecommendedItems from '@/components/[id]/RecommendedItems';
import productsData from '@/data/products';
import type { Product } from '@/types/product';
import Script from 'next/script';

interface LocationState {
    from?: string;
}

const ProductDetailsPage: FC = () => {
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id = params?.id as string;
    const product = productsData.find(p => p.id === id) as Product | undefined;
    
    // check if user came from products page
    const fromProducts = searchParams.get('from') === 'products' || 
                        pathname.startsWith('/products/');

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
                {/* Mobile Breadcrumb */}
                <nav className="md:hidden text-sm font-poppins font-light text-dark_pink text-center pt-6 pb-2" 
                     aria-label="Breadcrumb"
                >
                    <Link href="/" className="hover:underline text-[#AF001A]">
                        Home
                    </Link>
                    <span className="text-[#AF001A] mx-3" aria-hidden="true">&gt;</span>
                    {fromProducts && (
                        <>
                            <Link href="/products" className="hover:underline text-[#AF001A]">
                                Products
                            </Link>
                            <span className="text-[#AF001A] mx-3" aria-hidden="true">&gt;</span>
                        </>
                    )}
                    <span className="text-dark_pink" aria-current="page">{product.name}</span>
                </nav>

                {/* Product Details */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-12 w-[90%]">
                    {/* Desktop layout: two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 lg:gap-20">
                        {/* Left: gallery + reviews */}
                        <div className="space-y-12">
                            <ProductGallery images={product.images || []} />
                            {/* reviews only shows in this position on desktop */}
                            <div className="hidden md:block">
                                <ProductReviews productId={product.id} />
                            </div>
                        </div>

                        {/* Right: selection + description */}
                        <div className="space-y-12">
                            <ProductSelection 
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                variants={product.styles || []}
                                fromPath={'/products'}
                                image={product.thumbnail}
                            />
                            {/* description only shows in this position on desktop */}
                            <div className="hidden md:block">
                                <ProductDescription description={product.description || ''} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile layout: stacked sections */}
                    <div className="md:hidden space-y-12 mt-12">
                        <ProductDescription description={product.description || ''} />
                        <ProductReviews productId={product.id} />
                    </div>
                </div>

                {/* Recommended Products section */}
                <section className="w-full py-12">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                        <RecommendedItems 
                            products={productsData}
                            currentProductId={product.id}
                        />
                    </div>
                </section>
            </main>

            {product && (
                <Script
                    id={`product-schema-${product.id}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": product.name,
                            "description": product.description || `${product.name} by Fifeefofum`,
                            "image": product.images?.[0] || product.thumbnail,
                            "sku": product.id,
                            "brand": {
                                "@type": "Brand",
                                "name": "Fifeefofum"
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": `https://fifeefofum.com/products/${product.id}`,
                                "price": product.price.replace(/[^0-9.]/g, ''),
                                "priceCurrency": "CAD",
                                "availability": "https://schema.org/InStock",
                                "itemCondition": "https://schema.org/NewCondition"
                            }
                        })
                    }}
                />
            )}

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
