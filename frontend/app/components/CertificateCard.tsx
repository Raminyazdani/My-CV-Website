// CertificateCard.tsx
import React from "react";

interface Certification {
  name: string;
  date: string;
  duration: string;
  certificate: boolean;
  URL: string | null;
  type_key: string[];
}

interface CertificateCardProps {
  cert: Certification;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <li className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        {cert.name}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span className="mr-3">
          📅 {isNaN(Date.parse(cert.date)) ? cert.date : new Date(cert.date).toLocaleDateString()}
        </span>
        <span>⏱️ {cert.duration}</span>
        {cert.certificate && <span className="ml-3">✅ Certificate</span>}
        {cert.URL && (
          <a
            href={cert.URL}
            className="ml-3 text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        )}
      </p>
    </li>
  );
}
