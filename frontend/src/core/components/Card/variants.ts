import { clsx } from 'clsx';
import type { CardProps } from './types';

/**
 * @variants CardVariants
 * @summary Style variants for Card component
 * @domain core
 * @category ui-components
 */
export function getCardClassName(props: CardProps): string {
  const { variant = 'elevated', className } = props;

  return clsx(
    'rounded-lg p-6',
    {
      'bg-white shadow-md': variant === 'elevated',
      'bg-white border border-secondary-200': variant === 'outlined',
      'bg-secondary-50': variant === 'filled',
    },
    className
  );
}
