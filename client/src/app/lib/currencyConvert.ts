

const exchangeRates = {
    USD: 1,
    GBP: 0.78,
    EUR: 0.92 ,  
};

export function convertCurrency(value: number, fromCurrency: string, toCurrency: string) {
    if (fromCurrency === toCurrency) return value;
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    return (value / fromRate) * toRate;
}
