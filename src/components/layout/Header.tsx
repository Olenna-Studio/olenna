"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ArrowUpRight, ShoppingBag, X } from "lucide-react";
import { SiteSettings } from "@/lib/models/settings";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showComingSoon } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/stores?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 bg-[#FFFAF7] border-b border-brand-plum-900/10 transition-shadow"
      style={{ backgroundColor: "#FFFAF7" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile hamburger navigation */}
          <div className="flex md:hidden items-center">
            <MobileNav settings={settings} />
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo size="md" variant="horizontal" priority />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {settings.mainNavigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm tracking-wide font-normal transition-all relative py-1 ${
                    isActive
                      ? "text-brand-plum-900 font-medium"
                      : "text-brand-text-secondary hover:text-brand-plum-900"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-plum-900 rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Shop Online CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search stores and collections"
              className="p-2 text-brand-plum-900 hover:text-brand-plum-700 hover:bg-brand-blush-100/50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Mobile quick Shop Bag */}
            <a
              href={settings.customerPwaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shop Online"
              onClick={(e) => {
                e.preventDefault();
                showComingSoon();
              }}
              className="md:hidden p-2 text-brand-plum-900 hover:text-brand-plum-700 rounded-full"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            </a>

            {/* Desktop Shop Online CTA */}
            <Button
              href={settings.customerPwaUrl}
              isExternal
              variant="primary"
              size="md"
              onClick={(e) => {
                e.preventDefault();
                showComingSoon();
              }}
              className="hidden md:inline-flex shadow-xs hover:shadow-md"
            >
              <span>{settings.customerPwaLabel}</span>
              <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.2]" />
            </Button>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {isSearchOpen && (
          <div className="py-4 border-t border-brand-plum-900/10 animate-in slide-in-from-top-2 duration-200">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 max-w-xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-plum-700/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search stores, categories or city (e.g. Chennai, Jewellery, Anna Nagar)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-full border border-brand-plum-900/20 focus:outline-none focus:border-brand-plum-900 text-brand-text-primary placeholder:text-brand-text-muted"
                />
              </div>
              <Button type="submit" size="sm" variant="primary">
                Search
              </Button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-brand-text-muted hover:text-brand-plum-900"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
