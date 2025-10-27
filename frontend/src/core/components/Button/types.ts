import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * @types ButtonTypes
 * @summary Type definitions for Button component
 * @domain core
 * @category ui-components
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}
