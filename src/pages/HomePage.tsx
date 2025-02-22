import { FC } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedItems from "../components/FeaturedItems";
import IntroSection from "../components/IntroSection";
import Footer from "../components/Footer";
import products from '../data/products'; 

const HomePage: FC = () => {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <Hero />
        <section className="w-full flex justify-center">
          <div className="w-full">
            <FeaturedItems products={products} />
          </div>
        </section>
        <section className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-12 lg:px-20">
            <IntroSection />
          </div>
        </section>
        <Footer />
      </div>
    );
};

export default HomePage;