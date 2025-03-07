'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroText from './HeroText';
import ImageSlider from './ImageSlider';
import birdLogo from '@/assets/images/logo-bird.png';

interface HeroProps {
    images?: string[];
}

const Hero: FC<HeroProps> = ({ images = [] }) => {
    return (
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-10">
                <ImageSlider images={images} />
            </div>
            <div className="relative z-20 w-full h-full flex items-center justify-between px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-center h-full w-1/2 pr-2 md:pr-4 lg:pr-6">
                    <motion.div
                        className="relative w-[40%] md:w-[50%] lg:w-[60%] aspect-square" 
                        whileHover={{ y: -10 }}
                        whileTap={{ rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image
                            src={birdLogo}
                            alt="Fifeefofum Logo"
                            fill
                            priority
                            sizes="(max-width: 640px) 40vw, (max-width: 768px) 35vw, 30vw"
                            className="object-contain"
                            quality={90}
                        />
                    </motion.div>
                </div>
                
                <div className="flex flex-col items-center text-center lg:items-end lg:text-right w-1/2 pr-4 md:pr-8 lg:pr-12">
                    <HeroText />
                </div>
            </div>
        </section>
    );    
};

export default Hero;