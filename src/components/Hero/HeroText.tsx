'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const HeroText: FC = () => {
    const fullText = "a signature catchphrase goes here.";
    const [displayText, setDisplayText] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [isTextComplete, setIsTextComplete] = useState<boolean>(false);

    useEffect(() => {
        if (index < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + fullText[index]);
                setIndex(index + 1);
            }, 80); // Typing speed
            return () => clearTimeout(timer);
        } else {
            setIsTextComplete(true);
        }
    }, [index]);

    const twinkleAnimation = {
        scale: [1, 1.2, 1],
        opacity: [0.3, 1, 0.3],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <div className="relative flex flex-col items-center justify-center text-center text-white w-full h-full">
            <div className="relative w-full pb-10 md:pb-12 lg:pb-16">
                {/* Twinkling Stars */}
                <motion.span
                    className="absolute top-[-5%] left-[-5%] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 
                        text-white drop-shadow-custom select-none pointer-events-none"
                    animate={twinkleAnimation}
                >
                    ✦
                </motion.span>
                <motion.span
                    className="absolute bottom-[-1%] right-[-1%] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 
                        text-white drop-shadow-custom select-none pointer-events-none"
                    animate={twinkleAnimation}
                >
                    ✦
                </motion.span>

                {/* Typing Text */}
                <motion.p
                    className="text-2xl md:text-4xl lg:text-5xl font-chewie drop-shadow-custom leading-snug w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    role="heading"
                >
                    {displayText}
                    <span 
                        className="inline-block w-1 h-8 bg-white animate-pulse ml-1"
                    />
                </motion.p>
            </div>

            {/* SHOP ALL Button */}
            <div className="h-12">
                <AnimatePresence>
                    {isTextComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Link 
                                href="/products"
                                className="inline-block px-10 py-3 bg-white text-lg font-poppins font-semibold 
                                    rounded-2xl shadow-md transition-all duration-300 text-[#FFB6B7] 
                                    hover:bg-[#FFB6B7] hover:text-white focus:outline-none focus:ring-2 
                                    focus:ring-[#FFB6B7] focus:ring-offset-2"
                            >
                                SHOP ALL
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HeroText;