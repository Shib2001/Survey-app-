import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import { Accordion } from '../primitives/Accordion';
import { ColorPicker } from '../primitives/ColorPicker';
import { NumberInput } from '../primitives/NumberInput';
import { CornerRadiusEditor } from '../primitives/CornerRadiusEditor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateStyling } from '../../../store/stylingSlice';

export const AppearanceSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const appearance = useAppSelector((state) => state.styling.present.appearance);

  const handleChange = (updates: Partial<typeof appearance>) => {
    dispatch(updateStyling({ appearance: { ...appearance, ...updates } }));
  };

  return (
    <Accordion title="Appearance" subtitle="Backgrounds and global layout" icon={<LayoutTemplate size={18} />} defaultOpen>
      <ColorPicker 
        label="Background Color" 
        value={appearance.backgroundColor} 
        onChange={(val) => handleChange({ backgroundColor: val })} 
      />
      
      <div className="h-px bg-border dark:bg-secondary-700 my-2" />
      
      <CornerRadiusEditor 
        value={appearance.cornerRadius} 
        onChange={(val) => handleChange({ cornerRadius: val })} 
      />

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      <NumberInput 
        label="Display Delay" 
        value={appearance.delaySeconds} 
        onChange={(val) => handleChange({ delaySeconds: val })} 
        unit="sec" 
        min={0} 
      />

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      <ColorPicker 
        label="Backdrop Color" 
        value={appearance.backdropColor} 
        onChange={(val) => handleChange({ backdropColor: val })} 
      />
      
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-content dark:text-secondary-300">Backdrop Opacity</label>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="0" max="1" step="0.1" 
            value={appearance.backdropOpacity}
            onChange={(e) => handleChange({ backdropOpacity: Number(e.target.value) })}
            className="flex-1 accent-primary-500"
          />
          <span className="text-xs font-mono text-content-secondary dark:text-secondary-400 w-8">
            {appearance.backdropOpacity}
          </span>
        </div>
      </div>
    </Accordion>
  );
};
