import Icon, { type IconName } from '../Icon';

import styles from './styles.module.css';

export type ToastVariant = 'success' | 'danger' | 'warning';

const ICONS: Record<ToastVariant, IconName> = {
  success: 'check',
  danger: 'exclamation-circle',
  warning: 'exclamation-triangle',
};

const TOAST_TEXT_COLOR = '#F8FAFC';

type ToastProps = {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
};

const Toast = ({ message, variant, onDismiss }: ToastProps) => (
  <div className={styles.slot}>
    <button
      type="button"
      role="alert"
      aria-label={message}
      onClick={onDismiss}
      className={[styles.banner, styles[variant]].join(' ')}
    >
      <Icon name={ICONS[variant]} size={16} color={TOAST_TEXT_COLOR} />
      <span className={styles.message}>{message}</span>
    </button>
  </div>
);

export default Toast;
