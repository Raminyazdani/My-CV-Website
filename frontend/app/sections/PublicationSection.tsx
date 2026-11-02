import React, { useEffect, useState } from "react";
import { fetchPublications } from "~/lib/api";
import PublicationCard from "~/components/PublicationCard";
import type { Publication } from "~/components/PublicationCard";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";

const FILTERS = [
  { label: "All Publications", value: "all" },
  { label: "Research Papers", value: "Research Paper" },
  { label: "Book Chapters", value: "Book Chapter" },
  { label: "Review Articles", value: "Review Article" },
  { label: "Thesis", value: "Master Thesis" },
];

export default function PublicationSection(props: React.HTMLAttributes<HTMLElement>) {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchPublications()
      .then((data) => setPublications(data.publications || []))

      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  // Publication stats
  const stats = {
    "Research Paper": publications.filter(p => p.type === "Research Paper").length,
    "Book Chapter": publications.filter(p => p.type === "Book Chapter").length,
    "Review Article": publications.filter(p => p.type === "Review Article").length,
    "Master Thesis": publications.filter(p => p.type === "Master Thesis").length,
    "Published": publications.filter(p => p.status === "Published").length,
    "Submitted": publications.filter(p => p.status === "Submitted").length,
    "In Progress": publications.filter(p => ["Waiting for Submission", "In Progress"].includes(p.status)).length,
  };

  // Filter publications
  const filteredPubs = filter === "all"
    ? publications
    : publications.filter((p) => p.type === filter);

  return (
    <section {...props}className="w-full max-w-10xl mx-auto  gap-px  p-6 ">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-900 dark:text-blue-200 tracking-tight flex items-center gap-2">
          <span className="text-2xl">📚</span> Publications
        </h2>
        <div className="h-1 w-28 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-2 animate-pulse" />
        <p className="mt-2 text-gray-700 dark:text-gray-200 text-base">
          My research contributions in biotechnology and bioinformatics.
        </p>
      </div>
      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn px-4 py-2 rounded-full text-sm font-medium border border-gray-300 shadow-sm transition
              ${filter === f.value
                ? "bg-blue-600 text-white scale-105 shadow-lg"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900"}`}
            style={{
              transition: "all 0.2s cubic-bezier(.4,2,.5,1)",
            }}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {/* Publications List */}
      <div className="relative pl-7 timeline-container">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200/60 via-indigo-300/40 to-indigo-400/40 rounded-full z-0" />
        {/* Experience cards */}
        <div className="relative z-10">

      <div className="space-y-7">
        {filteredPubs.length === 0 && (
          <div className="text-center text-gray-400">No publications found.</div>
        )}
        {filteredPubs.map((pub, i) => (
          <PublicationCard key={pub.title + i} pub={pub} index={i} />
        ))}
      </div>

        </div>
      </div>
      {/* Publication Stats */}
      <div className="mt-12 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg p-7 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Publication Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{stats["Research Paper"]}</div>
            <div className="text-xs text-gray-600 mt-1">Research Papers</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{stats["Book Chapter"]}</div>
            <div className="text-xs text-gray-600 mt-1">Book Chapters</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{stats["Review Article"]}</div>
            <div className="text-xs text-gray-600 mt-1">Review Articles</div>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600">{stats["Master Thesis"]}</div>
            <div className="text-xs text-gray-600 mt-1">Thesis</div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-2.5 rounded-full"
              style={{ width: `${Math.min(stats["Published"] * 20 + stats["Submitted"] * 15 + stats["In Progress"] * 10, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2 max-w-md mx-auto">
          <span>{stats["Published"]} Published</span>
          <span>{stats["Submitted"]} Submitted</span>
          <span>{stats["In Progress"]} In Progress</span>
        </div>
      </div>
    </section>
  );
}
