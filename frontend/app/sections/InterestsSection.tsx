import React, { useEffect, useState } from "react";
import { fetchInterests } from "~/lib/api";
import InterestCard from "~/components/InterestCard";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";

interface Interest {
  id?: number;
  name: string;
  icon?: string;
  gradient?: string;
  description?: string;
}

export default function InterestsSection(props: React.HTMLAttributes<HTMLElement>) {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterests()
      .then((data) => setInterests(data.interests || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <section {...props}className="w-full max-w-10xl mx-auto gap-px p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 relative inline-flex items-center gap-2">
          <span className="text-2xl">✨</span> Interests
        </h2>
        <span className="block h-1 w-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2 animate-pulse"></span>
        <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm">
          Areas that fuel my curiosity and innovative drive.
        </p>
      </div>
      <div
        className="
          rounded-3xl shadow-xl bg-white/70 dark:bg-gray-900/70
          border border-emerald-100 dark:border-emerald-900
          backdrop-blur-xl px-3 py-6
        "
      >
        <div className="flex flex-wrap justify-start gap-3">
  {interests.map((interest, i) => (
    <div
      key={interest.id ?? interest.name}
      className="flex-grow sm:flex-grow-0 basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.75rem)] md:basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.75rem)]"
    >
      <InterestCard interest={interest} index={i} />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
