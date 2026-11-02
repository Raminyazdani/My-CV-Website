// components/Navbar.tsx
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const links = [
  { id: "education", label: "Education" },
  { id: "references", label: "References" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Soft Skills" },
  { id: "languages", label: "Languages" },
  { id: "publications", label: "Publications" },
  { id: "interests", label: "Interests" },
  { id: "tech-skills", label: "Tech Skills" },
  { id: "certificates", label: "Certificates" },
];

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <NavigationMenu className="mx-auto px-4 py-3 max-w-7xl">
        <NavigationMenuList className="flex flex-wrap gap-3">
          {links.map((link) => (
            <NavigationMenuItem key={link.id}>
              <a
                href={`#${link.id}`}
                className={navigationMenuTriggerStyle()}
              >
                {link.label}
              </a>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
