import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Globe, ShieldCheck, Activity, Layers } from "lucide-react";
import gsap from "gsap";

// --- SKILLS DATA & CONFIG ---
const skills = [
  { id: "java", label: "Java", x: 20, y: 35, category: "backend", description: "Core Java and backend development with hands-on projects", metric: "Project experience" },
  { id: "spring", label: "Spring Boot", x: 40, y: 15, category: "backend", description: "Currently learning Spring Boot for building REST APIs", metric: "Learning in progress" },
  { id: "ml", label: "Machine Learning", x: 70, y: 25, category: "ml", description: "Built ML models using supervised & unsupervised learning", metric: "Academic & project work" },
  { id: "dl", label: "Deep Learning", x: 85, y: 55, category: "ml", description: "Worked on neural network-based projects", metric: "Project experience" },
  { id: "concurrency", label: "Concurrency", x: 30, y: 75, category: "systems", description: "Currently learning multithreading and concurrency concepts", metric: "Beginner" },
  { id: "sql", label: "SQL / NoSQL", x: 55, y: 70, category: "data", description: "Database design and queries used in projects", metric: "Project experience" },
  { id: "redis", label: "Redis", x: 15, y: 65, category: "systems", description: "Exploring Redis for caching and performance optimization", metric: "Learning in progress" },
  { id: "python", label: "Python", x: 60, y: 45, category: "ml", description: "Used for ML projects, data handling, and scripting", metric: "Project experience" },
];

const connections = [
  ["java", "spring"], ["spring", "redis"], ["spring", "sql"],
  ["ml", "dl"], ["ml", "python"], ["python", "dl"],
  ["java", "concurrency"], ["concurrency", "redis"],
  ["sql", "python"], ["spring", "ml"],
];

const categoryColors = {
  backend: "hsl(152, 68%, 45%)",
  ml: "hsl(38, 92%, 55%)",
  systems: "hsl(200, 70%, 50%)",
  data: "hsl(280, 60%, 55%)",
};

// --- SUB-COMPONENT: SYSTEM RESUME OVERLAY ---
const ResumeModal = ({ isOpen, onClose, url }) => {
  const cardRef = useRef(null);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isOpen) {
      setProgress(100);
      const startTime = Date.now();
      const duration = 3000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          onClose();
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isOpen, onClose]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 15, rotateX: y * -15, duration: 0.5 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-[#050505]/95 backdrop-blur-[30px] cursor-zoom-out"
          />
          
          <motion.div
            initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => gsap.to(cardRef.current, { rotateX: 0, rotateY: 0 })}
          >
            <div ref={cardRef} className="w-full h-full bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-zinc-950/40">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
                    Protocol: MANU_CV.v2 // {Math.floor(progress / 20)}s Remaining
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <a href={url} download className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <Download size={14} /> <span className="text-[10px] font-mono uppercase">Get_Local</span>
                  </a>
                  <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white hover:bg-red-500/20 transition-all"><X size={16}/></button>
                </div>
              </div>
              <div className="flex-grow bg-[#f4f4f4] relative group">
                <iframe src={`${url}#toolbar=0&view=FitH`} className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity" title="Resume" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const [activeNode, setActiveNode] = useState("spring");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const activeSkill = skills.find((s) => s.id === activeNode);

  // --- AUTO-ROTATION ENGINE (5 Seconds) ---
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveNode((current) => {
        const currentIndex = skills.findIndex((s) => s.id === current);
        const nextIndex = (currentIndex + 1) % skills.length;
        return skills[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause rotation when user interacts
  const handleNodeClick = (id) => {
    setActiveNode(id);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden px-4 md:px-6 py-20 md:py-24">
      
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} url="/resume.pdf" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* Title Section */}
        <motion.div
          className="text-center mb-12 md:mb-20 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="text-[12vw] md:text-[6vw] font-black tracking-[-0.04em] leading-none uppercase">
            <span className="text-white">MANU</span> <span className="text-zinc-700">SAVIOUR</span>
          </h1>

          <h2 className="text-lg md:text-3xl font-semibold tracking-tight text-zinc-200 max-w-2xl leading-tight">
            Building scalable systems across <span className="text-emerald-400 italic">Java, Machine Learning & Full Stack</span>
          </h2>

          <p className="text-sm md:text-base text-zinc-500 max-w-xl leading-relaxed">
            Focused on designing production-grade applications, AI-driven systems, and high-performance backend architectures.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-emerald-400 animate-pulse'}`}></span>
              {isPaused ? 'Manual Override' : 'System Syncing'}
            </span>
            <span>|</span><span>• Java • Python </span><span>|</span><span>Full Stack • AI</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
            <a href="#work" className="px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl bg-white text-black hover:bg-zinc-200 transition">View Work</a>
            <button onClick={() => setIsResumeOpen(true)} className="px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open_Resume.sys
            </button>
            <a href="/resume.pdf" download className="px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition flex items-center gap-2">
              <Download size={14} /> Download
            </a>
          </div>
        </motion.div>

        {/* Neural Graph Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/3 flex flex-col justify-center min-h-[180px] md:min-h-[250px] order-2 md:order-1">
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 border-l-2 pl-6" style={{ borderColor: categoryColors[activeSkill.category] }}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{activeSkill.label}</h3>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full text-white font-bold" style={{ background: categoryColors[activeSkill.category] }}>{activeSkill.metric}</span>
                  </div>
                  <p className="text-zinc-400 text-sm md:text-xl leading-relaxed max-w-sm">{activeSkill.description}</p>
                  
                  {/* AUTO-ROTATE PROGRESS BAR */}
                  {!isPaused && (
                    <div className="w-32 h-[2px] bg-zinc-900 mt-4 overflow-hidden">
                       <motion.div 
                        key={activeSkill.id}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-white/20"
                       />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full md:w-2/3 aspect-[1/1] md:aspect-video order-1 md:order-2">
            <svg viewBox="0 0 100 85" className="w-full h-full touch-none overflow-visible">
              {connections.map(([from, to]) => {
                const a = skills.find((s) => s.id === from);
                const b = skills.find((s) => s.id === to);
                const isActive = activeNode === from || activeNode === to;
                return (
                  <line key={`${from}-${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={isActive ? categoryColors[a.category] : "#27272a"} strokeWidth={isActive ? 0.4 : 0.08} strokeOpacity={isActive ? 1 : 0.3} className="transition-all duration-500" />
                );
              })}
              {skills.map((skill) => {
                const isActive = activeNode === skill.id;
                const color = categoryColors[skill.category];
                return (
                  <g key={skill.id} className="cursor-pointer" onClick={() => handleNodeClick(skill.id)}>
                    <text x={skill.x} y={skill.y - 7} textAnchor="middle" fill={isActive ? color : "white"} fillOpacity={isActive ? 1 : 0.5} fontSize={isActive ? 4 : 2.8} fontWeight={isActive ? "900" : "500"} className="transition-all duration-300 pointer-events-none">{skill.label}</text>
                    <circle cx={skill.x} cy={skill.y} r={isActive ? 4.5 : 2.2} fill={isActive ? color : "transparent"} stroke={isActive ? color : "#3f3f46"} strokeWidth={isActive ? 0.8 : 0.3} strokeOpacity={isActive ? 1 : 0.7} className="transition-all duration-300" style={{ filter: isActive ? `drop-shadow(0 0 15px ${color})` : "none" }} />
                    {isActive && !isPaused && (
                       <circle cx={skill.x} cy={skill.y} r="6" fill="none" stroke={color} strokeWidth="0.2" className="animate-ping" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
