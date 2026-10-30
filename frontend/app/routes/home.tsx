import type { Route } from "./+types/home";

import HeroSection from "~/sections/HeroSection";
import EducationSection from "~/sections/EducationSection";
import ColumnSection from "~/sections/ColumnSection";
import LanguageSection from "~/sections/LanguageSection";
import PublicationSection from "~/sections/PublicationSection";
import ExperienceSection from "~/sections/ExperienceSection";
import SoftSkillsSection from "~/sections/SoftSkillsSection";
import ReferencesSection from "~/sections/ReferencesSection";
import InterestsSection from "~/sections/InterestsSection";
import SkillsSection from "~/sections/SkillsSection";
import CertificatesSection from "~/sections/CertificatesSection";
import Navbar from "~/components/Navbar";

// Optionally add meta tags for SEO (if your setup supports it)
export function meta() {
  return [
    { title: import.meta.env.VITE_CV_TITLE || "CV Website" },
    { name: "description", content: "CV website for owner-supplied information." },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EducationSection id="education" />
      <ReferencesSection id="references" />
      <ExperienceSection id="experience" />
      <ColumnSection leftRatio={1} rightRatio={2}>
        <SoftSkillsSection id="skills" />
        <LanguageSection id="languages" />
      </ColumnSection>
      <PublicationSection id="publications" />
      <InterestsSection id="interests" />
      <SkillsSection id="tech-skills" />
      <CertificatesSection id="certificates" />
    </>
  );
}
