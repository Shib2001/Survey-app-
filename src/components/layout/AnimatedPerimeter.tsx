import React from 'react';

export const AnimatedPerimeter: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="bloodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" /> {/* Red 500 */}
            <stop offset="50%" stopColor="#dc2626" /> {/* Red 600 */}
            <stop offset="100%" stopColor="#7f1d1d" /> {/* Bloody Red */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Glowing aura */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="url(#bloodyGradient)"
          strokeWidth="4"
          pathLength="100"
          className="animate-perimeter-flow opacity-60 dark:opacity-80"
          filter="url(#glow)"
        />
        
        {/* Core solid sharp line */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="url(#bloodyGradient)"
          strokeWidth="2"
          pathLength="100"
          className="animate-perimeter-flow"
        />
      </svg>
      <style>{`
        .animate-perimeter-flow {
          stroke-dasharray: 20 80; /* 20% visible line, 80% gap */
          stroke-dashoffset: 100;
          animation: flow-perimeter 10s linear infinite;
        }

        @keyframes flow-perimeter {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
