import React from "react";
import Link from "next/link";
import { SiteSettings } from "@/lib/models/settings";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, FacebookIcon, PinterestIcon } from "@/components/ui/SocialIcons";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#FAF3F0] text-brand-text-primary border-t border-brand-plum-900/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-brand-plum-900/10">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-3">
            <Logo size="md" variant="horizontal" />
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed max-w-xs font-light">
              {settings.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-brand-plum-900 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-text-secondary">
              {settings.footerQuickLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-plum-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Collections Column 1 */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-brand-plum-900 uppercase">
              Our Collections
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-text-secondary">
              <li>
                <Link
                  href="/collections/beauty-cosmetics"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Beauty & Cosmetics
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/fashion-ethnic"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Fashion & Ethnic Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/imitation-jewellery"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Imitation Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/handbags-accessories"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Handbags & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Collections Column 2 */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-brand-plum-900 uppercase opacity-0 hidden lg:block">
              More
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-text-secondary">
              <li>
                <Link
                  href="/collections/personal-care"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Personal Care & Hygiene
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/tailoring-supplies"
                  className="hover:text-brand-plum-900 transition-colors"
                >
                  Tailoring & Fashion Designing
                </Link>
              </li>
              <li>
                <span className="text-brand-text-muted cursor-default">
                  Kids & Newborn Essentials
                </span>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-brand-plum-900 uppercase">
              Connect With Us
            </h3>
            <div className="flex items-center gap-3">
              {settings.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Olenna on ${social.label}`}
                  className="w-8 h-8 rounded-full bg-brand-mauve-200/50 flex items-center justify-center text-brand-plum-900 hover:bg-brand-plum-900 hover:text-white transition-colors"
                >
                  {social.platform === "instagram" && (
                    <InstagramIcon className="w-4 h-4" />
                  )}
                  {social.platform === "facebook" && (
                    <FacebookIcon className="w-4 h-4" />
                  )}
                  {social.platform === "pinterest" && (
                    <PinterestIcon className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
            <p className="text-xs text-brand-text-muted">Follow our journey</p>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-text-muted gap-4">
          <p>{settings.copyrightText}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-brand-plum-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/terms"
              className="hover:text-brand-plum-900 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
