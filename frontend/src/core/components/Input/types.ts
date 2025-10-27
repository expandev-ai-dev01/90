import { InputHTMLAttributes } from 'react';

/**
 * @types InputTypes
 * @summary Type definitions for Input component
 * @domain core
 * @category ui-components
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}
