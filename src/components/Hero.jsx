import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import DSC from "../assets/DSC.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative flex flex-col justify-center gap-20 md:flex-row items-center md:text-left px-8 py-20 
   text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-30 animate-[gridmove_7s_linear_infinite]"
      style={{backgroundImage: `linear-gradient(to right, rgba(79,70,229,0.3) 2px, transparent 2px),
        linear-gradient(to bottom, rgba(79,70,229,0.3) 2px, transparent 2px)
      `, backgroundSize: "40px 40px",}}>
      </div>
    
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 z-10">

    <h2 className="text-5xl md:text-7xl font-bold mb-4">Hi, I'm <br />
    <span className="inline-block bg-gradient-to-r from-indigo-600 via-orange-600 to-purple-400 
            bg-clip-text text-transparent font-bold 
            animate-[gradient_4s_linear_infinite] 
            hover:scale-105 transition-transform cursor-pointer"
            style={{ backgroundSize: "500% 300%" }}
    >
      Musharraf
    </span>

      <motion.span
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
      transition={{ duration: 1.2, repeat: 2 }} // waves twice on load
      whileHover={{
        rotate: [0, 20, -20, 20, -20, 0],
        transition: { duration: 0.6 }
      }}
      className="inline-block cursor-pointer"
    >
      👋
    </motion.span>

    
    </h2>
        <p className="text-lg md:text-xl mb-6">
          A passionate Developer specializing in ReactJS, Python, and C++.
        </p>
        <div className="flex gap-4 justify-start  md:justify-start md:gap-6">
          <a
            href="https://github.com/mdmusharrafkhan"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="w-7 h-7 md:w-12 md:h-12 hover:text-gray-500 dark:hover:text-indigo-400" />
          </a>
          <a
            href="https://linkedin.com/in/mdmusharrafkhan"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="w-7 h-7 md:w-12 md:h-12 hover:text-indigo-700 dark:hover:text-indigo-400" />
          </a>
          <a href="mailto:mdmusharrafk@gmail.com">
            <Mail className="w-7 h-7 md:w-12 md:h-12 hover:text-green-600 dark:hover:text-indigo-400" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-10 md:mt-0 md:ml-12 object-right"
      >
      <img
          src={DSC}
          alt="profile"
          className="relative z-10 rounded-full 
                    w-[250px] h-[250px]   // mobile
                    sm:w-[220px] sm:h-[220px]  // small screens
                    md:w-[240px] md:h-[240px]  // medium screens
                    lg:w-[240px] lg:h-[300px]  // large screens
                    border-4 border-white dark:border-gray-700 shadow-lg 
                    hover:scale-105 transition-transform cursor-pointer"
      />
      </motion.div>
    </section>

  );
}
