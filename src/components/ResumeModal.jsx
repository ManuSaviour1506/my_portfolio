import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Terminal, ShieldAlert } from "lucide-react";
import gsap from "gsap";

const ResumeModal = ({ isOpen, onClose, url }) => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(100);
  const [isCritical, setIsCritical] = useState(false);

  // 1. ADVANCED COUNTDOWN PROTOCOL
  useEffect(() => {
    if (isOpen) {
      setProgress(100);
      setIsCritical(false);
      const duration = 5000;
      const start = Date.now();

      const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        // Visual "Panic" mode when under 20%
        if (remaining < 20) setIsCritical(true);

        if (remaining <= 0) {
          clearInterval(timer);
          onClose();
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose]);

  // 2. KINETIC 3D TILT WITH MOUSE-TRACKING GLITCH
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 12,
      rotateX: y * -12,
      transformPerspective: 1200,
      duration: 0.6,
      ease: "power2.out",
    });

    // Move the scanline noise subtly based on mouse
    gsap.to(".noise-overlay", {
      x: x * 20,
      y: y * 20,
      duration: 1,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={containerRef}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 overflow-hidden"
        >
          {/* CINEMATIC NEON BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-[40px] cursor-zoom-out"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
          </motion.div>

          {/* STATUS NOTIFICATION: FLOATING BOX */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className={`absolute top-8 flex items-center gap-3 px-5 py-2 rounded-full border transition-colors duration-300 z-[2001]
              ${isCritical ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
          >
            {isCritical ? <ShieldAlert size={14} className="animate-pulse" /> : <Terminal size={14} />}
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-bold">
              {isCritical ? "TERMINATION_IMMINENT" : "ACCESS_AUTHORIZED: MANU_CV.v2"}
            </span>
          </motion.div>

          {/* MAIN TERMINAL CONTAINER */}
          <motion.div
            initial={{ rotateY: 110, scale: 0.7, opacity: 0, filter: "blur(20px)" }}
            animate={{ rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ rotateY: -110, scale: 0.7, opacity: 0, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative w-full max-w-6xl h-[85vh] z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              className={`w-full h-full bg-[#080809] border flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors duration-500
                ${isCritical ? 'border-red-500/40 shadow-red-500/10' : 'border-white/10 shadow-emerald-500/5'}`}
            >
              {/* INTERACTIVE PROGRESS BAR */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full shadow-[0_0_15px] transition-colors duration-300 ${isCritical ? 'bg-red-500 shadow-red-500' : 'bg-emerald-400 shadow-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* HEADER: DATA TOOLBAR */}
              <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-zinc-950/60 backdrop-blur-md">
                <div className="flex items-center gap-8">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-2 h-2 rounded-full border ${isCritical ? 'bg-red-500/20 border-red-500/40' : 'bg-emerald-500/20 border-emerald-500/40'}`} />
                    ))}
                  </div>
                  <div className="hidden lg:flex flex-col">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest leading-none mb-1">Decryption Runtime</span>
                    <span className={`text-[11px] font-mono font-bold ${isCritical ? 'text-red-400' : 'text-zinc-400'}`}>
                      00:00:{Math.ceil(progress * 50).toString().padStart(4, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <motion.a
                    whileHover={{ y: -2, color: "#fff" }}
                    href={url}
                    download
                    className="flex items-center gap-2 text-zinc-500 transition-colors"
                  >
                    <Download size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Download_Bin</span>
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2.5 bg-white/5 rounded-full text-white hover:bg-red-500/20 transition-all border border-white/10"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* THE VIEWPORT: PDF CONTAINER */}
              <div className="flex-grow bg-[#fcfcfc] relative group overflow-hidden">
                <iframe
                  src={`${url}#toolbar=0&view=FitH`}
                  className="w-full h-full border-none opacity-[0.98] group-hover:opacity-100 transition-opacity"
                  title="Resume Viewer"
                />
                
                {/* UPGRADED SCANLINE & NOISE OVERLAY */}
                <div className="noise-overlay absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://res.cloudinary.com/dwwre7as3/image/upload/v1706110825/noise_v3f1xv.png')] mix-blend-overlay" />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
                
                {/* CRT Screen Edge Shadow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
              </div>

              {/* FOOTER: SYSTEM METRICS */}
              <div className="px-10 py-4 bg-[#050505] flex justify-between items-center border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-1 h-3 bg-zinc-800 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.6em]">
                    System_Core: Stable
                  </span>
                </div>
                
                <span className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${isCritical ? 'text-red-500' : 'text-zinc-600'}`}>
                  {isCritical ? "CRITICAL_AUTO_EXIT_ACTIVE" : "Secure_Transmission_Active"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;