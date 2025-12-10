import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Cpu, Layers } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Analyzing visual hierarchy...",
    "Dreaming in React components...",
    "Refining Tailwind classes...",
    "Polishing the animations...",
    "Almost there..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center relative overflow-hidden rounded-3xl bg-dark-800/50 border border-white/5 p-10">
      <div className="relative">
        {/* Central pulsing core */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        
        {/* Orbiting Icons */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-900 p-3 rounded-full border border-primary/30 shadow-lg shadow-primary/20">
            <Code className="text-primary w-6 h-6" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-dark-900 p-3 rounded-full border border-secondary/30 shadow-lg shadow-secondary/20">
            <Layers className="text-secondary w-6 h-6" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-900 p-3 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <Cpu className="text-purple-500 w-6 h-6" />
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-dark-900 p-3 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
            <Sparkles className="text-cyan-500 w-6 h-6" />
          </div>
        </motion.div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-display font-bold text-white mb-2">{messages[step]}</h3>
        <p className="text-slate-400">Gemini 3 Pro is crafting your code.</p>
      </motion.div>
      
      <div className="mt-8 w-64 h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 12.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;