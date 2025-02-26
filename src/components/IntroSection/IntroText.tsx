'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonStyles {
    hover: {
        backgroundColor: string;
        color: string;
        border: string;
    }
}

const buttonStyles: ButtonStyles = {
    hover: {
        backgroundColor: "#FFFFFF",
        color: "#FF91A1",
        border: "1px solid #FF91A1",
    }
};

const IntroText: FC = () => {
    return (
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
            {/* Title */}
            <h2 className="text-dark_pink text-xl md:text-2xl lg:text-3xl font-chewie font-extrabold">
                Welcome to Fifeefofum!
            </h2>

            {/* Paragraph */}   
            <p className="text-dark_pink text-xs md:text-sm lg:text-base font-poppins font-light mt-4 md:mt-10 leading-relaxed max-w-prose">
                Step into a world of whimsy with sparkly trinkets, anime art, and cute animal stationary! Each piece is made with love and nostalgia just for you. 💫 
                <br /><br />
                The collection is always evolving, so be sure to check back for new surprises! Want to stay in the loop? Join the adventure and follow along for my latest updates and releases.
                <br /><br />
                Thank you for visiting my shop!
            </p>

            {/* SHOP NOW Button */}
            <Link href="/products" passHref>
                <motion.a
                    className="mt-6 md:mt-8 px-6 py-2.5 bg-peach text-white text-sm md:text-base 
                             font-poppins font-semibold rounded-md transition-all duration-300 
                             hover:scale-105"
                    whileHover={buttonStyles.hover}
                    whileTap={{ scale: 0.95 }}
                >
                    SHOP NOW
                </motion.a>
            </Link>
        </div>
    );
};

export default IntroText;