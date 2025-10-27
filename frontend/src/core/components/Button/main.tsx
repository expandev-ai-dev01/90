import { getButtonClassName } from './variants';
import { LoadingSpinner } from '../LoadingSpinner';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants and loading states
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    className,
    ...rest
  } = props;

  return (
    <button
      className={getButtonClassName({ variant, size, fullWidth, isLoading, children, className })}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner size="small" className="mr-2" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
