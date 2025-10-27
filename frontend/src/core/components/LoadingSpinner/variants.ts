import { clsx } from 'clsx';
import type { LoadingSpinnerProps } from './types';

/**
 * @variants LoadingSpinnerVariants
 * @summary Style variants for LoadingSpinner component
 * @domain core
 * @category ui-components
 */
export function getLoadingSpinnerClassName(props: LoadingSpinnerProps): string {
  const { size = 'medium', className } = props;

  return clsx(
    'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
    {
      'h-4 w-4 border-2': size === 'small',
      'h-8 w-8 border-2': size === 'medium',
      'h-12 w-12 border-4': size === 'large',
    },
    className
  );
}
