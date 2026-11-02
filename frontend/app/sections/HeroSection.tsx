import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "~/components/Loader";
import ErrorFallback from "~/components/ErrorFallback";
import SocialLinks from "~/components/SocialLinks";
import { fetchBasicInfo, fetchProfiles } from "~/lib/api";
import ContactLinks from "~/components/ContactLinks";

export default function HeroSection() {
  const [basicInfo, setBasicInfo] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchBasicInfo(), fetchProfiles()])
      .then(([basic, profs]) => {
        const b = basic.basics?.[0];
        const profilePic = b?.Pictures?.find((p: any) => p.type_of === "profile")?.URL;
        const coverPic = b?.Pictures?.find((p: any) => p.type_of === "cover")?.URL;

        setBasicInfo({
          ...b,
          profile_picture_url: profilePic,
          cover_picture_url: coverPic,
          locations: b.location || [], // 👈 add this line

        });
        setProfiles(profs.profiles || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load profile info");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error || !basicInfo) return <ErrorFallback message={error || "No data"} />;

  return (
    <div className="relative min-h-[520px] overflow-hidden bg-gray-50 dark:bg-gray-950 select-none">
      <img
        src={basicInfo.cover_picture_url || "/cover.jpg"}
        alt="Cover"
        className="absolute inset-0 w-full h-full object-cover opacity-70 blur-md scale-105 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/0 dark:from-gray-900/90 dark:via-gray-900/70 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: "50%" }}
        >
          <path
            fill="#f0f4f8"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      <div className="container mx-auto px-0 md:px-0 py-14 md:py-20 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex-grow backdrop-blur-2xl bg-white/90 dark:bg-gray-900/75 rounded-2xl shadow-2xl p-6 md:p-12 max-w-5xl mx-auto mt-8 mx-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            <div className="flex flex-col items-center md:items-center w-full">
              <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-2">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent pb-1">
                  {basicInfo.name}
                </span>
              </h1>
              <motion.div
                className="w-full flex justify-center mb-4"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6, type: "spring" }}
              >
                <img
                  src={basicInfo.profile_picture_url || "/profile.jpg"}
                  alt={basicInfo.name}
                  className="w-full max-w-[340px] h-auto aspect-square rounded-full object-cover border-[9px] border-white dark:border-gray-800 shadow-2xl bg-white"
                  style={{ boxShadow: "0 10px 36px 0 rgba(80,100,170,0.13)" }}
                />
              </motion.div>
            </div>

            <div className="flex flex-col gap-4 w-full justify-around md:items-start">
              <div className="flex flex-wrap gap-2 justify-center w-full mb-4">
              {(Array.isArray(basicInfo.label) ? basicInfo.label : [basicInfo.label || ""]).filter(Boolean).map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 shadow"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-4 w-full">
                <ContactLinks basicInfo={basicInfo} />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <SocialLinks profiles={profiles} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-gray-700 dark:text-gray-100 text-base md:text-[1.08rem] leading-relaxed text-center md:text-left">
              {basicInfo.summary}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}