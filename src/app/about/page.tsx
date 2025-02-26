import { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mo from '../assets/images/mo.png';
import { motion } from 'framer-motion';

const AboutPage: FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow bg-white py-8 md:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                        <div className="flex justify-center md:justify-start">
                            <motion.img 
                                src={mo} 
                                alt="Mo" 
                                className="w-3/4 md:w-full max-w-md rounded-lg object-cover"
                                whileHover={{ 
                                    scale: 1.05,
                                    rotate: [0, -5, 5, -5, 0],
                                    transition: {
                                        rotate: {
                                            duration: 0.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }
                                    }
                                }}
                                whileTap={{ 
                                    scale: [1, 0.9, 1.1, 0.95, 1],
                                    transition: { 
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-viucobacoba text-blue mb-6 md:mb-8">
                                Hello, I'm Fifi ✿
                            </h1>

                            <div className="space-y-4 text-dark_pink font-poppins font-normal text-sm md:text-base lg:text-lg mt-2 pt-4 md:pt-6">
                                <p>
                                Hi! I'm Fifi and I'm a digital/traditional anime artist (or hobbyist) based in Toronto, Canada. Everyday I'm focused on bringing my bright and colourful creations to you! I like making bright and colourful accessories mainly, but play around with making cute stickers and prints as well!

                                </p>

                                <div className="pt-4">
                                    <h2 className="font-poppins font-medium text-dark_pink mb-2">
                                        Find me elsewhere:
                                    </h2>
                                    <div className="flex flex-col space-y-1">
                                        <a 
                                            href="https://www.instagram.com/fifeefofum" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-poppins font-medium text-accent_green transition-all duration-300 hover:translate-x-1"
                                        >
                                            <span className="text-dark_pink">Instagram (Art): </span>
                                            <span className="hover:underline">@fifeefofum</span>
                                        </a>
                                        <a 
                                            href="https://www.tiktok.com/@fifeefofum" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-poppins font-medium text-accent_green transition-all duration-300 hover:translate-x-1"
                                        >
                                            <span className="text-dark_pink">Instagram (Store): </span>
                                            <span className="hover:underline">@fifeefofum</span>
                                        </a>
                                        <a 
                                            href="https://www.etsy.com/shop/fifeefofum" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-poppins font-medium text-accent_green transition-all duration-300 hover:translate-x-1"
                                        >
                                            <span className="text-dark_pink">Etsy: </span>
                                            <span className="hover:underline">@fifeefofum</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;