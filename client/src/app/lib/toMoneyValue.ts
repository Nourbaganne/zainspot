import { convertCurrency, Currency } from "./currencyConvert";

export function toMoneyValue(value: number, fromCurrency: Currency, toCurrency: Currency, decimals = 1): string {
  const convertedValue = convertCurrency(value, fromCurrency, toCurrency);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: toCurrency,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(convertedValue);
}
