import React from "react";
import type { JSX } from "react";
import { motion } from "framer-motion";

export interface Publication {
  id?: number;
  authors: string[];
  supervisors?: string[];
  title: string;
  type: string;
  status: string;
  correspondent?: string;
  institution?: string | null;
  faculty?: string | null;
  school?: string | null;
  isbn?: string | null;
  submission_date?: string | null;
  url?: string | null;
  type_key?: string | string[];
}

const iconMap: Record<string, JSX.Element> = {
  "Research Paper": (
    <div className="publication-icon bg-blue-100 text-blue-600 flex items-center justify-center w-11 h-11 rounded-full shadow-lg ring-2 ring-blue-200/30">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    </div>
  ),
  "Book Chapter": (
    <div className="publication-icon bg-green-100 text-green-600 flex items-center justify-center w-11 h-11 rounded-full shadow-lg ring-2 ring-green-200/30">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
      </svg>
    </div>
  ),
  "Review Article": (
    <div className="publication-icon bg-purple-100 text-purple-600 flex items-center justify-center w-11 h-11 rounded-full shadow-lg ring-2 ring-purple-200/30">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    </div>
  ),
  "Master Thesis": (
    <div className="publication-icon bg-indigo-100 text-indigo-600 flex items-center justify-center w-11 h-11 rounded-full shadow-lg ring-2 ring-indigo-200/30">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
      </svg>
    </div>
  ),
};

const statusColor: Record<string, string> = {
  "Published": "bg-green-100 text-green-700",
  "Submitted": "bg-blue-100 text-blue-700",
  "Waiting for Submission": "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-yellow-50 text-yellow-800",
};

const typeColor: Record<string, string> = {
  "Research Paper": "bg-blue-50 text-blue-700",
  "Book Chapter": "bg-green-50 text-green-700",
  "Review Article": "bg-purple-50 text-purple-700",
  "Master Thesis": "bg-indigo-50 text-indigo-700",
};

export default function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  // Tag utility (string[] or comma separated string)
  const tags: string[] = Array.isArray(pub.type_key)
    ? pub.type_key
    : typeof pub.type_key === "string"
    ? pub.type_key.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      className="publication-card bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 px-6 py-5 flex items-start gap-5 transition-all hover:shadow-2xl hover:ring-2 hover:ring-blue-200/30"
      data-type={pub.type}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.018, y: -2, boxShadow: "0 8px 44px 0 rgba(40,40,80,0.12)" }}
      transition={{ delay: index * 0.07, duration: 0.6, type: "spring" }}
    >
      {/* Left Icon */}
      <div className="mt-1 flex-shrink-0">{iconMap[pub.type] || iconMap["Research Paper"]}</div>
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top row: Title + Status */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-0.5">
          <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-50 leading-tight break-words max-w-full">
            {pub.title}
          </h3>
          <span className={`status-badge ml-2 flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded shadow-sm ${statusColor[pub.status] || "bg-gray-100 text-gray-800"}`}>
            {pub.status}
          </span>
        </div>
        {/* Authors */}
        <div className="text-gray-600 dark:text-gray-300 mt-0.5 text-xs md:text-sm leading-snug line-clamp-2">
          <span className="font-medium text-gray-500 dark:text-gray-400">Authors:</span> {pub.authors?.join(", ")}
        </div>
        {/* Type & tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded ${typeColor[pub.type] || "bg-gray-50 text-gray-700"} font-semibold`}>
            {pub.type}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-[11px] px-2 py-0.5 rounded font-medium">{tag}</span>
          ))}
        </div>
        {/* Divider */}
        <div className="my-2 border-t border-gray-100 dark:border-gray-800" />
        {/* Correspondent */}
        {pub.correspondent && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-semibold">Correspondent:</span> {pub.correspondent}
          </div>
        )}
        {/* Master Thesis metadata */}
        {pub.type === "Master Thesis" && (
          <div className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            {pub.institution && (
              <div><span className="font-semibold">Institution:</span> {pub.institution}</div>
            )}
            {pub.faculty && (
              <div><span className="font-semibold">Faculty:</span> {pub.faculty}</div>
            )}
            {pub.school && (
              <div><span className="font-semibold">School:</span> {pub.school}</div>
            )}
            {pub.submission_date && (
              <div><span className="font-semibold">Submission Date:</span> {pub.submission_date}</div>
            )}
          </div>
        )}
        {/* Supervisors */}
        {pub.supervisors?.length ? (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Supervisors:</span>
            <ul className="inline ml-2 list-disc list-inside">
              {pub.supervisors.map((sup) => (
                <li key={sup} className="inline mr-2">{sup}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {/* External link */}
        {pub.url && (
          <div className="mt-3">
            <a href={pub.url} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline text-xs hover:text-blue-800 dark:hover:text-blue-200 transition">
              View Publication
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
