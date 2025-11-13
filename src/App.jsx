// App.js
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* ------------------ Variants ------------------ */

// Parent container variant (stagger)
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.45 } },
};

// Child fade-up variant
const childFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.45, ease: "easeIn" } },
};

/* ------------------ Section wrapper ------------------
   - Observes when the section crosses the threshold.
   - Sets `inView` true/false and maps it to animate="visible"/"exit".
   - Hysteresis prevents flicker: section becomes visible at threshold,
     but only considered not-visible after it drops below half the threshold.
*/
function Section({
  children,
  variants = container,
  threshold = 0.28,
  className = "",
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use many thresholds to get a smooth intersectionRatio
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          if (ratio >= threshold) {
            setInView(true);
          } else if (ratio <= threshold * 0.5) {
            // only flip to false when it has gone well below threshold
            setInView(false);
          }
        });
      },
      { threshold: thresholds }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "exit"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ------------------ App ------------------ */

function App() {
  return (
    <div className="bg-gray-50 w-full dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans scroll-smooth">
      <Header />

      {/* Hero */}
      <Section variants={container} className="space-y-6">
        <motion.div variants={childFadeUp}>
          <Hero />
        </motion.div>
      </Section>

      {/* About */}
      <Section variants={container} className="space-y-6">
        <motion.div variants={childFadeUp}>
          <About />
        </motion.div>
      </Section>

      {/* Skills */}
      <Section variants={container} className="space-y-6">
        <motion.div variants={childFadeUp}>
          <Skills />
        </motion.div>
      </Section>

      {/* Projects */}
      <Section variants={container} className="space-y-6">
        <motion.div variants={childFadeUp}>
          <Projects />
        </motion.div>
      </Section>

      {/* Contact */}
      <Section variants={container} className="space-y-6">
        <motion.div variants={childFadeUp}>
          <Contact />
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
}

export default App;
