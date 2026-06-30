import React from 'react';
import { AppearanceSection } from './sections/AppearanceSection';
import { TypographySection } from './sections/TypographySection';
import { OptionsSection } from './sections/OptionsSection';
import { ButtonsSection } from './sections/ButtonsSection';
import { motion } from 'framer-motion';

export const StylingPanel: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2 pb-12"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-content-secondary dark:text-secondary-400 uppercase tracking-wider px-1 transition-colors duration-300">Styling Configurations</h2>
      </div>

      <motion.div variants={item}><AppearanceSection /></motion.div>
      <motion.div variants={item}><TypographySection /></motion.div>
      <motion.div variants={item}><OptionsSection /></motion.div>
      <motion.div variants={item}><ButtonsSection /></motion.div>
    </motion.div>
  );
};
