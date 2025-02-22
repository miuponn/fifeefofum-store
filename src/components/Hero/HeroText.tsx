import { FC, useEffect, useState } from "react";
import { motion, AnimationProps } from "framer-motion";

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

    const twinkleAnimation: AnimationProps['animate'] = {
        scale: [1, 1.2, 1],
        opacity: [0.3, 1, 0.3],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <div className="relative flex flex-col items-center justify-center text-center text-white w-full h-full">
            {/* Typing text and twinkling stars Container */}
            <div className="relative w-full pb-10 md:pb-12 lg:pb-16">
                {/* Twinkling Stars */}
                <motion.span
                    className="absolute top-[-5%] left-[-5%] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] text-white drop-shadow-custom"
                    animate={twinkleAnimation}
                >
                    ✦
                </motion.span>
                <motion.span
                    className="absolute bottom-[-1%] right-[-1%] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] text-white drop-shadow-custom"
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
                >
                    {displayText}
                    <span className="inline-block w-1 h-8 bg-white animate-pulse ml-1"></span> {/* Blinking Cursor */}
                </motion.p>
            </div>

            {/* SHOP ALL Button */}
            <div className="h-12">
                {isTextComplete && (
                    <motion.a
                        href="/products"
                        className="px-10 py-3 bg-white text-lg font-poppins font-semibold rounded-2xl shadow-md transition-all duration-300 text-[#FFB6B7] hover:bg-[#FFB6B7] hover:text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        SHOP ALL
                    </motion.a>
                )}
            </div>
        </div>
    );
};

export default HeroText;