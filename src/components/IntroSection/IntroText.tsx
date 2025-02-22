import { FC } from 'react';
import { motion } from 'framer-motion';

interface ButtonStyles {
    hover: {
        scale: number;
        boxShadow: string;
    };
}

const buttonStyles: ButtonStyles = {
    hover: {
        scale: 1.05,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    }
};

const IntroText: FC = () => {
    return (
        <div className="text-center md:text-left">
            <p className="text-dark_pink font-poppins text-sm md:text-base lg:text-lg leading-relaxed">
                Welcome to Fifeefofum! I'm Fifi, and I love creating kawaii accessories that bring joy and cuteness to your everyday life.
                <br /><br />
                The collection is always evolving, so be sure to check back for new surprises! Want to stay in the loop? Join the adventure and follow along for my latest updates and releases.
                <br /><br />
                Thank you for visiting my shop!
            </p>

            <motion.a
                href="/products"
                className="mt-6 md:mt-8 px-6 py-2.5 bg-peach text-white text-sm md:text-base font-poppins font-semibold rounded-md transition-all duration-300 hover:scale-105"
                whileHover={buttonStyles.hover}
                whileTap={{ scale: 0.95 }}
            >
                SHOP NOW
            </motion.a>
        </div>
    );
};

export default IntroText;