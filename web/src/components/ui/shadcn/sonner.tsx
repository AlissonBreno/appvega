import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import Icon from '~/components/ui/Icon';
import { useDesktop } from '~/hooks/useDesktop';
import { useTheme } from '~/hooks/useTheme';

const toastIcon = (name: 'check' | 'exclamation-circle' | 'exclamation-triangle') => (
  <Icon name={name} size={16} color="#F8FAFC" />
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { scheme } = useTheme();
  const desktop = useDesktop();
  const bottom = desktop ? '32px' : '96px';

  return (
    <Sonner
      theme={scheme}
      className="toaster group"
      position="bottom-center"
      offset={{ bottom }}
      mobileOffset={{ bottom }}
      icons={{
        success: toastIcon('check'),
        error: toastIcon('exclamation-circle'),
        warning: toastIcon('exclamation-triangle'),
      }}
      toastOptions={{
        classNames: {
          toast:
            'pointer-events-auto !w-[min(480px,calc(100%-32px))] !rounded-xl !border-0 !px-4 !py-4 !text-[#F8FAFC] !shadow-none',
          title: '!text-sm !font-normal !text-[#F8FAFC]',
          description: '!text-[#F8FAFC]',
          success: '!bg-[var(--toast-success)]',
          error: '!bg-[var(--toast-danger)]',
          warning: '!bg-[var(--toast-warning)]',
          icon: '!m-0',
        },
      }}
      style={
        {
          '--border-radius': '12px',
        } as CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
