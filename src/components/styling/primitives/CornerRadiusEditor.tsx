import React from 'react';
import type { CornerRadius } from '../../../store/types';

interface CornerRadiusEditorProps {
  value: CornerRadius;
  onChange: (value: CornerRadius) => void;
}

export const CornerRadiusEditor: React.FC<CornerRadiusEditorProps> = ({ value, onChange }) => {
  const updateCorner = (corner: keyof CornerRadius, val: number) => {
    onChange({ ...value, [corner]: val });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-content dark:text-secondary-300">Corner Radius (px)</label>
      <div className="grid grid-cols-2 gap-2 w-32 relative mx-auto p-4 bg-surface-secondary dark:bg-secondary-900/50 rounded-xl border border-border dark:border-secondary-700">
        <div className="absolute inset-0 m-auto w-12 h-12 border-2 border-primary-500 dark:border-primary-600 border-dashed rounded-lg opacity-50 pointer-events-none"
             style={{ 
               borderTopLeftRadius: value.topLeft,
               borderTopRightRadius: value.topRight,
               borderBottomLeftRadius: value.bottomLeft,
               borderBottomRightRadius: value.bottomRight,
             }} 
        />
        <input 
          type="number" min={0} value={value.topLeft} onChange={(e) => updateCorner('topLeft', Number(e.target.value))}
          className="h-8 w-12 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs z-10"
        />
        <input 
          type="number" min={0} value={value.topRight} onChange={(e) => updateCorner('topRight', Number(e.target.value))}
          className="h-8 w-12 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs z-10 justify-self-end"
        />
        <input 
          type="number" min={0} value={value.bottomLeft} onChange={(e) => updateCorner('bottomLeft', Number(e.target.value))}
          className="h-8 w-12 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs z-10 self-end"
        />
        <input 
          type="number" min={0} value={value.bottomRight} onChange={(e) => updateCorner('bottomRight', Number(e.target.value))}
          className="h-8 w-12 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs z-10 self-end justify-self-end"
        />
      </div>
    </div>
  );
};
