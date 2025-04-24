"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-1 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 shadow-lg z-10 overflow-hidden">
      <div className="relative w-full h-6 flex items-center justify-center">
        {/* Moving banner - first instance */}
        <motion.div 
          className="absolute whitespace-nowrap text-sm font-medium tracking-wider"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 20,
            ease: "linear"
          }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resumify - Virtual Resume Builder
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="text-gray-300">
            Developed by Team MERN Muffins (G9)
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resumify - Virtual Resume Builder
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="text-gray-300">
            Developed by Team MERN Muffins (G9)
          </span>
          <span className="mx-8 text-gray-400">•</span>
        </motion.div>
        
        {/* Moving banner - second instance (for smooth infinite scroll effect) */}
        <motion.div 
          className="absolute whitespace-nowrap text-sm font-medium tracking-wider"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 20,
            ease: "linear",
            delay: 10 // Start halfway through the first animation
          }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resumify - Virtual Resume Builder
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="text-gray-300">
            Developed by Team MERN Muffins (G9)
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resumify - Virtual Resume Builder
          </span>
          <span className="mx-8 text-gray-400">•</span>
          <span className="text-gray-300">
            Developed by Team MERN Muffins (G9)
          </span>
          <span className="mx-8 text-gray-400">•</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 