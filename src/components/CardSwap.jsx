import React, { useState, useEffect, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ children }) => {
  return <div className="w-full h-full">{children}</div>;
};

const CardSwap = ({ children, delay = 5000 }) => {
  const [index, setIndex] = useState(0);
  const cards = Children.toArray(children);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, delay);
    return () => clearInterval(interval);
  }, [cards.length, delay]);

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          const totalCards = cards.length;
          const visualIndex = (i - index + totalCards) % totalCards;

          if (visualIndex > 2) return null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{
                opacity: 1 - visualIndex * 0.2,
                scale: 1 - visualIndex * 0.05,
                y: visualIndex * -35,
                x: visualIndex * 25,
                zIndex: totalCards - visualIndex,
              }}
              exit={{ 
                opacity: 0, 
                x: -300, 
                rotate: -12,
                transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] } 
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="absolute w-full h-full max-w-[380px] max-h-[500px]"
            >
              {card}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;