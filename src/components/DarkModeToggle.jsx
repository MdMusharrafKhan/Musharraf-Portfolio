import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:scale-110 transition-transform animate-fade-in delay-100"
      >
        {darkMode ? (
          <Moon className="w-10 h-6 text-gray-800 dark:text-gray-200" />
        ) : (
          <Sun className="w-10 h-6 text-orange-500" />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <span
          className="absolute -bottom-10 left-1/2 -translate-x-1/2
                     bg-black text-white text-xs px-3 py-1 rounded-md
                     whitespace-nowrap shadow-lg"
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </div>
  );
}
