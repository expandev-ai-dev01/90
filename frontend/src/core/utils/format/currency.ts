/**
 * @utility formatCurrency
 * @summary Formats a number as Brazilian currency (BRL)
 * @domain core
 * @category formatting
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
