import React from "react";
import { OpeningHourItem } from "@/lib/models/store";
import { Clock } from "lucide-react";

interface StoreOpeningHoursProps {
  hours: OpeningHourItem[];
  specialNotice?: string;
  compact?: boolean;
}

export function StoreOpeningHours({
  hours,
  specialNotice,
  compact = false,
}: StoreOpeningHoursProps) {
  if (!hours || hours.length === 0) {
    return (
      <div className="text-xs text-brand-text-muted italic">
        Operating hours available upon enquiry.
      </div>
    );
  }

  if (compact) {
    // Show summary (e.g. Mon - Sun: 10:00 AM - 9:30 PM or first item)
    const first = hours[0];
    const isUniform = hours.every(
      (h) => h.open === first.open && h.close === first.close && !h.isClosed
    );

    return (
      <div className="flex items-start gap-2 text-xs text-brand-text-secondary">
        <Clock className="w-3.5 h-3.5 mt-0.5 text-brand-plum-700 shrink-0" />
        <div>
          {isUniform ? (
            <span>Mon – Sun: {first.open} – {first.close}</span>
          ) : (
            <span>Daily: {first.open} – {first.close} (varies on weekends)</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-plum-900 uppercase">
        <Clock className="w-4 h-4 text-brand-plum-700" />
        <span>Store Hours</span>
      </div>

      <div className="divide-y divide-brand-plum-900/10 border-y border-brand-plum-900/10 text-xs sm:text-sm">
        {hours.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between py-2 text-brand-text-secondary"
          >
            <span className="font-medium text-brand-plum-900">{item.day}</span>
            <span>
              {item.isClosed ? (
                <span className="text-red-700 font-medium">Closed</span>
              ) : (
                `${item.open} – ${item.close}`
              )}
            </span>
          </div>
        ))}
      </div>

      {specialNotice && (
        <p className="text-xs text-brand-plum-700/80 bg-brand-blush-50 p-2.5 rounded-lg border border-brand-plum-900/10">
          ✦ {specialNotice}
        </p>
      )}
    </div>
  );
}
