import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  // We use MotionValues directly for ZERO latency
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Logic for both Mouse and Touch
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (x && y) {
        cursorX.set(x - 16); // Center the 32px cursor
        cursorY.set(y - 16);
        setIsVisible(true);
      }
    };

    // Listen for mouse and touch
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("touchmove", moveCursor);
    window.addEventListener("mouseleave", () => setIsVisible(false));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("touchmove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      {/* 1. The Spinning Outer Ring (Unique Feature) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 rounded-full border-2 border-dashed border-emerald-500/50"
      />

      {/* 2. The Fixed Inner Dot (High Precision) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" />
      
      {/* 3. The "Scanner" Crosshair (Subtle unique detail) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/20" />
    </motion.div>
  );
};

export default CustomCursor;