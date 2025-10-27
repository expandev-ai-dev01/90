import { HTMLAttributes, ReactNode } from 'react';

/**
 * @types CardTypes
 * @summary Type definitions for Card component
 * @domain core
 * @category ui-components
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
}
