'use client';

import { FC } from 'react';
import Link from 'next/link';

interface EmptyCartProps {
    buttonStyle?: string;
}

const EmptyCart: FC<EmptyCartProps> = ({ buttonStyle }) => {
    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <p className="font-poppins text-dark_pink text-sm text-center">
                Your cart is empty.
            </p>
            <Link 
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 
                    bg-dark_pink text-white font-poppins font-semibold text-sm
                    border border-dark_pink rounded-md
                    hover:bg-white hover:text-dark_pink
                    transition-all duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;