import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for indicating loading states
 * @domain core
 * @type ui-component
 * @category feedback
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size = 'medium' } = props;

  return (
    <div className="flex items-center justify-center p-4">
      <div className={getLoadingSpinnerClassName(props)} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
