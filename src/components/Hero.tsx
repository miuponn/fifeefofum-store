import { FC } from 'react';
import { motion } from 'framer-motion';
import HeroText from './Hero/HeroText';
import ImageSlider from './Hero/ImageSlider';

interface HeroProps {
    images?: string[];
}

const Hero: FC<HeroProps> = ({ images = [] }) => {
    return (
        <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-[#DCEDC1] overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <ImageSlider images={images} />
            </div>

            <div className="relative flex items-center justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-1/2 pl-4 md:pl-8 lg:pl-12">
                    <motion.img
                        src="/images/hero-decoration.png"
                        alt="Decorative Element"
                        className="w-24 md:w-32 lg:w-40"
                        whileHover={{ y: -10 }}
                        whileTap={{ rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </div>

                <div className="flex flex-col items-center text-center lg:items-end lg:text-right w-1/2 pr-4 md:pr-8 lg:pr-12">
                    <HeroText />
                </div>
            </div>
        </section>
    );
};

export default Hero;