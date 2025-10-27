import { getInputClassName, getLabelClassName, getHelperTextClassName } from './variants';
import type { InputProps } from './types';

/**
 * @component Input
 * @summary Reusable input component with label, error, and helper text support
 * @domain core
 * @type ui-component
 * @category form
 */
export const Input = (props: InputProps) => {
  const { label, error, helperText, fullWidth = false, className, id, ...rest } = props;

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className={getLabelClassName(hasError)}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={getInputClassName(hasError, fullWidth)}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className={getHelperTextClassName(true)} role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className={getHelperTextClassName(false)}>
          {helperText}
        </p>
      )}
    </div>
  );
};
