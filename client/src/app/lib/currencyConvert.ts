export type Currency = 'USD' | 'GBP' | 'EUR' | 'INR' | 'AED' | 'AUD' | 'BDT' | 'SGD';

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.78,
  EUR: 0.92,
  INR: 83.50,
  AED: 3.67,
  AUD: 1.48,
  BDT: 117.49,
  SGD: 1.34
};

export function convertCurrency(value: number, fromCurrency: Currency, toCurrency: Currency) {
  if (fromCurrency === toCurrency) return value;
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  return (value / fromRate) * toRate;
}
