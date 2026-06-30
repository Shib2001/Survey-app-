import React, { useState } from 'react';
import { Header } from './Header';
import { TabNavigation } from './TabNavigation';
import { ContentPanel } from '../content/ContentPanel';
import { StylingPanel } from '../styling/StylingPanel';
import { MobileFrame } from '../preview/MobileFrame';
import { useAppSelector } from '../../store/hooks';
import { motion } from 'framer-motion';

export const AppLayout: React.FC = () => {
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-secondary-900 font-sans flex flex-col transition-colors duration-300">
      <Header className="bg-white dark:bg-secondary-900 border-b border-border dark:border-secondary-800 shadow-soft z-10 relative" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 overflow-hidden"
      >
        {/* Left Panel */}
        <motion.aside variants={itemVariants} className="w-full md:w-[60%] overflow-y-auto p-4 md:p-6 bg-surface-secondary dark:bg-secondary-900 transition-colors duration-300">
          <TabNavigation />
          
          <div className="pb-12">
            {activeTab === 'content' ? (
              <ContentPanel />
            ) : (
              <StylingPanel />
            )}
          </div>
        </motion.aside>
        
        {/* Right Panel */}
        <motion.main variants={itemVariants} className="hidden md:flex w-[40%] bg-surface-tertiary dark:bg-secondary-900 relative items-center justify-center border-l border-border dark:border-secondary-800 transition-colors duration-300">
          <MobileFrame />
        </motion.main>
      </motion.div>
    </div>
  );
};
