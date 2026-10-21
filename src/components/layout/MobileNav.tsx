"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { SiteSettings } from "@/lib/models/settings";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useToast } from "@/components/ui/Toast";

interface MobileNavProps {
  settings: SiteSettings;
}

const emptySubscribe = () => () => {};

export function MobileNav({ settings }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const pathname = usePathname();
  const { showComingSoon } = useToast();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const drawerContent = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-998 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out drawer: 100% solid, fully opaque background with high-contrast text */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-999 w-[85vw] max-w-sm sm:max-w-md bg-[#FAF5F2] text-brand-text-primary shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out border-l border-brand-plum-900/15 ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        style={{ backgroundColor: "#FAF5F2" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-brand-plum-900/15">
          <Logo size="sm" variant="horizontal" />
          <button
            onClick={handleClose}
            aria-label="Close navigation drawer"
            className="p-2 text-brand-plum-900 hover:text-brand-plum-950 bg-brand-blush-100/60 hover:bg-brand-blush-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
          {settings.mainNavigation.map((item) => {
            const isActive =
              pathname
                ? item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
                : false;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClose}
                className={`py-3.5 px-4 text-base rounded-xl transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-brand-plum-900 text-white font-semibold shadow-xs"
                    : "text-brand-plum-950 hover:bg-brand-blush-100/70 hover:text-brand-plum-900 font-medium"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-brand-champagne-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Customer PWA / Online Shop Action */}
        <div
          className="pt-5 border-t border-brand-plum-900/15 flex flex-col gap-4 bg-[#F2E8E4] -mx-6 -mb-6 p-6 mt-auto shadow-inner"
          style={{ backgroundColor: "#F2E8E4" }}
        >
          <Button
            href={settings.customerPwaUrl}
            isExternal
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              showComingSoon();
            }}
            className="w-full justify-center shadow-xs"
          >
            <span>{settings.customerPwaLabel}</span>
            <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.2]" />
          </Button>

          <div className="text-xs text-brand-text-secondary space-y-2 pt-1 font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-plum-800 shrink-0" />
              <span className="text-brand-plum-950 font-medium">Boutique & Studio: Rajajinagar, Bangalore</span>
            </div>
            {settings.contactDetails.primaryPhone && (
              <a
                href={`tel:${settings.contactDetails.primaryPhone}`}
                className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-plum-900 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-plum-800 shrink-0" />
                <span>{settings.contactDetails.phoneDisplay}</span>
              </a>
            )}
            {settings.contactDetails.primaryEmail && (
              <a
                href={`mailto:${settings.contactDetails.primaryEmail}`}
                className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-plum-900 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-plum-800 shrink-0" />
                <span>{settings.contactDetails.primaryEmail}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="p-2 -mr-2 text-brand-plum-900 hover:text-brand-plum-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900 rounded-md"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
      </button>

      {mounted && isOpen && createPortal(drawerContent, document.body)}
    </div>
  );
}
