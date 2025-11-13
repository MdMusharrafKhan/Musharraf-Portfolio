import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Import icons
import {
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiPython,
  SiMysql,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGithub,
} from "react-icons/si";
import { FaCode, FaAws } from "react-icons/fa"; // fallback for C

// Skill list with icons and colors
const skills = [
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "C", icon: FaCode, color: "#A8B9CC" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "SQL", icon: SiMysql, color: "#00758F" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
];

export default function Skills() {
  const controls1 = useAnimation(); // first row
  const controls2 = useAnimation(); // second row
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const doubledSkills = [...skills, ...skills];

  // IntersectionObserver to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsActive(true);
          else {
            setIsActive(false);
            controls1.stop();
            controls2.stop();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [controls1, controls2]);

  // Start animations when section is visible
  useEffect(() => {
    if (isActive) {
      controls1.start({
        x: ["0%", "-80%"],
        transition: { repeat: Infinity, duration: 20, ease: "linear" },
      });
      controls2.start({
        x: ["-80%", "0%"],
        transition: { repeat: Infinity, duration: 20, ease: "linear" },
      });
    }
  }, [isActive, controls1, controls2]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl md:text-4xl font-bold text-center mb-12 dark:text-gray-300">
        Skills
      </h2>

      {/* Desktop / Tablet */}
      <div className="hidden md:block overflow-hidden max-w-[90%] mx-auto px-8 py-8 space-y-6">
        {/* First Row */}
        <motion.div
          className="flex gap-6"
          animate={controls1}
          onMouseEnter={() => controls1.stop()}
          onMouseLeave={() =>
            isActive &&
            controls1.start({
              x: ["0%", "-80%"],
              transition: { repeat: Infinity, duration: 20, ease: "linear" },
            })
          }
        >
          {doubledSkills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.15,
                  y: -4,
                  
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[160px] h-32 flex flex-col items-center justify-center 
                  text-lg font-semibold border border-gray-300 dark:border-gray-600 
                  rounded-2xl cursor-pointer select-none
                  transition-colors duration-200 bg-white dark:bg-gray-800"
              >
                <Icon
                  className={skill.name === "SQL" ? "w-11 h-10 mb-0 pb-0" : "w-7 h-7 mb-2"}
                  style={{ color: skill.color }}
                />
                <span
                  className={`text-center ${
                    skill.name === "SQL"
                      ? "text-lg pb-2 mb-0 text-indigo-600 dark:text-indigo-400"
                      : "text-indigo-600 dark:text-indigo-400"
                  }`}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Second Row */}
        <motion.div
          className="flex gap-6"
          animate={controls2}
          onMouseEnter={() => controls2.stop()}
          onMouseLeave={() =>
            isActive &&
            controls2.start({
              x: ["-80%", "0%"],
              transition: { repeat: Infinity, duration: 20, ease: "linear" },
            })
          }
        >
          {doubledSkills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.15,
                  y: -4,
                  
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[160px] h-32 flex flex-col items-center justify-center 
                  text-lg font-semibold border border-gray-300 dark:border-gray-600 
                  rounded-2xl cursor-pointer select-none
                  transition-colors duration-200 bg-white dark:bg-gray-800"
              >
                <Icon
                  className={skill.name === "SQL" ? "w-11 h-10 mb-0 pb-0" : "w-7 h-7 mb-2"}
                  style={{ color: skill.color }}
                />
                <span
                  className={`text-center ${
                    skill.name === "SQL"
                      ? "text-lg pb-2 mb-0 text-indigo-600 dark:text-indigo-400"
                      : "text-indigo-600 dark:text-indigo-400"
                  }`}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-6 space-y-4 overflow-hidden max-w-[95%] mx-auto">
        {/* First Row */}
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-80%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          whileHover={{ x: 0 }}
        >
          {doubledSkills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 0.95, backgroundColor: "#DCDCDC", color: "#fff" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[130px] h-20 flex flex-col items-center justify-center 
                  text-base font-semibold bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600 
                  rounded-xl shadow-md cursor-pointer select-none
                  transition-colors duration-300"
              >
                <Icon
                  className={skill.name === "SQL" ? "w-8 h-8 mb-1" : "w-6 h-6 mb-1"}
                  style={{ color: skill.color }}
                />
                <span className="text-center">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Second Row */}
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["-80%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          whileHover={{ x: 0 }}
        >
          {doubledSkills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 0.95, backgroundColor: "#DCDCDC", color: "#fff" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[130px] h-20 flex flex-col items-center justify-center 
                  text-base font-semibold bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600 
                  rounded-xl shadow-md cursor-pointer select-none
                  transition-colors duration-300"
              >
                <Icon
                  className={skill.name === "SQL" ? "w-8 h-8 mb-1" : "w-6 h-6 mb-1"}
                  style={{ color: skill.color }}
                />
                <span className="text-center">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
