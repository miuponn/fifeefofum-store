'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import currenciesData from '@/data/currencies.json';

type CurrencyCode = keyof typeof currenciesData;

interface CurrencySelectorProps {
    expandUp?: boolean;
}

const INITIAL_CURRENCY = "CAD" as CurrencyCode;

const CurrencySelector = ({ expandUp = false }: CurrencySelectorProps) => {
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(INITIAL_CURRENCY);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (): void => setIsOpen(!isOpen);

    const handleSelect = (currencyCode: CurrencyCode): void => {
        setSelectedCurrency(currencyCode);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentCurrency = currenciesData[selectedCurrency];

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                type="button"
                className="px-4 py-2 bg-white flex items-center justify-between w-28
                    text-dark_pink font-medium transition-all duration-300 ease-in-out
                    hover:scale-105 hover:underline hover:text-dark_pink font-poppins"
            >
                <span className="sr-only">Selected currency: {selectedCurrency}</span>
                <span>{selectedCurrency} {currentCurrency?.symbol_native}</span>
                {isOpen ? (
                    <FiChevronUp className="ml-2 text-button_pink transition-transform duration-300 ease-in-out" />
                ) : (
                    <FiChevronDown className="ml-2 text-button_pink transition-transform duration-300 ease-in-out" />
                )}
            </button>

            {isOpen && (
                <div 
                    className={`absolute ${expandUp ? 'bottom-full mb-2' : 'top-full mt-2'} 
                        left-0 w-48 bg-white border border-pink rounded-md max-h-60 overflow-auto 
                        shadow-lg z-50`}
                    tabIndex={-1}
                >
                    {Object.entries(currenciesData).map(([code, data]) => (
                        <button
                            key={code}
                            onClick={() => handleSelect(code as CurrencyCode)}
                            className="w-full text-left px-4 py-2 hover:bg-accent_pink/10 
                                hover:text-dark_pink flex justify-between items-center 
                                text-dark_pink font-normal font-poppins transition-colors 
                                duration-200"
                        >
                            <span>{code} {data.symbol_native} | {data.name_plural}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelector;