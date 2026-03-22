import { motion } from "framer-motion";
import { Copy, ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import ProfileCard from './ProfileCard';

// 1. Import your photo from the src/assets folder
import manuPhoto from '../assets/new_01.png'; 

const Contact = () => {
  const email = "manusaviour5@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manu-saviour-36a08429a/", icon: <Linkedin size={20} /> },
    { name: "GitHub", url: "https://github.com/ManuSaviour1506", icon: <Github size={20} /> },
    { name: "Instagram", url: "https://www.instagram.com/mannuu._.15/", icon: <Instagram size={20} /> },
  ];

  return (
    <section id="contact" className="py-32 px-6 border-t border-zinc-900 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[8vw] md:text-[6vw] font-black tracking-tighter leading-none uppercase mb-20 text-center"
        >
          Let's create <br />
          <span className="text-zinc-500 italic font-serif lowercase">something real.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Profile Card */}
<div className="flex justify-center lg:justify-end w-full">

  <div className="relative w-full max-w-md group rounded-[2rem] overflow-hidden border border-zinc-800 bg-[#0B0B0C]">

    {/* 🌈 Glow */}
    <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-30 transition"
         style={{ background: "rgba(113, 196, 255, 0.4)" }} />

    {/* 🖼️ IMAGE */}
    <div className="relative w-full h-[350px] md:h-[420px]">
      <img
        src={manuPhoto}
        alt="Manu Saviour"
        className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />
    </div>

    {/* 🧠 TOP RIGHT DETAILS */}
    <div className="absolute top-5 right-5 text-right space-y-2">

      {/* Name */}
      <h2 className="text-lg md:text-2.5xl font-semibold text-white">
        Manu Saviour
      </h2>

      {/* Role */}
      <p className="text-xs md:text-1xl text-zinc-300">
        Full Stack Engineer • AI Systems
      </p>

      {/* Status */}
      <div className="flex justify-end items-center gap-2 text-[20px] text-emerald-400 font-mono">
        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
        Available
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-end gap-2 mt-2">
        {["MERN", "ML", "DevOps","JAVA"].map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white border border-white/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

  </div>

</div>

          {/* Right Side: Socials */}
<div className="flex flex-col gap-6 w-full max-w-sm font-mono">

  {/* 📩 EMAIL TERMINAL BLOCK */}
  <button
    onClick={copyEmail}
    className="group relative w-full border border-zinc-700 bg-black px-5 py-4 
               flex items-center justify-between hover:border-emerald-400 
               transition-all duration-200"
  >
    {/* scan line effect */}
    <div className="absolute inset-0 opacity-10 pointer-events-none 
                    bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1),transparent)] 
                    animate-pulse" />

    <div className="flex items-center gap-3">
      <span className="text-emerald-400">$</span>
      <div className="flex flex-col text-left">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
          send mail
        </span>
        <span className="text-sm text-zinc-300 group-hover:text-white">
          {email}
        </span>
      </div>
    </div>

    <span className="text-zinc-600 group-hover:text-emerald-400 text-xs">
      COPY
    </span>
  </button>

  {/* 🌐 SOCIAL TERMINAL LIST */}
  <div className="flex flex-col border border-zinc-800 bg-black">

    {socials.map((social, i) => (
      <a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between px-5 py-4 
                   border-b border-zinc-800 last:border-none 
                   hover:bg-zinc-900 transition-all duration-200"
      >
        <div className="flex items-center gap-3">

          {/* terminal arrow */}
          <span className="text-zinc-600 group-hover:text-emerald-400 text-xs">
            &gt;
          </span>

          {/* icon */}
          <div className="text-zinc-500 group-hover:text-white">
            {social.icon}
          </div>

          {/* name */}
          <span className="text-sm text-zinc-400 group-hover:text-white uppercase tracking-wide">
            {social.name}
          </span>
        </div>

        {/* status */}
        <span className="text-[10px] text-zinc-600 group-hover:text-emerald-400">
          OPEN
        </span>
      </a>
    ))}

  </div>

  {/* 🧠 STATUS BAR */}
  <div className="flex items-center justify-between text-[10px] text-zinc-600 border-t border-zinc-800 pt-3">
    <span>STATUS: ONLINE</span>
    <span className="text-emerald-400">READY</span>
  </div>

</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;