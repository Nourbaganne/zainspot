
import { Currency } from '../lib/currencyConvert';
import { toMoneyValue } from '../lib/toMoneyValue';

export function MoneyValue({
  value,
  fromCurrency,
  toCurrency,
  decimals,
}: {
  value: number;
  fromCurrency: Currency;  
  toCurrency: Currency;    
  decimals?: number;
}) {
  return <span>{toMoneyValue(value, fromCurrency, toCurrency, decimals)}</span>;
}
