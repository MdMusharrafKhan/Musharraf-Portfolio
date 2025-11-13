import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // lightweight icons
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.7 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <header className="flex  justify-between items-center px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b-0 font-mono">
      {/* Logo / Name */}
      <a href="Hero.jsx" className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform cursor-pointer">
       Musharraf Khan
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-7 font-semibold justify-center relative text-xx  ">
        {navLinks.map((link) => (
          <div key={link.id} className="relative">
            <a
              href={`#${link.id}`}
              className={`transition-colors ${
                activeSection === link.id
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:underline transition duration-500 ease-in-out decoration-wavy dark:hover:text-indigo-400"
              }`}
            >
              {link.label}
            </a>
            {activeSection === link.id && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
            )}
          </div>
        ))}
      </nav>

      {/* Dark Mode + Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center py-6 md:hidden z-40">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)} // close menu on click
              className={`py-2 text-lg font-bold ${
                activeSection === link.id
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
