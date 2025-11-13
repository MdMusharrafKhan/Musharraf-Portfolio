import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { FaHtml5, FaCss3Alt, FaReact, FaPython, FaNodeJs, FaJsSquare } from "react-icons/fa";
import { SiCplusplus, SiMysql } from "react-icons/si";

export default function Projects() {
  const projects = [
    {
      title: "Attendance Management System",
      desc: "A system built to streamline attendance tracking with automated data handling and reporting.",
      // link: "#",
    },
    {
      title: "Music Recommendation System",
      desc: "A facial recognition-based system recommending music using Python, OpenCV, and ML models.",
      link: "https://github.com/MdMusharrafKhan/Music-Recommendation-Based-on-Facial-Recognition",
    },
  ];

  const techLogos = [FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPython, FaNodeJs, SiCplusplus, SiMysql];

  // Generate 50 floating logos
  const floatingLogos = Array.from({ length: 50 }, (_, i) => {
    const Logo = techLogos[Math.floor(Math.random() * techLogos.length)];
    return <Logo
      key={i}
      className="absolute text-gray-400 dark:text-gray-600"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${20 + Math.random() * 40}px`,
        animation: `floatLogo ${5 + Math.random() * 10}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: 0.7 + Math.random() * 0.3,
      }}
    />;
  });

  return (
    <section
      id="projects"
      className="relative px-8 py-20 max-w-7xl mx-auto dark:text-gray-300 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Floating tech logos */}
      <div className="absolute inset-0 z-0">{floatingLogos}</div>

      {/* Section Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[90%] "
      >
        <h3 className="text-4xl md:text-4xl font-bold text-center mb-12 ">Projects</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <Briefcase className="text-indigo-600 dark:text-indigo-400" /> {p.title}
              </h3>
              <p className="text-gray-600 text-lg dark:text-gray-400 mb-3">{p.desc}</p>
              {(
                <a
                  href={p.link}
                  target="_blank"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
