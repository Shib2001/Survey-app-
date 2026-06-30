import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { MobileFrame } from '../preview/MobileFrame';
import { motion, AnimatePresence } from 'framer-motion';

export const MobilePreviewModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-mobile-preview', handleOpen);
    return () => document.removeEventListener('open-mobile-preview', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 md:hidden overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[360px] flex flex-col items-center justify-start my-12 pt-8"
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
          >
            <X size={24} />
          </button>
          <div className="transform scale-[0.85] origin-top w-full h-[680px] flex items-center justify-center">
            <MobileFrame />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
