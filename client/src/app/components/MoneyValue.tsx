
import { Currency } from '../lib/currencyConvert';
import { toMoneyValue } from '../lib/toMoneyValue';

import { CURRENCIES_DATA } from '../constants/navbar';

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

  function getCurrencySymbol(currencyKey: Currency): string | undefined {
    const currencyInfo = CURRENCIES_DATA.find(curr => curr.key === currencyKey);
    return currencyInfo ? currencyInfo.symbol : '';
  }
  const toCurrencySymbol = getCurrencySymbol(toCurrency);

  return (
    <span>
      {toCurrencySymbol}
      {toMoneyValue({value, fromCurrency, toCurrency, decimals})}
      
    </span>
  );
}
