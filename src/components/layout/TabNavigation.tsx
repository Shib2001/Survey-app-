import React from 'react';
import { FileText, Palette } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveTab } from '../../store/uiSlice';
import { motion } from 'framer-motion';

// Helper for Tailwind classes
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const TabNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  return (
    <div className="flex border-b border-border dark:border-secondary-800 mb-6 transition-colors duration-300">
      <button
        onClick={() => dispatch(setActiveTab('content'))}
        className={cn(
          "flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors relative",
          activeTab === 'content' ? "text-primary-600 dark:text-primary-500" : "text-content-secondary dark:text-secondary-400 hover:text-content dark:hover:text-secondary-200"
        )}
      >
        <FileText size={18} />
        Content
        {activeTab === 'content' && (
          <motion.span 
            layoutId="tabIndicator"
            className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary-600 rounded-t-full" 
          />
        )}
      </button>

      <button
        onClick={() => dispatch(setActiveTab('styling'))}
        className={cn(
          "flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors relative",
          activeTab === 'styling' ? "text-primary-600 dark:text-primary-500" : "text-content-secondary dark:text-secondary-400 hover:text-content dark:hover:text-secondary-200"
        )}
      >
        <Palette size={18} />
        Styling
        {activeTab === 'styling' && (
          <motion.span 
            layoutId="tabIndicator"
            className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary-600 rounded-t-full" 
          />
        )}
      </button>
    </div>
  );
};
