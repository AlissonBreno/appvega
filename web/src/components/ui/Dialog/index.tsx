import type { ReactNode } from 'react';

import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogTitle,
} from '~/components/ui/shadcn/dialog';
import { cn } from '~/lib/utils';

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  label: string;
};

const Dialog = ({ children, onClose, label }: DialogProps) => (
  <ShadcnDialog
    open
    onOpenChange={nextOpen => {
      if (!nextOpen) {
        onClose();
      }
    }}
  >
    <DialogContent
      showCloseButton={false}
      aria-label={label}
      className={cn(
        'top-1/2 left-1/2 flex max-h-[85vh] w-[min(640px,100%)] max-w-[min(640px,calc(100%-3rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-background p-0 text-foreground shadow-[0_24px_64px_rgb(0_0_0_/_45%)] ring-0 sm:max-w-[min(640px,calc(100%-3rem))]',
      )}
    >
      <DialogTitle className="sr-only">{label}</DialogTitle>
      {children}
    </DialogContent>
  </ShadcnDialog>
);

export default Dialog;
