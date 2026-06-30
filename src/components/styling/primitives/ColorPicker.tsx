import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-content dark:text-secondary-300">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border dark:border-secondary-700 shadow-sm shrink-0">
          <input 
            type="color" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer opacity-0"
          />
          <div className="w-full h-full pointer-events-none" style={{ backgroundColor: value }} />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 text-sm focus:outline-none focus:border-primary-500 uppercase transition-colors"
        />
      </div>
    </div>
  );
};
