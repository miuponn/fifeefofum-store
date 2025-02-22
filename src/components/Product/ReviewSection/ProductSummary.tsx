import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProductSummaryProps {
    image: string;
    name: string;
    price: string;
    containerStyle?: string;
    nameStyle?: string;
    priceStyle?: string;
    hoverStyle?: {
        scale?: number;
        boxShadow?: string;
    };
}

const ProductSummary: FC<ProductSummaryProps> = ({ 
    image, 
    name, 
    price, 
    containerStyle = "", 
    nameStyle = "", 
    priceStyle = "",
    hoverStyle = {} 
}) => {
    return (
        <motion.div 
            className={`flex items-center gap-4 p-2 transition-all duration-300 ${containerStyle}`}
            whileHover={hoverStyle}
        >
            <div className="w-16 h-16 flex-shrink-0">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            <div className="flex flex-col">
                <h4 className={nameStyle}>{name}</h4>
                <p className={priceStyle}>{price}</p>
            </div>
        </motion.div>
    );
};

export default ProductSummary;