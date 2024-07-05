import { toMoneyValue } from "./lib";
export function MoneyValue({
  value,
  currency,
  decimals,
}: {
  value: number;
  currency: string;
  decimals?: number;
}) {
  return <span>{toMoneyValue(value, currency, decimals)}</span>;
}
