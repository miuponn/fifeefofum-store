'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchExchangeRates } from '@/services/exchangeRateService';
import currenciesData from '@/data/currencies.json';

type CurrencyCode = keyof typeof currenciesData;

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
    formatPrice: (amount: number) => string;
    convertPrice: (amount: number, fromCurrency?: CurrencyCode) => number;
    convertProductPrice: (amount: number) => number;
    isLoading: boolean;
    getCurrencyCode: () => string;
    getNativeSymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'CAD' as CurrencyCode,
    setCurrency: () => {},
    formatPrice: () => '',
    convertPrice: () => 0,
    isLoading: true,
    getCurrencyCode: () => '',
    getNativeSymbol: () => '',
    convertProductPrice: () => 0,
});

export const CurrencyProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [currency, setCurrency] = useState<CurrencyCode>('CAD');
    const [rates, setRates] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRates = async () => {
            setIsLoading(true);
            const fetchedRates = await fetchExchangeRates(currency);
            setRates(fetchedRates);
            setIsLoading(false);
        };
        
        loadRates();
    }, [currency]);

    const convertPrice = (amount: number, fromCurrency: CurrencyCode = 'CAD') => {
        if (!rates || Object.keys(rates).length === 0) return amount;
        
        const amountInBaseCurrency = fromCurrency === currency 
            ? amount 
            : amount / rates[fromCurrency];
        
        return Number((amountInBaseCurrency * rates[currency]).toFixed(
            currenciesData[currency]?.decimal_digits || 2
        ));
    };

    const formatPrice = (amount: number) => {
        if (isLoading) return `${amount}`;
    
        const convertedAmount = convertPrice(amount);
        const currencyInfo = currenciesData[currency];
    
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: currencyInfo?.decimal_digits || 2,
            maximumFractionDigits: currencyInfo?.decimal_digits || 2,
        }).format(convertedAmount);
    };

    const getCurrencyCode = () => currency;
    const getNativeSymbol = () => currenciesData[currency].symbol_native;
    const convertProductPrice = (amount: number) => convertPrice(amount);

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            formatPrice,
            convertPrice,
            isLoading,
            getCurrencyCode,
            getNativeSymbol,
            convertProductPrice,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);