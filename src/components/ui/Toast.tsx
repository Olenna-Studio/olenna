"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ShoppingBag, Sparkles, X } from "lucide-react";

export interface ToastOptions {
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastContextValue {
  showToast: (options: ToastOptions | string) => void;
  showComingSoon: (customMessage?: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions | string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const toastData: ToastOptions =
        typeof options === "string" ? { message: options } : options;

      setToast(toastData);

      const duration = toastData.duration ?? 4500;
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          setToast(null);
          timerRef.current = null;
        }, duration);
      }
    },
    []
  );

  const showComingSoon = useCallback(
    (customMessage?: string) => {
      showToast({
        title: "Online Store Coming Soon",
        message:
          customMessage ||
          "Our online shop will be available soon! We are putting the finishing touches on our digital shopping experience.",
        duration: 4500,
      });
    },
    [showToast]
  );

  // Global click interceptor for all "Shop Online" triggers across the site
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button");
      if (!el) return;

      const href = el.getAttribute("href") || "";
      const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
      const text = (el.textContent || "").trim().toLowerCase();

      const isCustomerPwaUrl =
        href.includes("shop.olenna.in") ||
        href.includes("customer-pwa") ||
        href.startsWith("https://shop.") ||
        href.startsWith("http://shop.");

      const isShopOnlineLabel =
        ariaLabel === "shop online" ||
        text.includes("shop online") ||
        text.includes("shop on customer app") ||
        text.includes("explore on customer app");

      if (isCustomerPwaUrl || isShopOnlineLabel) {
        e.preventDefault();
        e.stopPropagation();
        showComingSoon();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [showComingSoon]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showComingSoon, hideToast }}>
      {children}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed z-50 bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 max-w-sm w-full bg-brand-plum-950 text-white rounded-2xl shadow-2xl p-4 border border-brand-mauve-200/20 backdrop-blur-md flex items-start gap-3.5 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-blush-100/15 border border-brand-blush-100/20 flex items-center justify-center shrink-0 text-brand-blush-100">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-serif font-medium text-brand-ivory-50 tracking-wide">
                {toast.title || "Coming Soon"}
              </h4>
              <Sparkles className="w-3.5 h-3.5 text-brand-champagne-200 inline" />
            </div>
            <p className="text-xs text-brand-ivory-200/80 leading-relaxed mt-1 font-light">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={hideToast}
            aria-label="Close notification"
            className="p-1 rounded-lg text-brand-ivory-200/60 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
