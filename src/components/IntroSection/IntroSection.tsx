'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import InstagramFeed from './InstagramFeed';
import IntroText from './IntroText';

const IntroSection: FC = () => {
    return (
        <section className="bg-white w-full py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    
                    <motion.div
                        className="relative w-full md:pl-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { 
                                opacity: 1, 
                                x: 0,
                                transition: { duration: 0.6 } 
                            }
                        }}
                    >
                        <InstagramFeed />
                    </motion.div>

                    <motion.div
                        className="relative w-full md:ml-8 lg:ml-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { 
                                opacity: 1, 
                                x: 0,
                                transition: { duration: 0.6 } 
                            }
                        }}
                    >
                        <IntroText />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default IntroSection;