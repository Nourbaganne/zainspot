export function toMoneyValue(value: number, currency: string, decimals = 1) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    }).format(value)
 }