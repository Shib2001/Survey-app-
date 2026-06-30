import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyById, submitResponse, type SurveyRecord } from '../../supabase/database';
import { SurveyRenderer } from '../preview/SurveyRenderer';
import { GoogleFontLoader } from '../preview/GoogleFontLoader';
import toast from 'react-hot-toast';

export const SurveyRunner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadSurvey(id);
    } else {
      setError('Invalid survey link');
      setLoading(false);
    }
  }, [id]);

  const loadSurvey = async (surveyId: string) => {
    try {
      const data = await getSurveyById(surveyId);
      if (data) {
        setSurvey(data);
      } else {
        setError('Survey not found');
      }
    } catch (err) {
      setError('Failed to load survey');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (answers: any[]) => {
    if (!id) return;
    try {
      await submitResponse(id, answers);
    } catch (err) {
      toast.error('Failed to submit response');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-500">{error || 'Survey not found'}</p>
        </div>
      </div>
    );
  }

  // Use the saved appearance background color
  const styling = survey.config.styling;
  const appearance = styling.appearance;

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-0 sm:p-8"
      style={{ backgroundColor: appearance.backdropColor || '#f8fafc' }}
    >
      {Array.from(new Set([
        styling.questionTitle.fontFamily,
        styling.subtitle.fontFamily,
        styling.selectedOption.fontFamily,
        styling.unselectedOption.fontFamily,
        styling.additionalComment.fontFamily,
        styling.ctaButton.fontFamily,
        styling.thankYouTitle.fontFamily,
        styling.thankYouSubtitle.fontFamily,
        styling.thankYouButton.fontFamily
      ])).map(fontFamily => (
        <GoogleFontLoader key={fontFamily} fontFamily={fontFamily} />
      ))}
      <div 
        className="w-full max-w-2xl h-[100dvh] sm:h-[80vh] sm:min-h-[600px] overflow-hidden sm:shadow-2xl relative flex flex-col"
        style={{
          backgroundColor: appearance.backgroundColor,
          borderTopLeftRadius: `${appearance.cornerRadius.topLeft}px`,
          borderTopRightRadius: `${appearance.cornerRadius.topRight}px`,
          borderBottomRightRadius: `${appearance.cornerRadius.bottomRight}px`,
          borderBottomLeftRadius: `${appearance.cornerRadius.bottomLeft}px`,
        }}
      >
        <SurveyRenderer 
          contentOverride={survey.config.content}
          stylingOverride={survey.config.styling}
          onComplete={handleComplete}
          isPublicView={true}
        />
      </div>
    </div>
  );
};
