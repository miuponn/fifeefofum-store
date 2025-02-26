'use client';

import { FC, useState, ChangeEvent } from 'react';

interface OrderMessageProps {
    className?: string;
    onGiftWrapChange?: (isGift: boolean) => void;
    onMessageChange?: (message: string) => void;
}

const OrderMessage: FC<OrderMessageProps> = ({ 
    className = '',
    onGiftWrapChange,
    onMessageChange 
}) => {
    const [isGiftWrap, setIsGiftWrap] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleGiftWrapToggle = (): void => {
        const newValue = !isGiftWrap;
        setIsGiftWrap(newValue);
        onGiftWrapChange?.(newValue);
    };

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        onMessageChange?.(newMessage);
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Gift Wrap Option */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div 
                        className={`w-4 h-4 border border-button_pink rounded cursor-pointer 
                            flex items-center justify-center transition-colors duration-300
                            ${isGiftWrap ? 'bg-button_pink' : 'bg-transparent'}`}
                        onClick={handleGiftWrapToggle}
                        tabIndex={0}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleGiftWrapToggle();
                            }
                        }}
                    >
                        {isGiftWrap && (
                            <svg 
                                className="w-3 h-3 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M5 13l4 4L19 7" 
                                />
                            </svg>
                        )}
                    </div>
                    <span className="font-poppins font-regular text-dark_pink_secondary text-xs">
                        For $10.00, wrap this order (add gift message below)
                    </span>
                </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
                <label 
                    htmlFor="special-instructions" 
                    className="block font-poppins font-regular text-pink text-sm"
                >
                    Order special instructions
                </label>
                <textarea
                    id="special-instructions"
                    value={message}
                    onChange={handleMessageChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-dark_pink_secondary rounded-sm 
                        font-poppins text-dark_pink text-sm resize-none focus:outline-none 
                        focus:ring-1 focus:ring-dark_pink_secondary"
                />
            </div>
        </div>
    );
};

export default OrderMessage;