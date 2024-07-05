
import { toMoneyValue } from "../lib/toMoneyValue";

export function MoneyValue({
  value,
  fromCurrency,
  toCurrency,
  decimals,
}: {
  value: number;
  fromCurrency: string;
  toCurrency: string;
  decimals?: number;
}) {
  return <span>{toMoneyValue(value, fromCurrency, toCurrency, decimals)}</span>;
}
