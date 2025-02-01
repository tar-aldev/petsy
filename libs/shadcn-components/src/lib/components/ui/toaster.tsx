'use client';
import { Check, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        console.log('variant', variant);

        return (
          <Toast key={id} {...props}>
            {variant === 'success' ? (
              <Check className="text-green-700" />
            ) : variant === 'info' ? (
              <InfoIcon className="text-primary" />
            ) : (
              <TriangleAlertIcon className="text-destructive" />
            )}

            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
