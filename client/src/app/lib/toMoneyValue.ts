import { convertCurrency, Currency } from "./currencyConvert";

interface tomoneyValueProps {
  value: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  decimals?: number | 1;
}

export function toMoneyValue({ value, fromCurrency, toCurrency, decimals }: tomoneyValueProps): string {
  toCurrency = toCurrency || "USD";
  const convertedValue = convertCurrency(value, fromCurrency, toCurrency);
  return new Intl.NumberFormat('en-GB', {
    currency: toCurrency,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(convertedValue);
}
