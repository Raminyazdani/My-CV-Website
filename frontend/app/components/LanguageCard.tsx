import React, { useState } from "react";
import { motion } from "framer-motion";

const LANGUAGE_META: Record<string, { flag: string; gradient: string }> = {
  Farsi:   { flag: "🇮🇷", gradient: "from-green-400 to-green-600" },
  English: { flag: "🇬🇧", gradient: "from-blue-400 to-blue-600" },
  German:  { flag: "🇩🇪", gradient: "from-yellow-400 to-yellow-600" },
};

const CEFR_COLOR: Record<string, string> = {
  C2: "from-green-400 to-green-600 text-green-700 bg-green-100",
  C1: "from-blue-400 to-blue-600 text-blue-700 bg-blue-100",
  B2: "from-indigo-400 to-indigo-600 text-indigo-700 bg-indigo-100",
  B1: "from-purple-400 to-purple-600 text-purple-700 bg-purple-100",
  A2: "from-orange-400 to-orange-600 text-orange-700 bg-orange-100",
  A1: "from-yellow-400 to-yellow-600 text-yellow-700 bg-yellow-100",
  Native: "from-green-400 to-green-600 text-green-700 bg-green-100",
  Beginner: "from-yellow-400 to-yellow-600 text-yellow-700 bg-yellow-100",
};
const proficiencyPercent: Record<string, number> = {
  C2: 100, C1: 90, B2: 75, B1: 60, A2: 40, A1: 20, Native: 100, Beginner: 20,
};

function getCEFRColor(cefr: string) {
  return CEFR_COLOR[cefr] || "from-gray-400 to-gray-600 text-gray-700 bg-gray-100";
}
function getPercent(cefr: string) {
  return proficiencyPercent[cefr] || 10;
}
function getSkillPercent(val: string | number | null | undefined, cert: any, cefr: string): number {
  if (val === null || val === undefined) return proficiencyPercent[cefr] || 10;
  if (val === "Native") return 100;
  if (typeof val === "number" && typeof cert.maxScore === "number" && typeof cert.minScore === "number") {
    const max = cert.maxScore;
    const min = cert.minScore;
    if (max > min) {
      return Math.min(100, Math.round(((Number(val) - min) / (max - min)) * 100));
    }
  }
  return proficiencyPercent[cefr] || 10;
}

export interface LanguageCertification {
  test: string | null;
  organization: string | null;
  overall: string | number | null;
  reading: string | number | null;
  writing: string | number | null;
  listening: string | number | null;
  speaking: string | number | null;
  examDate: string | null;
  URL: string | null;
  maxScore?: number | null;
  minScore?: number | null;
}

export interface LanguageData {
  language: string;
  proficiency: {
    level: string;
    CEFR: string;
    status: string;
  };
  certifications: LanguageCertification[];
}

export const LanguageCard = ({
  lang,
  index = 0,
}: {
  lang: LanguageData;
  index?: number;
}) => {
  const [tab, setTab] = useState<"overview" | "certification">("overview");
  const { language, proficiency, certifications } = lang;
  const cert = certifications[0] || {};
  const meta = LANGUAGE_META[language] || {};
  const flag = meta.flag || language.slice(0, 2).toUpperCase();
  const gradient = meta.gradient || "from-gray-400 to-gray-600";
  const percent = getPercent(proficiency.CEFR);

  return (
    <motion.div
      className="language-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-visible border border-gray-100 dark:border-gray-800 relative"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, duration: 0.6, type: "spring" }}
      whileHover={{
        scale: 1.045,
        rotate: -1.5,
        boxShadow: "0 12px 28px 0 rgba(0,0,0,0.18)",
      }}
    >
      {/* Floating flag with subtle floating/bounce */}
      <motion.div
        className={`absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-900 text-2xl font-bold`}
        whileHover={{
          y: [0, -4, 0],
          scale: 1.08,
          transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        {flag}
      </motion.div>
      <div className="p-6 pt-12">
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{language}</h3>
          <span className={`mt-1 text-xs font-semibold px-2 py-1 rounded ${getCEFRColor(proficiency.CEFR)}`}>
            {proficiency.CEFR}
          </span>
        </div>
        {/* Proficiency Progress Bar */}
        <div className="mb-4 w-full">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700 dark:text-gray-300">Proficiency</span>
            <span className={`text-sm font-semibold ${getCEFRColor(proficiency.CEFR)}`}>{proficiency.level}</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
            <motion.div
              className={`h-2 rounded bg-gradient-to-r ${gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-4 flex justify-center space-x-3 text-xs font-medium">
          <button className={`pb-1 ${tab === "overview" ? "text-blue-700 border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setTab("overview")}>Overview</button>
          <button className={`pb-1 ${tab === "certification" ? "text-blue-700 border-b-2 border-blue-500" : "text-gray-400"}`} onClick={() => setTab("certification")}>Certification</button>
        </div>
        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["reading", "writing", "listening", "speaking"].map((skill) => (
              <div key={skill}>
                <div className="text-xs text-gray-500 mb-1 capitalize">{skill}</div>
                <div className="h-1.5 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    className={`rounded h-1.5 bg-gradient-to-r ${gradient}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${getSkillPercent(cert[skill as keyof LanguageCertification], cert, proficiency.CEFR)}%`
                    }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Certification Tab */}
        {tab === "certification" && (
          <div className="mt-3 text-xs">
            {cert.test === "Mother Tongue" ? (
              <div>
                <p className="font-semibold">Mother Tongue</p>
                <p className="text-gray-600 mt-2 dark:text-gray-300">Native proficiency in all skills</p>
              </div>
            ) : cert.test ? (
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{cert.test}</span>
                  {cert.examDate && <span className="text-gray-400">{cert.examDate}</span>}
                </div>
                <div className="text-gray-500">{cert.organization}</div>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <span>Overall: <b>{cert.overall}</b></span>
                  <span>Reading: <b>{cert.reading}</b></span>
                  <span>Listening: <b>{cert.listening}</b></span>
                  <span>Writing: <b>{cert.writing}</b></span>
                  <span>Speaking: <b>{cert.speaking}</b></span>
                </div>
                {typeof cert.maxScore === "number" && (
                  <div className="text-[11px] text-gray-400 mt-2">Max score: {cert.maxScore}</div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-12 text-gray-400">Currently studying - No certification yet</div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LanguageCard;
