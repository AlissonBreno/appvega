import { useEffect, type ReactNode } from 'react';
import styles from './styles.module.css';

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  label: string;
};

const Dialog = ({ children, onClose, label }: DialogProps) => {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={styles.panel}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
