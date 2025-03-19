"use client"

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} id={`toast-${id}`} {...props} className="shadow-xl border-2">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-lg font-bold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm opacity-100">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="gap-y-2 p-4" />
    </ToastProvider>
  )
}
