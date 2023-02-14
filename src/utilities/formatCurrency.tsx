
const CURRENCY_FORMATER = new Intl.NumberFormat('de-DE', {currency: 'EUR', style: 'currency'})

export function formatCurrency(n: number){
  return CURRENCY_FORMATER.format(n)
}