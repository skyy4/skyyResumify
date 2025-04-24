import React from 'react';
import { motion } from 'framer-motion';

const StarLogo = ({ size = 32, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main star */}
      <motion.svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1, rotate: 15 }}
        transition={{ duration: 0.5 }}
      >
        <motion.path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="url(#starGradient)" 
          stroke="#8B5CF6" 
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0.9 }}
          animate={{ 
            scale: [0.95, 1, 0.95],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkling effects */}
        <motion.circle 
          cx="18" 
          cy="6" 
          r="1"
          fill="#FFF"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
        
        <motion.circle 
          cx="6" 
          cy="10" 
          r="0.8"
          fill="#FFF"
          initial={{ opacity: 0.2, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2.5,
            delay: 1,
            ease: "easeInOut"
          }}
        />
        
        <motion.circle 
          cx="12" 
          cy="19" 
          r="0.6"
          fill="#FFF"
          initial={{ opacity: 0.4, scale: 0.7 }}
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [0.7, 1.1, 0.7]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.8,
            delay: 0.3,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="starGradient" x1="2" y1="9" x2="18" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default StarLogo; 