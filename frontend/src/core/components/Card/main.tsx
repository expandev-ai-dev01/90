import { getCardClassName } from './variants';
import type { CardProps } from './types';

/**
 * @component Card
 * @summary Container card component for grouping related content
 * @domain core
 * @type ui-component
 * @category display
 */
export const Card = (props: CardProps) => {
  const { children, variant = 'elevated', className, ...rest } = props;

  return (
    <div className={getCardClassName({ variant, className, children })} {...rest}>
      {children}
    </div>
  );
};
