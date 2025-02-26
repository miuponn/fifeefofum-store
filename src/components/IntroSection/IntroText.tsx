'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const IntroText: FC = () => {
    return (
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-dark_pink text-xl md:text-2xl lg:text-3xl font-chewie font-extrabold">
                Welcome to Fifeefofum!
            </h2>
   
            <p className="text-dark_pink text-xs md:text-sm lg:text-base font-poppins font-regular mt-4 md:mt-10 leading-relaxed max-w-prose">
                Step into a world of whimsy with sparkly trinkets, anime art, and cute animal stationary! Each piece is made with love and nostalgia just for you. 💫 
                <br /><br />
                The collection is always evolving, so be sure to check back for new surprises! Want to stay in the loop? Join the adventure and follow along for my latest updates and releases.
                <br /><br />
                Thank you for visiting my shop!
            </p>

            <motion.div
                className="mt-6 md:mt-8"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <Link 
                    href="/products" 
                    className="px-6 py-2.5 bg-peach text-white text-sm md:text-base 
                             font-poppins font-semibold rounded-md
                             hover:bg-transparent hover:text-[#FF91A1] hover:border-[#FF91A1]
                             border border-transparent transition-all duration-300"
                >
                    SHOP NOW
                </Link>
            </motion.div>
        </div>
    );
};

export default IntroText;