import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface FontStyleEditorProps {
  fontFamily: string;
  fontSize: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  alignment: 'left' | 'center' | 'right';
  onChange: (updates: Partial<{ fontFamily: string; fontSize: number; bold: boolean; italic: boolean; underline: boolean; alignment: 'left' | 'center' | 'right' }>) => void;
  hideAlignment?: boolean;
}

const FONTS = ['Inter', 'Roboto', 'Outfit', 'Merriweather', 'Playfair Display'];

export const FontStyleEditor: React.FC<FontStyleEditorProps> = ({ fontFamily, fontSize, bold, italic, underline, alignment, onChange, hideAlignment = false }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-surface-secondary dark:bg-secondary-900/30 rounded-xl border border-border dark:border-secondary-700">
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-content-secondary dark:text-secondary-500">Family</label>
          <select 
            value={fontFamily} 
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm focus:outline-none focus:border-primary-500"
          >
            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-content-secondary dark:text-secondary-500">Size (px)</label>
          <input 
            type="number" min={8} max={72} 
            value={fontSize} 
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 text-sm focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center bg-white dark:bg-secondary-950 rounded-md border border-border dark:border-secondary-700 overflow-hidden h-9">
          <button 
            onClick={() => onChange({ bold: !bold })}
            className={`w-10 h-full flex items-center justify-center border-r border-border dark:border-secondary-700 ${bold ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
          ><Bold size={16} /></button>
          <button 
            onClick={() => onChange({ italic: !italic })}
            className={`w-10 h-full flex items-center justify-center border-r border-border dark:border-secondary-700 ${italic ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
          ><Italic size={16} /></button>
          <button 
            onClick={() => onChange({ underline: !underline })}
            className={`w-10 h-full flex items-center justify-center ${underline ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
          ><Underline size={16} /></button>
        </div>

        {!hideAlignment && (
          <div className="flex items-center bg-white dark:bg-secondary-950 rounded-md border border-border dark:border-secondary-700 overflow-hidden h-9">
            <button 
              onClick={() => onChange({ alignment: 'left' })}
              className={`w-10 h-full flex items-center justify-center border-r border-border dark:border-secondary-700 ${alignment === 'left' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
            ><AlignLeft size={16} /></button>
            <button 
              onClick={() => onChange({ alignment: 'center' })}
              className={`w-10 h-full flex items-center justify-center border-r border-border dark:border-secondary-700 ${alignment === 'center' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
            ><AlignCenter size={16} /></button>
            <button 
              onClick={() => onChange({ alignment: 'right' })}
              className={`w-10 h-full flex items-center justify-center ${alignment === 'right' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-content-secondary dark:text-secondary-400 hover:bg-surface-hover dark:hover:bg-secondary-800'}`}
            ><AlignRight size={16} /></button>
          </div>
        )}
      </div>

    </div>
  );
};
