import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const canvas = document.getElementById("tech-network");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 70;
    const maxDistance = 120;

    const mouse = { x: null, y: null, radius: 150 };

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: 2 + Math.random() * 2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.strokeStyle = `rgba(50, 150, 255, ${1 - dist / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse if in range
        if (mouse.x !== null && mouse.y !== null) {
          const dxm = n1.x - mouse.x;
          const dym = n1.y - mouse.y;
          const distMouse = Math.sqrt(dxm * dxm + dym * dym);
          if (distMouse < mouse.radius) {
            ctx.strokeStyle = `rgba(255, 100, 150, ${1 - distMouse / mouse.radius})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.fillStyle = "rgba(0, 200, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx = -n.vx;
        if (n.y < 0 || n.y > height) n.vy = -n.vy;
      });

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Tech network canvas */}
      <canvas
        id="tech-network"
        className="absolute inset-0 w-full h-full"
      ></canvas>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray/30 dark:bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[90%] auto-x px-6">
        <h2 className="text-4xl md:text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg md:text-xl leading-relaxed md:leading-8 text-justify py-5 md:backdrop-blur-1">

          Hi, I’m <span className="font-semibold"> Mohammed Musharraf Khan</span> 👋, a Computer Science graduate and a problem solver passionate about turning ideas into impactful digital solutions. I have hands-on experience in full-stack development, cloud technologies, AI-driven applications, and solid foundations in Data Structures and Algorithms, which help me write optimized and scalable code. <br /> <br /> I’ve built end-to-end applications like a real-time chat application, an AI-powered music recommendation system, an attendance management system, and even this portfolio itself. <br/> <br/>I thrive on learning new technologies, writing clean and efficient code, and building solutions that blend innovation with usability. My goal is to grow as a developer while contributing to projects that make a real difference. I’m always curious to learn, explore new tools, and take on challenges that push me to grow. Beyond coding, I’m passionate about solving problems, experimenting with projects, and creating digital experiences that make an impact.
        </p>
      </div>
    </section>
  );
}
