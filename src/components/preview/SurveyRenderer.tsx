import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppSelector } from '../../store/hooks';
import { SurveyQuestionRenderer } from './SurveyQuestionRenderer';

export const SurveyRenderer: React.FC = () => {
  const content = useAppSelector((state) => state.content.present);
  const styling = useAppSelector((state) => state.styling.present);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate on step change
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < content.questions.length) {
      // Fade out, then increment
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.2,
          onComplete: () => {
            setCurrentStep(prev => prev + 1);
          }
        });
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  // Helper to build inline styles
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

  const isThankYouPage = currentStep >= content.questions.length;

  if (isThankYouPage) {
    if (!content.thankYouPage.enabled) {
      return (
        <div className="w-full h-full flex items-center justify-center p-6 text-center">
          <p style={{ color: styling.questionTitle.color, fontFamily: styling.questionTitle.fontFamily }}>Survey Completed. Thank You Page disabled.</p>
        </div>
      );
    }

    const tyStyleTitle = { ...buildFontStyle(styling.thankYouTitle), ...buildMarginStyle(styling.thankYouTitle.margin), color: styling.thankYouTitle.color };
    const tyStyleSubtitle = { ...buildFontStyle(styling.thankYouSubtitle), ...buildMarginStyle(styling.thankYouSubtitle.margin), color: styling.thankYouSubtitle.color };

    return (
      <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        {content.thankYouPage.mediaUrl && (
          <img 
            src={content.thankYouPage.mediaUrl} 
            alt="Thank You" 
            className="w-48 h-48 object-contain mb-6" 
          />
        )}
        <h2 style={tyStyleTitle}>{content.thankYouPage.title}</h2>
        <p style={tyStyleSubtitle}>{content.thankYouPage.subtitle}</p>
        <div className="mt-8">
          <button 
            onClick={handleReset}
            className="px-6 py-2 rounded-full bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all text-content dark:text-secondary-100"
          >
            Reset Preview
          </button>
        </div>
      </div>
    );
  }

  const activeQuestion = content.questions[currentStep];
  if (!activeQuestion) return null;

  return (
    <div ref={containerRef} className="w-full h-full">
      <SurveyQuestionRenderer question={activeQuestion} onNext={handleNext} />
      
      {/* Dev Tool: Reset Button */}
      <button 
        onClick={handleReset}
        className="absolute bottom-4 left-0 right-0 mx-auto w-max px-4 py-1.5 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 hover:bg-black/20 dark:hover:bg-white/20 transition-colors z-50 backdrop-blur-sm"
      >
        Reset to Q1
      </button>
    </div>
  );
};
