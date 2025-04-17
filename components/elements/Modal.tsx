import React, {
  useEffect,
  useRef,
  forwardRef,
  DetailedHTMLProps,
  DialogHTMLAttributes,
} from 'react';
import clsx from 'clsx';

interface IModalProps {
  isOpen: boolean | string | string[] | undefined;
  onClose: () => void;
  preventClose?: boolean;
}

type Ref = HTMLDialogElement;

export type DialogProps = DetailedHTMLProps<
  DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> &
  IModalProps;

const Modal = forwardRef<Ref, DialogProps>((props, refs) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const {
    isOpen,
    onClose,
    preventClose = false,
    children,
    className,
    ...rest
  } = props;

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="modal modal-middle phone:modal-bottom"
      {...rest}
    >
      <div className={clsx('modal-box', className)}>
        <form method="dialog">
          {!preventClose && (
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={() => {
                onClose();
              }}
            >
              ✕
            </button>
          )}
        </form>
        {isOpen && <React.Fragment>{children}</React.Fragment>}
      </div>

      <form method="dialog" className="modal-backdrop">
        {!preventClose && (
          <button
            type="button"
            aria-label="btn"
            onClick={() => {
              onClose();
            }}
          />
        )}
      </form>
    </dialog>
  );
});

Modal.displayName = 'Modal';
export default Modal;
