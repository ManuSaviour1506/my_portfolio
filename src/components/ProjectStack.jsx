import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingLines from "./FloatingLines";
import { 
  Terminal, 
  Globe, 
  Layers, 
  Activity, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  RotateCw, 
  Plus 
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Khel Pratibha",
    category: "AI / Computer Vision",
    description: "AI-powered sports talent assessment platform that analyzes athlete performance using computer vision and pose estimation. Generates real-time scores, feedback, and leaderboard rankings using a scalable microservices architecture.",
    url: "https://aisportsassessment.vercel.app/",
    github: "https://github.com/ManuSaviour1506/clientfinalsih.git",
    logs: [
      "[UPLOAD] Video received...",
      "[ML] Pose estimation running (MediaPipe)...",
      "[ANALYSIS] Frame-by-frame processing...",
      "[SCORE] AI scoring generated...",
      "[RESULT] Leaderboard updated..."
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "Python FastAPI",
      "MediaPipe",
      "OpenCV",
      "MongoDB Atlas",
      "Docker",
      "ImageKit CDN"
    ],
    color: "#a855f7",
    image: "https://res.cloudinary.com/ddgfjerss/image/upload/v1774201358/Screenshot_2026-03-22_at_10.20.23_PM_zjlbke.png"
  },

  {
    id: 2,
    title: "New Generation School CMS",
    category: "Full Stack / CMS",
    description: "Production-grade CMS-based school platform enabling administrators to dynamically manage content, announcements, and media. Built with scalable MERN architecture and deployed with custom domain integration.",
    url: "https://newgenerationeluru.com",
    github: "https://github.com/ManuSaviour1506/newgeneration.git",
    logs: [
      "[INIT] CMS system booting...",
      "[DB] MongoDB connected...",
      "[API] Content services active...",
      "[UI] Dynamic rendering enabled...",
      "[DEPLOY] Live with custom domain"
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Vercel",
      "Render"
    ],
    color: "#3b82f6",
    image: "https://res.cloudinary.com/ddgfjerss/image/upload/v1774199682/Screenshot_2026-03-22_at_9.58.38_PM_hfzt4m.png"
  },

  {
    id: 3,
    title: "Anurag EM School Platform",
    category: "Full Stack Web",
    description: "Scalable school management web platform with CMS capabilities for managing students, staff, and institutional updates. Designed for performance and real-world usage.",
    url: "https://anuragschool.com",
    github: "https://github.com/ManuSaviour1506/Anurag-em-school.git",
    logs: [
      "[SYSTEM] Platform initializing...",
      "[API] Backend services running...",
      "[CMS] Admin dashboard active...",
      "[DATA] Content synchronized...",
      "[STATUS] Production live"
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Vercel",
      "Render"
    ],
    color: "#10b981",
    image: "https://res.cloudinary.com/ddgfjerss/image/upload/v1774200106/Screenshot_2026-03-22_at_9.58.55_PM_gpxabg.png"
  },

  {
    id: 4,
    title: "Medease",
    category: "HealthTech / Community",
    description: "Smart medication reminder platform built after surveying 50+ households. Enables caregivers to schedule alerts for elderly patients, improving medication adherence and reducing health risks.",
    url: "https://medease-psi.vercel.app/login",
    github: "https://github.com/ManuSaviour1506/cspmedicine.git",
    logs: [
      "[USER] Caregiver logged in...",
      "[SCHEDULE] Medication timings set...",
      "[ALERT] Reminder triggered...",
      "[SYNC] Data updated...",
      "[STATUS] System active"
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Vercel"
    ],
    color: "#f43f5e",
    image: "https://res.cloudinary.com/ddgfjerss/image/upload/v1774199714/Screenshot_2026-03-22_at_10.05.59_PM_cmzbra.png"
  },

  {
    id: 5,
    title: "Mamatha School CMS",
    category: "Social Impact / Web",
    description: "CMS-based web platform developed as a free service for a rural education institution. Enables non-technical administrators to manage content, media, and updates independently.",
    url: "https://mamathaschool.vercel.app/",
    github: "https://github.com/ManuSaviour1506/mamathaschool.git",
    logs: [
      "[LOAD] Assets initialized...",
      "[CMS] Admin panel ready...",
      "[CONTENT] Updates applied...",
      "[DEPLOY] Live on Vercel...",
      "[IMPACT] Supporting rural education"
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Vercel",
      "Render"
    ],
    color: "#f59e0b",
    image: "https://res.cloudinary.com/ddgfjerss/image/upload/v1774201642/Screenshot_2026-03-22_at_10.37.12_PM_wpj0kc.png"
  }
];

