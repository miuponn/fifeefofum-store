import { FC, useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDescriptionProps {
    description: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement | null>(null);
    const lineHeight = 1.5; // rem
    const maxLines = 7;

    useEffect(() => {
        if (textRef.current) {
            const height = textRef.current.scrollHeight;
            const maxHeight = lineHeight * maxLines * 16; // convert rem to px
            setShowButton(height > maxHeight);
        }
    }, [description]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="relative"> 
                <div
                    ref={textRef}
                    className={`whitespace-pre-line font-poppins font-medium text-button_pink`}
                    style={{
                        lineHeight: `${lineHeight}rem`,
                        height: isExpanded ? 'auto' : '10.5rem',
                        overflow: 'hidden',
                        transition: 'height 0.3s ease-in-out'
                    }}
                >
                    {description}
                    <AnimatePresence>
                        {!isExpanded && showButton && (
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {showButton && (
                <motion.button
                    layout
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 mx-auto mt-4 text-dark_pink font-poppins"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>{isExpanded ? 'Less' : 'More'}</span>
                    <motion.div
                        initial={false}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FiChevronDown className="text-button_pink w-5 h-5" />
                    </motion.div>
                </motion.button>
            )}
        </div>
    );
};

export default ProductDescription;