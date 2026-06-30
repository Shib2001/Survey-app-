import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { SurveyRenderer } from './SurveyRenderer';
import { motion } from 'framer-motion';

export const MobileFrame: React.FC = () => {
  const appearance = useAppSelector((state) => state.styling.present.appearance);

  const frameStyle = {
    backgroundColor: appearance.backgroundColor,
    borderTopLeftRadius: `${appearance.cornerRadius.topLeft}px`,
    borderTopRightRadius: `${appearance.cornerRadius.topRight}px`,
    borderBottomRightRadius: `${appearance.cornerRadius.bottomRight}px`,
    borderBottomLeftRadius: `${appearance.cornerRadius.bottomLeft}px`,
  };

  return (
    <motion.div 
      className="flex items-center justify-center p-4 perspective-1000"
      whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="w-[320px] h-[640px] rounded-[2rem] shadow-strong border-[8px] border-surface-secondary dark:border-secondary-700 relative overflow-hidden flex flex-col transition-colors duration-300 bg-white" style={frameStyle}>
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-surface-secondary dark:border-secondary-700 dark:bg-secondary-700 rounded-b-xl w-32 mx-auto z-20 transition-colors duration-300"></div>
        
        {/* Preview Content */}
        <div className="flex-1 flex flex-col mt-8 relative z-10">
          <SurveyRenderer />
        </div>
      </div>
    </motion.div>
  );
};
