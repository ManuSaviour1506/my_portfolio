import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Github, Linkedin, Instagram, Globe } from "lucide-react";

// 1. Import your photo
import manuPhoto from '../assets/new_01.png'; 

const Contact = () => {
  const email = "manusaviour5@gmail.com";
  
  const texts = [
    "Building scalable systems.",
    "Designing AI-driven solutions.",
    "Engineering real-world impact.",
    "Creating production-grade applications."
  ];

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayText(texts[index].substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);
        if (subIndex + 1 === texts[index].length) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        setDisplayText(texts[index].substring(0, subIndex - 1));
        setSubIndex(subIndex - 1);
        if (subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 border-t border-zinc-900 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[12vw] md:text-[6vw] font-black tracking-tighter leading-none uppercase mb-12 md:mb-20 text-center"
        >
          Let's create <br />
          <span className="text-zinc-500 italic font-serif lowercase">something real.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* --- LEFT SIDE: THE CARD --- */}
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-lg group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-[#0B0B0C] shadow-2xl flex flex-col">
              
              {/* 🖼️ IMAGE CONTAINER */}
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden">
                <img
                  src={manuPhoto}
                  alt="Manu Saviour"
                  className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                />
                {/* Mobile Gradient (Heavier on bottom to support text) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0B0B0C]" />
                
                {/* 🖥️ SYSTEM HUD (Repositioned for Mobile) */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-right space-y-2 md:space-y-3 pointer-events-none">
                  <div className="space-y-0">
                    <h3 className="text-lg md:text-4xl font-black text-white uppercase tracking-tighter leading-none">
                      MANU <span className="text-zinc-500">SAVIOUR</span>
                    </h3>
                    <p className="text-[10px] md:text-[15px] font-mono text-emerald-400 uppercase tracking-[0.2em]">
                      System_Architect.exe
                    </p>
                  </div>

                  <div className="flex flex-col items-end font-mono text-[10px] md:text-[15px] text-zinc-400 uppercase tracking-widest space-y-1">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-zinc-600">LOC:</span> 16.54° N <Globe size={10} />
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-zinc-600">TME:</span> {time}
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-emerald-500 animate-pulse">Available</span>
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 🧠 INFO PANEL (Structured for Mobile) */}
              <div className="p-6 md:absolute md:bottom-8 md:left-8 md:right-8 md:p-0 bg-[#0B0B0C] md:bg-transparent">
                <div className="flex flex-wrap gap-4 md:gap-6 mb-4 text-[14px] text-zinc-400 font-mono uppercase tracking-widest border-b border-white/5 pb-4">
                  <span><span className="text-white font-bold">10+</span> Projects</span>
                  <span><span className="text-white font-bold">5+</span> Deployments</span>
                  <span><span className="text-white font-bold">03+</span> Clients</span>
                </div>

                <div className="min-h-[40px] mt-3 text-sm md:text-base text-emerald-400 font-mono flex items-center gap-2 drop-shadow-[0_0_6px_rgba(46,188,116,0.4)]">
                  <span className="text-zinc-500 text-xs">AI //</span>
                  <span className="tracking-tight">{displayText}</span>
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-[6px] h-[14px] bg-emerald-400" />
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:hidden">
                    {["MERN", "ML", "JAVA", "AI"].map((skill) => (
                      <span key={skill} className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-zinc-400">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTACT ACTIONS --- */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4">
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Connect_Protocol</p>
              <button 
                onClick={copyEmail}
                className="w-full group flex items-center justify-between p-5 md:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all text-left"
              >
                <div className="overflow-hidden">
                  <p className="text-zinc-500 text-[10px] font-mono uppercase mb-1">Send an Email</p>
                  <p className="text-lg md:text-2xl font-bold text-white truncate">{email}</p>
                </div>
                <Copy size={20} className="text-zinc-600 group-hover:text-emerald-400 shrink-0 ml-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/in/manu-saviour-36a08429a/", icon: <Linkedin size={18} /> },
                { name: "GitHub", url: "https://github.com/ManuSaviour1506", icon: <Github size={18} /> },
                { name: "Instagram", url: "https://www.instagram.com/mannuu._.15/", icon: <Instagram size={18} /> },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-zinc-500 text-zinc-400 hover:text-white transition-all"
                >
                  {social.icon}
                  <span className="text-xs font-bold uppercase tracking-widest">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
