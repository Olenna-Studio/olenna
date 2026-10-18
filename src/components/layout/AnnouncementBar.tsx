import React from "react";
import Link from "next/link";
import { AnnouncementBarContent } from "@/lib/models/content";
import { SiteSettings } from "@/lib/models/settings";
import { Compass } from "lucide-react";
import { InstagramIcon, FacebookIcon, PinterestIcon } from "@/components/ui/SocialIcons";

interface AnnouncementBarProps {
  announcement: AnnouncementBarContent;
  settings: SiteSettings;
}

export function AnnouncementBar({
  announcement,
  settings,
}: AnnouncementBarProps) {
  if (!announcement.isVisible || !announcement.message) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-[#6B4B5E] text-brand-blush-50 text-[11px] sm:text-xs py-2 px-4 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile: Centered message */}
        <div className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 tracking-wide font-medium">
          <span className="text-[10px] text-brand-mauve-200">✦</span>
          <span>{announcement.message}</span>
        </div>

        {/* Desktop right side: Store locator & social follow */}
        <div className="hidden md:flex items-center gap-4 text-brand-blush-100/90">
          <Link
            href={announcement.storeLocatorUrl}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{announcement.storeLocatorLabel}</span>
          </Link>
          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-brand-mauve-200">Follow us</span>
                {settings.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Olenna on ${social.label}`}
                    className="hover:text-white transition-colors"
                  >
                    {social.platform === "instagram" && (
                      <InstagramIcon className="w-3.5 h-3.5" />
                    )}
                    {social.platform === "facebook" && (
                      <FacebookIcon className="w-3.5 h-3.5" />
                    )}
                    {social.platform === "pinterest" && (
                      <PinterestIcon className="w-3.5 h-3.5" />
                    )}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
