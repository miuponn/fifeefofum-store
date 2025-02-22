import {FC, useState, ChangeEvent } from 'react';

interface OrderMessageProps {
    className?: string;
}

const OrderMessage: FC<OrderMessageProps> = ({ className = '' }) => {
    const [isGiftWrap, setIsGiftWrap] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessage(e.target.value);
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Gift Wrap Option */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="gift-wrap"
                        checked={isGiftWrap}
                        onChange={(e) => setIsGiftWrap(e.target.checked)}
                        className="w-4 h-4 accent-dark_pink cursor-pointer"
                    />
                    <label 
                        htmlFor="gift-wrap"
                        className="font-poppins font-regular text-dark_pink text-sm cursor-pointer"
                    >
                        Is this a gift?
                    </label>
                </div>
                <span className="font-poppins font-regular text-dark_pink_secondary text-xs">
                    For $10.00, wrap this order (add gift message below)
                </span>
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