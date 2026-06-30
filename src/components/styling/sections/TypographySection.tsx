import React from 'react';
import { Type } from 'lucide-react';
import { Accordion } from '../primitives/Accordion';
import { ColorPicker } from '../primitives/ColorPicker';
import { FontStyleEditor } from '../primitives/FontStyleEditor';
import { MarginEditor } from '../primitives/MarginEditor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateStyling } from '../../../store/stylingSlice';

export const TypographySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.styling.present.questionTitle);
  const subtitle = useAppSelector((state) => state.styling.present.subtitle);
  const tyTitle = useAppSelector((state) => state.styling.present.thankYouTitle);

  return (
    <Accordion title="Typography" subtitle="Titles and subtitles styling" icon={<Type size={18} />}>
      
      {/* Question Title */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Question Title</h4>
        <ColorPicker label="Text Color" value={title.color} onChange={color => dispatch(updateStyling({ questionTitle: { ...title, color } }))} />
        <FontStyleEditor {...title} onChange={updates => dispatch(updateStyling({ questionTitle: { ...title, ...updates } }))} />
        <MarginEditor value={title.margin} onChange={margin => dispatch(updateStyling({ questionTitle: { ...title, margin } }))} />
      </div>

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      {/* Subtitle */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Question Subtitle</h4>
        <ColorPicker label="Text Color" value={subtitle.color} onChange={color => dispatch(updateStyling({ subtitle: { ...subtitle, color } }))} />
        <FontStyleEditor {...subtitle} onChange={updates => dispatch(updateStyling({ subtitle: { ...subtitle, ...updates } }))} />
        <MarginEditor value={subtitle.margin} onChange={margin => dispatch(updateStyling({ subtitle: { ...subtitle, margin } }))} />
      </div>

      <div className="h-px bg-border dark:bg-secondary-700 my-2" />

      {/* Thank You Title */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-bold text-content dark:text-secondary-100">Thank You Title</h4>
        <ColorPicker label="Text Color" value={tyTitle.color} onChange={color => dispatch(updateStyling({ thankYouTitle: { ...tyTitle, color } }))} />
        <FontStyleEditor {...tyTitle} onChange={updates => dispatch(updateStyling({ thankYouTitle: { ...tyTitle, ...updates } }))} />
        <MarginEditor value={tyTitle.margin} onChange={margin => dispatch(updateStyling({ thankYouTitle: { ...tyTitle, margin } }))} />
      </div>

    </Accordion>
  );
};
