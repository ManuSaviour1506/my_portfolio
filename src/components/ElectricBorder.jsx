import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ElectricBorder = ({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  style = {},
  className = '',
}) => {
  const [id] = useState(() => `electric-border-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <motion.div 
      className={`relative inline-block ${className}`} 
      style={{ ...style, padding: thickness }}
      // Responsive Hover & Tap
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: `url(#${id})` }}
      >
        <rect
          x={thickness / 2}
          y={thickness / 2}
          width={`calc(100% - ${thickness}px)`}
          height={`calc(100% - ${thickness}px)`}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          rx={style.borderRadius || 0}
        />
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${chaos} ${chaos * 1.5}`}
              numOctaves="2"
            >
              <animate
                attributeName="seed"
                from="1"
                to="100"
                dur={`${10 / speed}s`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="8" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 overflow-hidden" style={{ borderRadius: style.borderRadius }}>
        {children}
      </div>
    </motion.div>
  );
};

export default ElectricBorder;