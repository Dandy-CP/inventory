import React, { forwardRef, useState } from 'react';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import clsx from 'clsx';

interface IInputProps {
  variant?: 'default' | 'password' | 'textarea';
  label?: string;
  errorMessage?: string;
  IconComponents?: () => React.JSX.Element;
}

type Ref = HTMLInputElement & HTMLTextAreaElement;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
  IInputProps;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    type = 'text',
    className,
    variant = 'default',
    label,
    errorMessage,
    IconComponents,
    ...rest
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  };

  switch (variant) {
    case 'default':
      return (
        <div>
          {label && (
            <div className="label font-medium text-[#0A0A0A]">
              <span className="label-text">{label}</span>
            </div>
          )}

          <label
            htmlFor="input"
            className={clsx(
              `input input-bordered flex max-w-full items-center gap-2 ${
                errorMessage && 'input-error'
              }`,
              className
            )}
          >
            <input ref={ref} type={type} className="grow" {...rest} />

            {IconComponents && <IconComponents />}
          </label>

          {errorMessage && (
            <div className="label">
              <span className="label-text-alt font-medium text-red-400">
                {errorMessage}
              </span>
            </div>
          )}
        </div>
      );
    case 'password':
      return (
        <div>
          {label && (
            <div className="label font-medium text-[#0A0A0A]">
              <span className="label-text">{label}</span>
            </div>
          )}

          <label
            htmlFor="input"
            className={clsx(
              `input input-bordered flex max-w-full items-center gap-2 ${
                errorMessage && 'input-error'
              }`,
              className
            )}
          >
            <input
              ref={ref}
              type={isPasswordVisible ? 'text' : 'password'}
              className="grow"
              {...rest}
            />

            <button
              onClick={(event) => {
                togglePasswordVisibility(event);
              }}
            >
              {isPasswordVisible ? (
                <IconEye className="text-gray h-6 w-6" />
              ) : (
                <IconEyeClosed className="text-gray h-6 w-6" />
              )}
            </button>
          </label>

          {errorMessage && (
            <div className="label">
              <span className="label-text-alt font-medium text-red-400">
                {errorMessage}
              </span>
            </div>
          )}
        </div>
      );
    case 'textarea':
      return (
        <div>
          {label && (
            <div className="label font-medium text-[#0A0A0A]">
              <span className="label-text">{label}</span>
            </div>
          )}

          <textarea
            ref={ref}
            className={clsx(
              `textarea textarea-bordered ${errorMessage && 'textarea-error'}`,
              className
            )}
            {...rest}
          />

          {errorMessage && (
            <div className="label">
              <span className="label-text-alt font-medium text-red-400">
                {errorMessage}
              </span>
            </div>
          )}
        </div>
      );
  }
});

Input.displayName = 'Input';
export default Input;
