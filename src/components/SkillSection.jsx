import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Cpu, Code2, Database, Globe, 
  Terminal, Zap, Brain 
} from "lucide-react";

const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend Development",
    color: "#3b82f6",
    desktopPos: "lg:top-[15%] lg:left-[8%]",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "API Integration"]
  },
  {
    id: "backend",
    title: "Backend (Java)",
    color: "#10b981",
    desktopPos: "lg:top-[15%] lg:right-[8%]",
    skills: ["Java", "OOP Concepts", "JDBC", "Spring Boot", "REST API", "MVC"]
  },
  {
    id: "ml",
    title: "Machine Learning",
    color: "#a855f7",
    desktopPos: "lg:bottom-[20%] lg:left-[8%]",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Supervised Learning","Deep Learning Basics", "TensorFlow","Keras",
  "OpenCV",
  "MediaPipe",]
  },
  {
    id: "systems",
    title: "Systems & Databases",
    color: "#f59e0b",
    desktopPos: "lg:bottom-[20%] lg:right-[8%]",
    skills: ["SQL","Mongo DB", "Database Design", "Redis", "Concurrency"]
  }
];

const INVENTORY = [
  "React", "Node.js", "Express", "MongoDB",
  "Java", "Spring Boot", "MySQL",
  "Python", "FastAPI", "Scikit-learn",
  "TensorFlow", "OpenCV", "MediaPipe",
  "Docker", "Git", "REST API",
  "Tailwind CSS", "Vercel", "Render"
];

const SkillSection = () => {
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <section id="skills" className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-24 px-6">
      
      {/* Background Star Field */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CONTAINER: 
          On Mobile: Flex Column (Auto height)
          On Laptop: Fixed Height (800px) to anchor absolute children 
      */}
     <div className="relative w-full max-w-7xl flex flex-col items-center gap-16">
        
        {/* --- CENTRAL CORE: PERFECTLY CENTERED ON LAPTOP --- */}
        <motion.div 
          className="relative z-20 flex flex-col items-center gap-6 group 
                     mb-20 lg:mb-0 
                     lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <div className="relative">
            {/* Ambient Glow */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-white blur-[100px] rounded-full"
            />
            {/* Brain Circle */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-3xl">
              <Brain size={60} className="text-white group-hover:text-emerald-400 transition-colors duration-700" />
              <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Build Log
            </h3>
            <p className="text-[15px] md:text-5xs font-mono text-zinc-500 tracking-[0.6em] uppercase mt-4">
              Systems • AI • Web
            </p>
          </div>
        </motion.div>

        {/* --- SKILL GROUPS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:contents gap-10 w-full">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              className={`relative lg:absolute z-10 p-6 rounded-3xl border border-white/5 lg:border-none 
                         bg-white/[0.02] lg:bg-transparent transition-all duration-500 ${group.desktopPos}`}
              onMouseEnter={() => setActiveGroup(group.id)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <div className="flex flex-col gap-5">
                {/* Title and Progress Bar */}
                <div className="flex flex-col gap-2">
                   <span 
                    className="text-[13px] font-bold uppercase tracking-[0.4em] transition-colors"
                    style={{ color: activeGroup === group.id ? group.color : '#eeeeeeff' }}
                   >
                    {group.title}
                   </span>
                   <div className="h-[1.5px] w-full bg-zinc-800 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: activeGroup === group.id ? "100%" : "0%" }}
                        className="h-full absolute top-0 left-0"
                        style={{ backgroundColor: group.color }}
                      />
                   </div>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2 max-w-full lg:max-w-[300px]">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all duration-300
                        ${activeGroup === group.id 
                          ? 'border-white/20 text-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                          : 'border-white/5 text-zinc-600'}`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- INFINITE SCROLL DOCK --- */}
     <div className="mt-20 lg:absolute lg:bottom-10 left-0 right-0 flex flex-col items-center gap-6 w-full px-4">

  {/* HEADER */}
  <div className="flex items-center gap-4 opacity-40">
    <div className="h-px w-10 bg-zinc-700" />
    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.6em]">
      Tech Stack
    </span>
    <div className="h-px w-10 bg-zinc-700" />
  </div>

  {/* SCROLLER */}
  <div className="relative w-full max-w-5xl overflow-hidden 
                  [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">

    <motion.div
      className="flex gap-6 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...INVENTORY, ...INVENTORY].map((tech, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-zinc-900 border border-zinc-800 text-zinc-400 
                     text-xs font-medium hover:text-white hover:border-white/20 
                     transition-all cursor-default"
        >
          {/* dot indicator */}
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>

          {/* tech name */}
          {tech}
        </div>
      ))}
    </motion.div>

  </div>
</div>

      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-blue-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-[40%] bg-emerald-500/5 blur-[120px] -z-10" />
    </section>
  );
};

export default SkillSection;