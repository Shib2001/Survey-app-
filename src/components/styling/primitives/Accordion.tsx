import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AccordionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, subtitle, icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    
    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.current,
        { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
      );
    }
  }, [isOpen]);

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-border dark:border-secondary-700 transition-colors duration-300 overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-surface-secondary dark:bg-secondary-900/50 hover:bg-surface-hover dark:hover:bg-secondary-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="font-semibold text-content dark:text-secondary-100">{title}</span>
            {subtitle && <span className="text-xs text-content-secondary dark:text-secondary-400">{subtitle}</span>}
          </div>
        </div>
        <div className="text-content-secondary dark:text-secondary-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <div ref={contentRef} className="overflow-hidden">
        <div className="p-5 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};
