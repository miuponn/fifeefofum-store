'use client';

import { FC } from 'react';
import Link from 'next/link';

interface EmptyCartProps {
    buttonStyle?: string;
}

const EmptyCart: FC<EmptyCartProps> = ({ buttonStyle }) => {
    const defaultStyle = `px-6 py-3 bg-dark_pink text-white font-poppins font-semibold text-sm
        hover:bg-transparent hover:text-dark_pink hover:border hover:border-dark_pink 
        transition-all duration-300 rounded-md`;

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <p className="font-poppins text-dark_pink text-sm text-center">
                Your cart is empty.
            </p>
            <Link 
                href="/products"
                className={buttonStyle || defaultStyle}
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;