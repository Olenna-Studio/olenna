"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { SiteSettings } from "@/lib/models/settings";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

interface MobileNavProps {
  settings: SiteSettings;
}

export function MobileNav({ settings }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="p-2 -mr-2 text-brand-plum-900 hover:text-brand-plum-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900 rounded-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-brand-ivory-50 shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-brand-plum-900/10">
          <Logo size="sm" variant="horizontal" />
          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="p-2 text-brand-plum-900 hover:text-brand-plum-700 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2">
          {settings.mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClose}
                className={`py-3 px-3 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-brand-mauve-100 text-brand-plum-900 font-semibold"
                    : "text-brand-text-primary hover:bg-brand-blush-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Customer PWA Action */}
        <div className="pt-6 border-t border-brand-plum-900/10 flex flex-col gap-4">
          <Button
            href={settings.customerPwaUrl}
            isExternal
            variant="primary"
            size="md"
            className="w-full justify-center"
          >
            <span>{settings.customerPwaLabel}</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>

          <div className="text-xs text-brand-text-secondary space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-plum-700" />
              <span>Flagship Store: Anna Nagar, Chennai</span>
            </div>
            {settings.contactDetails.primaryPhone && (
              <a
                href={`tel:${settings.contactDetails.primaryPhone}`}
                className="flex items-center gap-2 hover:text-brand-plum-900"
              >
                <Phone className="w-3.5 h-3.5 text-brand-plum-700" />
                <span>{settings.contactDetails.phoneDisplay}</span>
              </a>
            )}
            {settings.contactDetails.primaryEmail && (
              <a
                href={`mailto:${settings.contactDetails.primaryEmail}`}
                className="flex items-center gap-2 hover:text-brand-plum-900"
              >
                <Mail className="w-3.5 h-3.5 text-brand-plum-700" />
                <span>{settings.contactDetails.primaryEmail}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
