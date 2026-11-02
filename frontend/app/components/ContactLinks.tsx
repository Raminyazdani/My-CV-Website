// app/components/ContactLinks.tsx

import React from "react";

export interface ContactInfo {
  email?: string;
  phone?: { formatted: string };
  locations?: { city: string; country: string }[];
}

interface ContactLinksProps {
  basicInfo: ContactInfo;
}

export default function ContactLinks({ basicInfo }: ContactLinksProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center w-full">
      {/* Email */}
      {basicInfo.email && (
        <a
          href={`mailto:${basicInfo.email}`}
          className="w-full justify-between px-8 flex items-center gap-1 px-2 py-1 text-base text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full shadow hover:text-blue-500 hover:scale-105 focus-visible:ring-2 ring-blue-400 transition-all duration-200 min-w-[44px] max-w-xs"
          title={basicInfo.email}
        >
          <span className="text-xl">📧</span>
          <span className="truncate">{basicInfo.email}</span>
        </a>
      )}
      {/* Phone */}
      {basicInfo.phone?.formatted && (
        <a
          href={`tel:${basicInfo.phone.formatted.replace(/\s+/g, "")}`}
          className="w-full justify-between px-8 flex items-center gap-1 px-2 py-1 text-base text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full shadow hover:text-blue-500 hover:scale-105 focus-visible:ring-2 ring-blue-400 transition-all duration-200 min-w-[44px] max-w-xs"
          title={basicInfo.phone.formatted}
        >
          <span className="text-xl">📞</span>
          <span className="truncate">{basicInfo.phone.formatted}</span>
        </a>
      )}
      {/* Location */}
      {basicInfo.locations && basicInfo.locations.length > 0 && (
        <div
        className="w-full justify-between px-8 flex items-center gap-1 px-2 py-1 text-base text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full shadow hover:text-blue-500 hover:scale-105 focus-visible:ring-2 ring-blue-400 transition-all duration-200 min-w-[44px] max-w-xs"
        title={`${basicInfo.locations[0].city}, ${basicInfo.locations[0].country}`}
        >
          <span className="text-xl">📍</span>
          <span className="truncate">
            {basicInfo.locations[0].city}, {basicInfo.locations[0].country}
          </span>
        </div>
      )}
    </div>
  );
}
