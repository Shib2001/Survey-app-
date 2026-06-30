import React from 'react';

interface MarginEditorProps {
  value: { top: number; right: number; bottom: number; left: number };
  onChange: (value: { top: number; right: number; bottom: number; left: number }) => void;
}

export const MarginEditor: React.FC<MarginEditorProps> = ({ value, onChange }) => {
  const updateMargin = (side: keyof typeof value, val: number) => {
    onChange({ ...value, [side]: val });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-content dark:text-secondary-300">Margin / Spacing (px)</label>
      <div className="grid grid-cols-3 gap-2 w-32 relative mx-auto p-2 bg-surface-secondary dark:bg-secondary-900/50 rounded-xl border border-border dark:border-secondary-700">
        <div className="col-start-2">
          <input 
            type="number" value={value.top} onChange={(e) => updateMargin('top', Number(e.target.value))}
            className="h-8 w-10 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs"
          />
        </div>
        <div className="col-start-1 row-start-2">
          <input 
            type="number" value={value.left} onChange={(e) => updateMargin('left', Number(e.target.value))}
            className="h-8 w-10 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs"
          />
        </div>
        <div className="col-start-2 row-start-2 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary-500 dark:border-primary-600 rounded bg-primary-50 dark:bg-primary-900/50" />
        </div>
        <div className="col-start-3 row-start-2">
          <input 
            type="number" value={value.right} onChange={(e) => updateMargin('right', Number(e.target.value))}
            className="h-8 w-10 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs"
          />
        </div>
        <div className="col-start-2 row-start-3">
          <input 
            type="number" value={value.bottom} onChange={(e) => updateMargin('bottom', Number(e.target.value))}
            className="h-8 w-10 rounded bg-white dark:bg-secondary-950 border border-border dark:border-secondary-700 text-center text-xs"
          />
        </div>
      </div>
    </div>
  );
};
