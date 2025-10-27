import { clsx } from 'clsx';
import type { ButtonProps } from './types';

/**
 * @variants ButtonVariants
 * @summary Style variants for Button component
 * @domain core
 * @category ui-components
 */
export function getButtonClassName(props: ButtonProps): string {
  const { variant = 'primary', size = 'md', fullWidth = false, isLoading = false } = props;

  return clsx(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    {
      'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500':
        variant === 'primary',
      'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus-visible:ring-secondary-500':
        variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500': variant === 'danger',
      'bg-transparent hover:bg-secondary-100 focus-visible:ring-secondary-500': variant === 'ghost',
    },
    {
      'h-8 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-base': size === 'md',
      'h-12 px-6 text-lg': size === 'lg',
    },
    {
      'w-full': fullWidth,
      'cursor-wait': isLoading,
    }
  );
}
