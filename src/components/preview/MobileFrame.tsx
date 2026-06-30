import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { SurveyRenderer } from './SurveyRenderer';
import { motion } from 'framer-motion';
import { LayoutTemplate } from 'lucide-react';

export const MobileFrame: React.FC = () => {
  const styling = useAppSelector((state) => state.styling.present);
  const appearance = styling.appearance;

  const frameStyle = {
    backgroundColor: appearance.backgroundColor,
    borderTopLeftRadius: `${appearance.cornerRadius.topLeft}px`,
    borderTopRightRadius: `${appearance.cornerRadius.topRight}px`,
    borderBottomRightRadius: `${appearance.cornerRadius.bottomRight}px`,
    borderBottomLeftRadius: `${appearance.cornerRadius.bottomLeft}px`,
  };

  return (
    <motion.div 
      className="flex items-center justify-center p-4 perspective-1000 relative"
      whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Outer Hardware Shell */}
      <div className="w-[340px] h-[680px] bg-slate-900 dark:bg-[#111] rounded-[3rem] p-3 shadow-2xl relative flex flex-col items-center justify-center border border-slate-800 dark:border-white/10 ring-4 ring-black/5 dark:ring-white/5">
        
        {/* Hardware Buttons */}
        <div className="absolute left-[-2px] top-[100px] w-[3px] h-[30px] bg-slate-800 dark:bg-[#222] rounded-l-md shadow-inner"></div>
        <div className="absolute left-[-2px] top-[150px] w-[3px] h-[50px] bg-slate-800 dark:bg-[#222] rounded-l-md shadow-inner"></div>
        <div className="absolute left-[-2px] top-[210px] w-[3px] h-[50px] bg-slate-800 dark:bg-[#222] rounded-l-md shadow-inner"></div>
        <div className="absolute right-[-2px] top-[170px] w-[3px] h-[70px] bg-slate-800 dark:bg-[#222] rounded-r-md shadow-inner"></div>

        {/* Inner Display (Screen) */}
        <div className="w-full h-full relative overflow-hidden flex flex-col transition-colors duration-300" style={frameStyle}>
          
          {/* Hardware Notch */}
          <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 dark:bg-[#111] rounded-b-3xl w-[140px] mx-auto z-50 flex items-center justify-center gap-3">
            {/* Speaker */}
            <div className="w-12 h-1.5 bg-[#0a0a0a] rounded-full shadow-inner"></div>
            {/* Camera */}
            <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full border border-white/5 relative overflow-hidden">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-blue-500/20 rounded-full blur-[0.5px]"></div>
            </div>
          </div>
          {/* App Header Bar */}
          <div className="w-full pt-10 pb-3 px-5 flex items-center justify-between border-b border-black/5 dark:border-white/5 z-20 relative shadow-sm" style={{ backgroundColor: appearance.backgroundColor }}>
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-500 p-1.5 rounded-lg text-white shadow-sm">
                <LayoutTemplate size={16} />
              </div>
              <span className="font-bold text-[13px] tracking-wide" style={{ color: styling.questionTitle.color, fontFamily: styling.questionTitle.fontFamily }}>Survey Campaign Builder</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-sm border-2 border-current opacity-40" style={{ color: styling.questionTitle.color }}></div>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="flex-1 flex flex-col relative z-10 w-full h-full overflow-y-auto hide-scrollbar pb-6">
            <SurveyRenderer />
          </div>

          {/* iOS Bottom Indicator */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
            <div className="w-32 h-1.5 bg-black/20 dark:bg-white/20 rounded-full backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
