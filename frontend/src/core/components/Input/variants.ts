import { clsx } from 'clsx';

/**
 * @variants InputVariants
 * @summary Style variants for Input component
 * @domain core
 * @category ui-components
 */
export function getInputClassName(hasError: boolean, fullWidth: boolean): string {
  return clsx(
    'px-3 py-2 rounded-md border transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'border-red-500 focus:ring-red-500': hasError,
      'border-secondary-300 focus:ring-primary-500': !hasError,
      'w-full': fullWidth,
    }
  );
}

export function getLabelClassName(hasError: boolean): string {
  return clsx('block text-sm font-medium mb-1', {
    'text-red-600': hasError,
    'text-secondary-700': !hasError,
  });
}

export function getHelperTextClassName(hasError: boolean): string {
  return clsx('mt-1 text-sm', {
    'text-red-600': hasError,
    'text-secondary-500': !hasError,
  });
}
