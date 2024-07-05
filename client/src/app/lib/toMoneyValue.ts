import { convertCurrency } from "./currencyConvert";

export function toMoneyValue(value: number, fromCurrency: string, toCurrency: string, decimals = 1) {
    const convertedValue = convertCurrency(value, fromCurrency, toCurrency);
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: toCurrency,
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    }).format(convertedValue);
}
