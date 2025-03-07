import axios from 'axios';

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_EXPIRY_KEY = 'exchange_rates_expiry';

export const fetchExchangeRates = async (baseCurrency: string = 'CAD'): Promise<Record<string, number>> => {
    if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
        if (cachedData && cacheExpiry) {
            const parsedCache = JSON.parse(cachedData);
            const expiryTime = parseInt(cacheExpiry, 10);
      
            if (Date.now() < expiryTime && parsedCache.baseCurrency === baseCurrency) {
                return parsedCache.rates;
            }
        }
    }
  
    try {
        const response = await axios.get(`/api/exchange-rates?base=${baseCurrency}`);
        const rates = response.data.conversion_rates || response.data.rates;
    
        if (typeof window !== 'undefined') {
            const cacheData = {
                baseCurrency,
                rates,
                timestamp: Date.now(),
            };
      
            const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString());
        }
    
        return rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    
        if (typeof window !== 'undefined' && localStorage.getItem(CACHE_KEY)) {
            return JSON.parse(localStorage.getItem(CACHE_KEY)!).rates;
        }
    
        return {};
    }
};