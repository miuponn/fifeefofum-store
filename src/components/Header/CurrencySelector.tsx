import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import currenciesData from "../../data/currencies.json";

interface CurrencySelectorProps {
    expandUp?: boolean;
}

interface CurrencyData {
    symbol_native: string;
    name_plural: string;
}

interface CurrenciesDataType {
    [key: string]: CurrencyData;
}

const INITIAL_CURRENCY = "CAD";

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ expandUp = false }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>(INITIAL_CURRENCY);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (): void => setIsOpen(!isOpen);

    const handleSelect = (currencyCode: string): void => {
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

    const typedCurrencies = currenciesData as CurrenciesDataType;
    const currentCurrency = typedCurrencies[selectedCurrency];

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="px-4 py-2 bg-white flex items-center justify-between w-28
                text-dark_pink font-medium transition-all duration-300 ease-in-out
                hover:scale-105 hover:underline hover:text-dark_pink font-poppins"
            >
                {selectedCurrency} {currentCurrency?.symbol_native}
                {isOpen ? (
                    <FiChevronUp className="ml-2 text-button_pink transition-transform duration-300 ease-in-out" />
                ) : (
                    <FiChevronDown className="ml-2 text-button_pink transition-transform duration-300 ease-in-out" />
                )}
            </button>

            {isOpen && (
                <div 
                    className={`absolute ${expandUp ? 'bottom-full mb-2' : 'top-full mt-2'} 
                    left-0 w-48 bg-white border border-pink rounded-md max-h-60 overflow-auto shadow-lg`}
                    role="listbox"
                    aria-label="Currency selector"
                >
                    {Object.entries(typedCurrencies).map(([code, data]) => (
                        <button
                            key={code}
                            onClick={() => handleSelect(code)}
                            className="w-full text-left px-4 py-2 hover:text-dark_pink flex justify-between items-center text-dark_pink 
                                font-normal font-poppins"
                            role="option"
                            aria-selected={code === selectedCurrency}
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