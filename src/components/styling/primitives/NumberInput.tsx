import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, min, max, step = 1, unit }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-content dark:text-secondary-300">{label}</label>
      <div className="relative flex items-center">
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className={`h-10 w-full rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 text-sm focus:outline-none focus:border-primary-500 transition-colors ${unit ? 'pr-8' : ''}`}
        />
        {unit && (
          <span className="absolute right-3 text-xs text-content-secondary dark:text-secondary-500 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};
