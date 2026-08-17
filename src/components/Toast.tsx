import React from 'react';
import { Check, Info, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl bg-[#12131d] border border-white/20 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200"
          role="alert"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            {toast.type === 'error' ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono font-bold text-white truncate">{toast.title}</p>
            {toast.message && (
              <p className="text-[11px] font-mono text-zinc-400 truncate">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-500 hover:text-white text-xs font-mono p-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
