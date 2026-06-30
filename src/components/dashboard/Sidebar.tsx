import React, { useEffect, useState } from 'react';
import { LayoutGrid, BookOpen, BarChart2, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';


export type SidebarView = 'surveys' | 'content' | 'analytics';

interface Props {
  active: SidebarView;
  onChange: (v: SidebarView) => void;
}

const NAV = [
  { id: 'surveys' as SidebarView, label: 'Surveys', icon: LayoutGrid, desc: 'All your campaigns' },
  { id: 'content' as SidebarView, label: 'Content', icon: BookOpen, desc: 'FAQ & guides' },
  { id: 'analytics' as SidebarView, label: 'Analytics', icon: BarChart2, desc: 'Reports & insights' },
];

export const Sidebar: React.FC<Props> = ({ active, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    document.addEventListener('toggle-mobile-sidebar', handleToggle);
    return () => document.removeEventListener('toggle-mobile-sidebar', handleToggle);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const SidebarContent = (
    <div className="w-60 h-full bg-white dark:bg-secondary-900 border-r border-gray-100 dark:border-secondary-800 flex flex-col relative z-10">
      <div className="md:hidden flex justify-end p-2 border-b border-gray-100 dark:border-secondary-800">
        <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-secondary-800 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* Brand strip */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-secondary-800">
        <Link
          to="/builder/new"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <Plus size={16} />
            New Survey
          </motion.div>
        </Link>
      </div>

      {/* Nav */}
      <motion.nav 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 px-3 py-4 flex flex-col gap-1"
      >
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onChange(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
                ${isActive
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : 'text-gray-600 dark:text-secondary-400 hover:bg-gray-50 dark:hover:bg-secondary-800 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                ${isActive ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' : 'bg-gray-100 dark:bg-secondary-800 text-gray-500 dark:text-secondary-500 group-hover:bg-gray-200 dark:group-hover:bg-secondary-700'}`}>
                <item.icon size={16} />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-semibold ${isActive ? 'text-red-700 dark:text-red-400' : ''}`}>{item.label}</span>
                <span className="text-xs text-gray-400 dark:text-secondary-500">{item.desc}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="ml-auto w-1.5 h-5 bg-red-500 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="px-5 py-4 border-t border-gray-100 dark:border-secondary-800"
      >
        <p className="text-[11px] text-gray-400 dark:text-secondary-600 text-center">Survey Campaign Builder</p>
      </motion.div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex shrink-0 h-full relative">
        <motion.div
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 120 }}
          className="h-full"
        >
          {SidebarContent}
        </motion.div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="relative shadow-2xl h-full"
            >
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
