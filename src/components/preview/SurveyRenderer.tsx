import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppSelector } from '../../store/hooks';
import { SurveyQuestionRenderer } from './SurveyQuestionRenderer';

interface SurveyRendererProps {
  contentOverride?: any;
  stylingOverride?: any;
  onComplete?: (answers: any[]) => void;
  isPublicView?: boolean;
}

export const SurveyRenderer: React.FC<SurveyRendererProps> = ({ contentOverride, stylingOverride, onComplete, isPublicView = false }) => {
  const reduxContent = useAppSelector((state) => state.content.present);
  const reduxStyling = useAppSelector((state) => state.styling.present);
  
  const content = contentOverride || reduxContent;
  const styling = stylingOverride || reduxStyling;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
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

  useEffect(() => {
    const handleNextEvent = () => {
      // Simulate answer to proceed or just proceed without answer for preview purposes
      handleNext({}); 
    };
    
    const handleBackEvent = () => {
      handleBack();
    };

    window.addEventListener('survey-preview-next', handleNextEvent as EventListener);
    window.addEventListener('survey-preview-back', handleBackEvent as EventListener);

    return () => {
      window.removeEventListener('survey-preview-next', handleNextEvent as EventListener);
      window.removeEventListener('survey-preview-back', handleBackEvent as EventListener);
    };
  }, [currentStep, content.questions.length, answers]);

  const handleNext = (answerData: any) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answerData;
    setAnswers(newAnswers);

    if (currentStep < content.questions.length) {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.2,
          onComplete: () => {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            if (nextStep >= content.questions.length && onComplete) {
              onComplete(newAnswers);
            }
          }
        });
      } else {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        if (nextStep >= content.questions.length && onComplete) {
          onComplete(newAnswers);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.2,
          onComplete: () => {
            setCurrentStep(prev => prev - 1);
          }
        });
      } else {
        setCurrentStep(prev => prev - 1);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
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
        {!isPublicView && (
          <div className="mt-8">
            <button 
              onClick={handleReset}
              className="px-6 py-2 rounded-full bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all text-content dark:text-secondary-100"
            >
              Reset Preview
            </button>
          </div>
        )}
      </div>
    );
  }

  const activeQuestion = content.questions[currentStep];
  if (!activeQuestion) return null;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <SurveyQuestionRenderer 
        question={activeQuestion} 
        onNext={handleNext} 
        onBack={handleBack}
        canGoBack={currentStep > 0}
        stylingOverride={styling}
      />
    </div>
  );
};
