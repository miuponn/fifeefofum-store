import { FC } from 'react';
import { motion } from 'framer-motion';
import IntroText from './IntroSection/IntroText';
import InstagramFeed from './IntroSection/InstagramFeed';

interface IntroSectionProps {
    className?: string;
}

const IntroSection: FC<IntroSectionProps> = ({ className = '' }) => {
    return (
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                <div className="space-y-8 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <IntroText />
                    </motion.div>
                </div>
                <div>
                    <InstagramFeed />
                </div>
            </div>
        </section>
    );
};

export default IntroSection;