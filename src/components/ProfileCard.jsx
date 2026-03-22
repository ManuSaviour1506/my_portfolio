import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ProfileCard = ({
  name = "Manu Saviour",
  title = "Full Stack Developer",
  avatarUrl = "/assets/manu.jpg", 
  innerGradient = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
  behindGlowColor = "rgba(113, 196, 255, 0.4)",
  behindGlowEnabled = true,
  enableTilt = true,
}) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group">
      {/* Background Glow */}
      {behindGlowEnabled && (
        <div
          className="absolute -inset-4 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{ backgroundColor: behindGlowColor }}
        />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-72 h-[420px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900"
      >
        {/* The Full Background Photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Dark Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Subtle color tint to match your brand */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: innerGradient }} />
        </div>

        {/* Content Layer */}
        <div 
          className="relative z-10 h-full flex flex-col justify-end p-8 text-left" 
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="space-y-1">
            <motion.h3 
              className="text-2xl font-bold text-white tracking-tight leading-tight"
            >
              {name}
            </motion.h3>
            <p className="text-sm text-zinc-300 font-medium uppercase tracking-wider">
              {title}
            </p>
          </div>

          {/* Minimalist accent line */}
          <div className="w-12 h-[2px] bg-white/40 rounded-full mt-4 group-hover:w-20 transition-all duration-500" />
        </div>

        {/* Glossy Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

export default ProfileCard;