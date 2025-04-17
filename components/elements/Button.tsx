import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface IButtonProps {
  variant?: 'default' | 'outline' | 'unstyled';
  size?: 'full' | 'large' | 'regular' | 'small' | 'xsmall';
  IconComponents?: () => React.JSX.Element;
  loading?: boolean;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  IButtonProps;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    type = 'button',
    className,
    children,
    variant = 'default',
    size = 'regular',
    loading = false,
    IconComponents,
    ...rest
  } = props;

  const sizeVariant = {
    full: 'btn btn-wide',
    large: 'btn btn-lg',
    regular: 'btn',
    small: 'btn btn-sm',
    xsmall: 'btn btn-xs',
  };

  const variantOptions = {
    default: clsx(
      `flex flex-row items-center justify-center gap-2 bg-[#1366D9] text-white`,
      sizeVariant[size],
      className
    ),
    outline: clsx(
      `flex flex-row items-center justify-center gap-2 border border-neutral bg-white text-black hover:bg-[#1366D9] hover:text-white`,
      sizeVariant[size],
      className
    ),
    unstyled: clsx(className),
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`${variantOptions[variant]}`}
      {...rest}
    >
      {IconComponents && <IconComponents />}

      {loading && <span className="loading loading-spinner"></span>}

      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
