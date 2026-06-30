import React from 'react';
import { MousePointerClick } from 'lucide-react';
import { Accordion } from '../primitives/Accordion';
import { ColorPicker } from '../primitives/ColorPicker';
import { FontStyleEditor } from '../primitives/FontStyleEditor';
import { NumberInput } from '../primitives/NumberInput';
import { CornerRadiusEditor } from '../primitives/CornerRadiusEditor';
import { MarginEditor } from '../primitives/MarginEditor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateStyling } from '../../../store/stylingSlice';

export const ButtonsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const cta = useAppSelector((state) => state.styling.present.ctaButton);
  const cross = useAppSelector((state) => state.styling.present.crossButton);

  return (
    <Accordion title="Buttons" subtitle="CTA and controls styling" icon={<MousePointerClick size={18} />}>
      
      {/* CTA Button */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-content dark:text-secondary-100">Submit / Next Button</h4>
          <label className="flex items-center gap-2 text-xs font-semibold text-content-secondary dark:text-secondary-400 cursor-pointer">
            <input type="checkbox" checked={cta.fullWidth} onChange={e => dispatch(updateStyling({ ctaButton: { ...cta, fullWidth: e.target.checked } }))} className="accent-primary-500 rounded border-border dark:border-secondary-700" />
            Full Width
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Text Color" value={cta.textColor} onChange={textColor => dispatch(updateStyling({ ctaButton: { ...cta, textColor } }))} />
          <ColorPicker label="Background" value={cta.backgroundColor} onChange={backgroundColor => dispatch(updateStyling({ ctaButton: { ...cta, backgroundColor } }))} />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Border Color" value={cta.borderColor} onChange={borderColor => dispatch(updateStyling({ ctaButton: { ...cta, borderColor } }))} />
          <NumberInput label="Border Width" value={cta.borderWidth} onChange={borderWidth => dispatch(updateStyling({ ctaButton: { ...cta, borderWidth } }))} unit="px" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Height" value={cta.height} onChange={height => dispatch(updateStyling({ ctaButton: { ...cta, height } }))} unit="px" />
          {!cta.fullWidth && <NumberInput label="Width" value={cta.width} onChange={width => dispatch(updateStyling({ ctaButton: { ...cta, width } }))} unit="px" />}
        </div>

        <FontStyleEditor 
          fontFamily={cta.fontFamily} fontSize={cta.fontSize} alignment={cta.alignment}
          bold={cta.fontStyle.bold} italic={cta.fontStyle.italic} underline={cta.fontStyle.underline}
          onChange={updates => dispatch(updateStyling({ ctaButton: { ...cta, ...updates, fontStyle: { ...cta.fontStyle, ...updates } } }))} 
        />
        
        <CornerRadiusEditor value={cta.cornerRadius} onChange={cornerRadius => dispatch(updateStyling({ ctaButton: { ...cta, cornerRadius } }))} />
        <MarginEditor value={cta.margin} onChange={margin => dispatch(updateStyling({ ctaButton: { ...cta, margin } }))} />
      </div>

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      {/* Cross Button */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-content dark:text-secondary-100">Close (Cross) Button</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={cross.enabled} onChange={(e) => dispatch(updateStyling({ crossButton: { ...cross, enabled: e.target.checked } }))} />
            <div className="w-9 h-5 bg-border dark:bg-secondary-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>

        {cross.enabled && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <ColorPicker label="Cross Color" value={cross.crossColor} onChange={crossColor => dispatch(updateStyling({ crossButton: { ...cross, crossColor } }))} />
              <NumberInput label="Size" value={cross.size} onChange={size => dispatch(updateStyling({ crossButton: { ...cross, size } }))} unit="px" />
            </div>
            
            <MarginEditor value={cross.margin} onChange={margin => dispatch(updateStyling({ crossButton: { ...cross, margin } }))} />
          </>
        )}
      </div>

    </Accordion>
  );
};
