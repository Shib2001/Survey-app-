import React from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import type { QuestionPage } from '../../store/types';
import { useAppSelector } from '../../store/hooks';

interface SurveyQuestionRendererProps {
  question: QuestionPage;
  onNext: (answerData: any) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  stylingOverride?: any;
}

export const SurveyQuestionRenderer: React.FC<SurveyQuestionRendererProps> = ({ question, onNext, onBack, canGoBack = false, stylingOverride }) => {
  const reduxStyling = useAppSelector((state) => state.styling.present);
  const styling = stylingOverride || reduxStyling;

  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [selectedMulti, setSelectedMulti] = React.useState<string[]>([]);
  const [textValue, setTextValue] = React.useState('');
  const [rangeValue, setRangeValue] = React.useState<number>(question.rangeSettings?.min ?? 1);
  const [ratingValue, setRatingValue] = React.useState<number>(0);
  const [additionalComments, setAdditionalComments] = React.useState('');

  const buildFontStyle = (fontObj: any) => ({
    fontFamily: fontObj.fontFamily,
    fontSize: `${fontObj.fontSize}px`,
    fontWeight: fontObj.bold ? 'bold' : 'normal',
    fontStyle: fontObj.italic ? 'italic' : 'normal',
    textDecoration: fontObj.underline ? 'underline' : 'none',
    textAlign: fontObj.alignment as any,
  });

  const buildMarginStyle = (marginObj: any) => ({
    marginTop: `${marginObj.top}px`,
    marginRight: `${marginObj.right}px`,
    marginBottom: `${marginObj.bottom}px`,
    marginLeft: `${marginObj.left}px`,
  });

  const buildCornerRadiusStyle = (radiusObj: any) => ({
    borderTopLeftRadius: `${radiusObj.topLeft}px`,
    borderTopRightRadius: `${radiusObj.topRight}px`,
    borderBottomRightRadius: `${radiusObj.bottomRight}px`,
    borderBottomLeftRadius: `${radiusObj.bottomLeft}px`,
  });

  // Derived Styles
  const titleStyle = {
    ...buildFontStyle(styling.questionTitle),
    ...buildMarginStyle(styling.questionTitle.margin),
    color: styling.questionTitle.color,
  };

  const subtitleStyle = {
    ...buildFontStyle(styling.subtitle),
    ...buildMarginStyle(styling.subtitle.margin),
    color: styling.subtitle.color,
  };

  const ctaStyle = {
    ...buildFontStyle(styling.ctaButton),
    ...buildMarginStyle(styling.ctaButton.margin),
    ...buildCornerRadiusStyle(styling.ctaButton.cornerRadius),
    backgroundColor: styling.ctaButton.backgroundColor,
    color: styling.ctaButton.textColor,
    borderColor: styling.ctaButton.borderColor,
    borderWidth: `${styling.ctaButton.borderWidth}px`,
    borderStyle: 'solid',
    height: `${styling.ctaButton.height}px`,
    width: styling.ctaButton.fullWidth ? '100%' : `${styling.ctaButton.width}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 16px rgba(220, 38, 38, 0.25)',
    fontWeight: 700,
  };

  const renderOption = (opt: any, isSelected: boolean, onClick: () => void) => {
    const stateStyle = isSelected ? styling.selectedOption : styling.unselectedOption;
    const baseStyle = {
      ...buildFontStyle(stateStyle),
      ...buildCornerRadiusStyle(styling.optionList.cornerRadius),
      backgroundColor: stateStyle.backgroundColor,
      color: stateStyle.textColor,
      borderColor: stateStyle.borderColor,
      borderWidth: `${stateStyle.borderWidth}px`,
      borderStyle: 'solid',
      minHeight: `${styling.optionList.optionHeight}px`,
      marginBottom: `${styling.optionList.optionSpacing}px`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isSelected ? '0 4px 12px rgba(220, 38, 38, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
      transform: isSelected ? 'translateY(-1px)' : 'none',
    };

    return (
      <div key={opt.id} style={baseStyle} onClick={onClick} className="group hover:shadow-md">
        {styling.optionList.layout === 'radio' && (
          <div className="w-4 h-4 rounded-full border flex items-center justify-center mr-3" style={{ borderColor: stateStyle.textColor }}>
            {isSelected && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stateStyle.textColor }} />}
          </div>
        )}
        {styling.optionList.layout === 'checkbox' && (
          <div className="w-4 h-4 rounded border flex items-center justify-center mr-3" style={{ borderColor: stateStyle.textColor }}>
            {isSelected && <Check size={12} style={{ color: stateStyle.textColor }} />}
          </div>
        )}
        <span>{opt.text}</span>
      </div>
    );
  };

  const handleNextClick = () => {
    const answerData: any = { questionId: question.id, questionTitle: question.title };
    if (question.type === 'single_choice') answerData.answer = selectedValue;
    else if (question.type === 'multiple_choice') answerData.answer = selectedMulti;
    else if (question.type === 'text') answerData.answer = textValue;
    else if (question.type === 'range') answerData.answer = rangeValue;
    else if (question.type === 'rating') answerData.answer = ratingValue;
    
    if (question.additionalComments) {
      answerData.additionalComments = additionalComments;
    }
    onNext(answerData);
  };

  return (
    <div className="w-full h-full relative flex flex-col p-6 overflow-y-auto hide-scrollbar">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-between mb-4 -mx-2">
        <button 
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-2 rounded-full transition-colors ${canGoBack ? 'hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-content dark:text-secondary-100' : 'opacity-30 cursor-not-allowed text-content-tertiary dark:text-secondary-600'}`}
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={handleNextClick}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-content dark:text-secondary-100"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div style={titleStyle}>{question.title}</div>
      {question.subtitle && <div style={subtitleStyle}>{question.subtitle}</div>}

      <div className="flex-1 mt-6 flex flex-col">
        {/* Single Choice */}
        {question.type === 'single_choice' && question.options.map((opt: any) => 
          renderOption(opt, selectedValue === opt.id, () => setSelectedValue(opt.id))
        )}

        {/* Multiple Choice */}
        {question.type === 'multiple_choice' && question.options.map((opt: any) => {
          const isSelected = selectedMulti.includes(opt.id);
          return renderOption(opt, isSelected, () => {
            if (isSelected) setSelectedMulti(selectedMulti.filter(id => id !== opt.id));
            else setSelectedMulti([...selectedMulti, opt.id]);
          });
        })}

        {/* Text Input */}
        {question.type === 'text' && (
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full rounded-xl border p-4 bg-transparent outline-none transition-colors"
            style={{
              borderColor: styling.unselectedOption.borderColor,
              borderWidth: `${styling.unselectedOption.borderWidth}px`,
              color: styling.unselectedOption.textColor,
              backgroundColor: styling.unselectedOption.backgroundColor,
              fontFamily: styling.unselectedOption.fontFamily,
              minHeight: '120px'
            }}
          />
        )}

        {/* Range Input */}
        {question.type === 'range' && (
          <div className="flex flex-col gap-4">
            <input 
              type="range" 
              min={question.rangeSettings?.min ?? 1} 
              max={question.rangeSettings?.max ?? 10}
              step={question.rangeSettings?.step ?? 1}
              value={rangeValue}
              onChange={e => setRangeValue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none outline-none"
              style={{ backgroundColor: styling.unselectedOption.borderColor }}
            />
            <div className="flex justify-between items-center text-xs opacity-70" style={{ color: styling.questionTitle.color, fontFamily: styling.questionTitle.fontFamily }}>
              <span>{question.rangeSettings?.leftLabel}</span>
              <span className="font-bold text-lg">{rangeValue}</span>
              <span>{question.rangeSettings?.rightLabel}</span>
            </div>
          </div>
        )}

        {/* Rating Input */}
        {question.type === 'rating' && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: question.ratingSettings?.maxStars ?? 5 }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setRatingValue(i + 1)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <div 
                  className={`flex items-center justify-center ${question.ratingSettings?.shape === 'star' ? 'text-2xl' : 'text-3xl'}`}
                  style={{ color: i < ratingValue ? styling.selectedOption.backgroundColor : styling.unselectedOption.borderColor }}
                >
                  {question.ratingSettings?.shape === 'star' ? '★' : question.ratingSettings?.shape === 'heart' ? '♥' : '👍'}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Additional Comments */}
        {question.additionalComments && (
          <div className="mt-4 flex-shrink-0">
            <textarea
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Additional comments..."
              className="w-full rounded-xl p-4 bg-transparent outline-none transition-colors"
              style={{
                borderColor: styling.additionalComment.borderColor,
                borderWidth: `${styling.additionalComment.borderWidth}px`,
                borderStyle: 'solid',
                color: styling.additionalComment.textColor,
                backgroundColor: styling.additionalComment.backgroundColor,
                fontFamily: styling.additionalComment.fontFamily,
                fontSize: `${styling.additionalComment.fontSize}px`,
                fontWeight: styling.additionalComment.fontWeight,
                textAlign: styling.additionalComment.alignment,
                minHeight: '80px',
              }}
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button style={ctaStyle} onClick={handleNextClick}>
          {question.submitButtonText || 'Next'}
        </button>
      </div>

    </div>
  );
};
