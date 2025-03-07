'use client';

import { FC, useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero/Hero";
import FeaturedItems from "@/components/FeaturedItems";
import IntroSection from "@/components/IntroSection/IntroSection";
import Footer from "@/components/Footer";
import products from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import Sidebar from '@/components/Sidebar';

const HomePage: FC = () => {
  const [sortOption, setSortOption] = useState<'Bestselling' | 'Alphabetical' | 'PriceLowHigh' | 'PriceHighLow'>('Bestselling');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      
      <main>
        {/* Hero section */}
        <Hero />

        {/* Featured Items section */}
        <section className="w-full flex justify-center" aria-labelledby="featured-items">
          <div className="w-full">
            <FeaturedItems />
          </div>
        </section>

        {/* IG + Intro section */}
        <section 
          className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-16" 
          aria-labelledby="intro-section"
        >
          <div className="container mx-auto px-4 md:px-12 lg:px-20">
            <IntroSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;