const ProjectStack = () => {
  const [cards, setCards] = useState(projects);
  const active = cards[0];

  const rotateStack = useCallback(() => {
    setCards((prev) => {
      const newCards = [...prev];
      const firstCard = newCards.shift();
      newCards.push(firstCard);
      return newCards;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(rotateStack, 6000);
    return () => clearInterval(timer);
  }, [rotateStack]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-[#020202] overflow-hidden py-24">
      
      <div className="absolute inset-0 z-0 opacity-40">
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={6}
          lineDistance={10}
          bendRadius={8}
          bendStrength={-0.6}
          interactive={true}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-16 text-center"
      >
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter select-none">
  <span className="text-white">My</span>{" "}
  <span className="italic font-serif font-light text-zinc-400">
    Projects
  </span>
</h2>
        <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24 px-6">
        
        {/* --- LEFT SIDE: THE INTERACTIVE BROWSER VIEWPORT --- */}
<div className="w-full lg:w-3/5 flex flex-col gap-10">

  {/* 🌐 MACBOOK SAFARI BROWSER VIEWPORT */}
  <AnimatePresence mode="wait">
    <motion.div
      key={active.id}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0D0D0E] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
        
        {/* --- SAFARI HEADER --- */}
        <div className="h-12 bg-zinc-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-5 justify-between">
          {/* Mac Window Controls */}
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
          </div>
          
          {/* Address Bar */}
          <div className="flex-grow max-w-md mx-4">
            <div className="bg-black/40 border border-white/5 rounded-lg py-1.5 px-4 flex items-center justify-center gap-2 group cursor-default">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[10px] font-mono text-zinc-400 truncate tracking-tight">
                https://{active.url.replace('https://', '').replace('http://', '')}
              </span>
              <RotateCw size={10} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 w-20 justify-end">
            <ExternalLink size={14} className="text-zinc-500" />
            <Plus size={16} className="text-zinc-500" />
          </div>
        </div>

        {/* --- BROWSER CONTENT / IMAGE --- */}
        <div className="relative group overflow-hidden bg-black aspect-video">
          <a href={active.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8 }}
              src={active.image}
              className="w-full h-full object-cover opacity-60 grayscale-[20%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            
            {/* View Project Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
              <div className="space-y-1">
               
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                 
                </h2>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="p-4 bg-white text-black rounded-full shadow-2xl"
              >
                <ExternalLink size={20} />
              </motion.div>
            </div>
          </a>
        </div>

        {/* --- BROWSER FOOTER / ACTIONS --- */}
        <div className="flex justify-between items-center px-8 py-5 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md">
          <div className="flex gap-6">
            <a href={active.url} target="_blank" className="text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
              <Globe size={14} className="text-emerald-500" /> Site
            </a>
            <a href={active.github} target="_blank" className="text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
              <Github size={14} /> Repository
            </a>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
               <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Environment</span>
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Production // Stable</span>
             </div>
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>

  {/* --- 📊 REAL-TIME SYSTEM METRICS --- */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { label: "Architecture", val: "Microservices", icon: Layers },
      { label: "Latency", val: "< 50ms", icon: Activity },
      { label: "SSL Status", val: "Verified", icon: ShieldCheck },
      { label: "Scale", val: "Edge Ready", icon: Globe }
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.3)" }}
        className="border border-white/5 rounded-2xl p-5 bg-[#0D0D0E] flex flex-col gap-3 transition-colors"
      >
        <item.icon size={16} className="text-zinc-600" />
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-[0.2em]">
            {item.label}
          </p>
          <p className="text-white text-sm font-bold mt-1 tracking-tight">
            {item.val}
          </p>
        </div>
      </motion.div>
    ))}
  </div>

  {/* --- 🧠 PROJECT SPECS --- */}
  <AnimatePresence mode="wait">
    <motion.div
      key={active.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 px-2"
    >
      <div className="h-px w-full bg-gradient-to-r from-emerald-500/20 via-zinc-800 to-transparent" />
      
      <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium">
        {active.description}
      </p>

      {/* TECH STACK CHIPS */}
      <div className="flex flex-wrap gap-2">
        {active.tech.map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 font-bold uppercase tracking-widest hover:border-emerald-500/30 hover:text-white transition-all cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  </AnimatePresence>

</div>

        {/* --- RIGHT SIDE: THE 3D STACK --- */}
        <div className="w-full lg:w-2/5 flex flex-col gap-10">
<div className="relative w-full max-w-xl mx-auto space-y-4">

  <AnimatePresence mode="popLayout">
    {cards.slice(0, 3).map((project, index) => {
      const isTop = index === 0;

      return (
        <motion.div
          key={project.id}
          onClick={isTop ? undefined : rotateStack}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1 - index * 0.3,
            y: index * 12,
            scale: 1 - index * 0.03,
          }}
          transition={{ duration: 0.4 }}
          className={`w-full rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-5 md:p-6 transition ${
            isTop ? "shadow-lg cursor-default" : "cursor-pointer"
          }`}
          style={{
            zIndex: 10 - index
          }}
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                {project.category}
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-white mt-1">
                {project.title}
              </h3>
            </div>

            {/* STATUS */}
            {isTop && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                Active
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          {isTop && (
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              {project.description}
            </p>
          )}

          {/* TECH STACK */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          {isTop && (
            <div className="flex gap-4 mt-5">
              <a
                href={project.url}
                target="_blank"
                className="text-sm text-white hover:underline flex items-center gap-1"
              >
                View Project <ExternalLink size={14} />
              </a>

              <a
                href={project.github}
                target="_blank"
                className="text-sm text-zinc-400 hover:text-white flex items-center gap-1"
              >
                GitHub <Github size={14} />
              </a>
            </div>
          )}
        </motion.div>
      );
    })}
  </AnimatePresence>

</div>

          {/* RUNTIME CONSOLE */}
       <div className="w-full rounded-[2rem] bg-black/50 backdrop-blur-xl border border-white/5 p-5 md:p-6 font-mono text-[11px] md:text-xs h-[190px] relative overflow-hidden shadow-inner">

  {/* 🌈 Glow */}
  <div
    className="absolute inset-0 opacity-10 blur-2xl"
    style={{ background: active.color }}
  />

  {/* HEADER */}
  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 relative z-10">
    <div className="flex items-center gap-2">
      <Terminal size={14} className="text-emerald-400" />
      <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold">
        Runtime Console
      </span>
    </div>

    {/* 🟢 LIVE */}
    <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-bold">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      LIVE
    </div>
  </div>

  {/* TERMINAL BODY */}
  <div className="space-y-1 relative z-10 h-[130px] overflow-hidden">
    <AnimatePresence mode="popLayout">
      {active.logs.map((log, i) => (
        <motion.p
          key={`${active.id}-${i}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center gap-2 ${
            i === active.logs.length - 1
              ? "text-emerald-400"
              : "text-zinc-500"
          }`}
        >
          {/* Prompt */}
          <span className="text-zinc-700">$</span>

          {/* Log */}
          <span>{log}</span>

          {/* Cursor */}
          {i === active.logs.length - 1 && (
            <span className="w-[6px] h-[12px] bg-emerald-400 animate-pulse ml-1"></span>
          )}
        </motion.p>
      ))}
    </AnimatePresence>
  </div>

  {/* 🔥 Bottom Fade */}
  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />

</div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStack;