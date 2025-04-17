import React, { forwardRef } from 'react';
import clsx from 'clsx';

type Ref = HTMLDivElement;

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Card = forwardRef<Ref, DivProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        'border border-base-content/5 bg-base-100 rounded-box',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
