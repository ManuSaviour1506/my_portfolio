import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import ElectricBorder from './ElectricBorder';
import manuPhoto from '../assets/manu.jpg'; 
import './PillNav.css';

const PillNav = ({
  items = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
}) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const navRef = useRef(null);

  // 1. AUTO-CLOSE LOGIC (2 Seconds)
  useEffect(() => {
    if (isPhotoExpanded) {
      const timer = setTimeout(() => setIsPhotoExpanded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isPhotoExpanded]);

  // 2. MAGNETIC HOVER & GSAP LOGIC
  useEffect(() => {
    if (isPhotoExpanded || window.innerWidth < 768) return;

    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });
        
        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');
        
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, duration: 0.4, ease: "power3.out" }, 0)
          .to(label, { y: -25, opacity: 0, filter: "blur(5px)", duration: 0.35 }, 0) // Glitch-like blur
          .to(hoverLabel, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.7)" }, 0.05);

        tlRefs.current[index] = tl;
      });
    };

    const timer = setTimeout(layout, 100);
    return () => clearTimeout(timer);
  }, [items, isPhotoExpanded]);

  // 3. MAGNETIC EFFECT HANDLER
  const handleMagneticMove = (e, index) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35; // Strength
    const y = (clientY - (top + height / 2)) * 0.35;
    
    gsap.to(currentTarget, { x, y, scale: 1.1, duration: 0.3, ease: "power2.out" });
    tlRefs.current[index]?.play();
  };

  const resetMagnetic = (e, index) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    tlRefs.current[index]?.reverse();
  };

  return (
    <motion.div 
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`pill-nav-container ${isPhotoExpanded ? 'is-expanded' : ''}`}
    >
      {/* BREATHING ANIMATION ON NAV */}
      <motion.nav 
        animate={{ 
          boxShadow: [
            "0 10px 30px rgba(0,0,0,0.5)", 
            "0 10px 45px rgba(125,249,255,0.2)", 
            "0 10px 30px rgba(0,0,0,0.5)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`pill-nav ${isPhotoExpanded ? 'bg-smoke' : ''}`}
      >
        
        <div 
          className="pill-photo-wrapper" 
          onClick={() => setIsPhotoExpanded(!isPhotoExpanded)}
        >
          <ElectricBorder
            color={isPhotoExpanded ? "#ffffff" : "#7df9ff"}
            speed={isPhotoExpanded ? 0.3 : 1.5}
            thickness={isPhotoExpanded ? 4 : 2}
          >
            <motion.img 
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              src={manuPhoto} 
              className={`user-photo ${isPhotoExpanded ? 'w-24 h-24 md:w-40 md:h-40' : 'w-8 h-8 md:w-9 md:h-9'}`}
            />
          </ElectricBorder>
        </div>

        {!isPhotoExpanded && (
          <div className="pill-nav-items">
            <ul className="pill-list">
              {items.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="pill"
                    onMouseMove={(e) => handleMagneticMove(e, i)}
                    onMouseLeave={(e) => resetMagnetic(e, i)}
                  >
                    <span className="hover-circle desktop-only" ref={el => circleRefs.current[i] = el} />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover desktop-only">{item.label}</span>
                    </span>
                    {/* GLOW DOT */}
                    <div className="hover-glow-dot" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.nav>

      <AnimatePresence>
        {isPhotoExpanded && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 -z-10 bg-black/40" 
            onClick={() => setIsPhotoExpanded(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PillNav;