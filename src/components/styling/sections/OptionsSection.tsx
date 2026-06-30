import React from 'react';
import { List } from 'lucide-react';
import { Accordion } from '../primitives/Accordion';
import { ColorPicker } from '../primitives/ColorPicker';
import { FontStyleEditor } from '../primitives/FontStyleEditor';
import { NumberInput } from '../primitives/NumberInput';
import { CornerRadiusEditor } from '../primitives/CornerRadiusEditor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateStyling } from '../../../store/stylingSlice';

export const OptionsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.styling.present.optionList);
  const selected = useAppSelector((state) => state.styling.present.selectedOption);
  const unselected = useAppSelector((state) => state.styling.present.unselectedOption);

  return (
    <Accordion title="Options List" subtitle="Configure choice layouts" icon={<List size={18} />}>
      
      {/* List Layout */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Layout & Spacing</h4>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-content dark:text-secondary-300">Style Variant</label>
          <select 
            value={list.layout} 
            onChange={e => dispatch(updateStyling({ optionList: { ...list, layout: e.target.value as any } }))}
            className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500"
          >
            <option value="radio">Radio Buttons</option>
            <option value="checkbox">Checkboxes</option>
            <option value="filled">Filled Blocks</option>
            <option value="alternative">Alternative Box</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Option Height" value={list.optionHeight} onChange={val => dispatch(updateStyling({ optionList: { ...list, optionHeight: val } }))} unit="px" />
          <NumberInput label="Spacing" value={list.optionSpacing} onChange={val => dispatch(updateStyling({ optionList: { ...list, optionSpacing: val } }))} unit="px" />
        </div>

        <CornerRadiusEditor value={list.cornerRadius} onChange={val => dispatch(updateStyling({ optionList: { ...list, cornerRadius: val } }))} />
      </div>

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      {/* Selected State */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Selected State</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Text Color" value={selected.textColor} onChange={textColor => dispatch(updateStyling({ selectedOption: { ...selected, textColor } }))} />
          <ColorPicker label="Background" value={selected.backgroundColor} onChange={backgroundColor => dispatch(updateStyling({ selectedOption: { ...selected, backgroundColor } }))} />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Border Color" value={selected.borderColor} onChange={borderColor => dispatch(updateStyling({ selectedOption: { ...selected, borderColor } }))} />
          <NumberInput label="Border Width" value={selected.borderWidth} onChange={borderWidth => dispatch(updateStyling({ selectedOption: { ...selected, borderWidth } }))} unit="px" />
        </div>

        <FontStyleEditor 
          fontFamily={selected.fontFamily} fontSize={selected.fontSize} alignment={selected.alignment}
          bold={selected.fontStyle.bold} italic={selected.fontStyle.italic} underline={selected.fontStyle.underline}
          onChange={updates => dispatch(updateStyling({ selectedOption: { ...selected, ...updates, fontStyle: { ...selected.fontStyle, ...updates } } }))} 
        />
      </div>

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      {/* Unselected State */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Unselected State</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Text Color" value={unselected.textColor} onChange={textColor => dispatch(updateStyling({ unselectedOption: { ...unselected, textColor } }))} />
          <ColorPicker label="Background" value={unselected.backgroundColor} onChange={backgroundColor => dispatch(updateStyling({ unselectedOption: { ...unselected, backgroundColor } }))} />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker label="Border Color" value={unselected.borderColor} onChange={borderColor => dispatch(updateStyling({ unselectedOption: { ...unselected, borderColor } }))} />
          <NumberInput label="Border Width" value={unselected.borderWidth} onChange={borderWidth => dispatch(updateStyling({ unselectedOption: { ...unselected, borderWidth } }))} unit="px" />
        </div>
      </div>

    </Accordion>
  );
};
