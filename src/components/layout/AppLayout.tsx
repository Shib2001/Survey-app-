import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './Header';
import { TabNavigation } from './TabNavigation';
import { ContentPanel } from '../content/ContentPanel';
import { StylingPanel } from '../styling/StylingPanel';
import { MobileFrame } from '../preview/MobileFrame';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateStyling, resetStyling } from '../../store/stylingSlice';
import { resetContent, updateContent } from '../../store/contentSlice';
import { setActiveTab } from '../../store/uiSlice';
import { ActionCreators } from 'redux-undo';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurveyById, updateSurvey } from '../../supabase/database';
import toast from 'react-hot-toast';
import { GoogleFontLoader } from '../preview/GoogleFontLoader';
import { MobilePreviewModal } from '../builder/MobilePreviewModal';

export const AppLayout: React.FC = () => {
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const content = useAppSelector((state) => state.content.present);
  const styling = useAppSelector((state) => state.styling.present);
  
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [frameScale, setFrameScale] = useState(0.85);

  useEffect(() => {
    if (id && id !== 'new') {
      loadSurvey(id);
    } else if (id === 'new') {
      dispatch(resetContent());
      dispatch(resetStyling());
    }
  }, [id, dispatch]);

  useEffect(() => {
    const updateScale = () => {
      const availableHeight = window.innerHeight - 160;
      let newScale = availableHeight / 680;
      if (newScale > 0.85) newScale = 0.85;
      if (newScale < 0.3) newScale = 0.3;
      setFrameScale(newScale);
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const loadSurvey = async (surveyId: string) => {
    setLoading(true);
    try {
      const survey = await getSurveyById(surveyId);
      if (survey) {
        dispatch(updateContent(survey.config.content));
        dispatch(updateStyling(survey.config.styling));
      } else {
        toast.error('Survey not found');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to load survey');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleForceSave = useCallback(async () => {
    if (!id || id === 'new') {
      toast.error('Please create the survey first');
      return;
    }
    const savePromise = updateSurvey(id, content.questions[0]?.title || 'Untitled Survey', { content, styling });
    
    toast.promise(savePromise, {
      loading: 'Saving...',
      success: 'Saved successfully (Ctrl+S)',
      error: 'Failed to save'
    });
  }, [id, content, styling]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Switch Tabs (Ctrl + 1 / Ctrl + 2)
      if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        dispatch(setActiveTab('content'));
      }
      if (e.ctrlKey && e.key === '2') {
        e.preventDefault();
        dispatch(setActiveTab('styling'));
      }

      // Undo / Redo
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        dispatch(ActionCreators.undo());
      }
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') || (e.ctrlKey && e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        dispatch(ActionCreators.redo());
      }

      // Force Save
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleForceSave();
      }

      // Navigate Preview (Ctrl + Left / Right)
      if (e.ctrlKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('survey-preview-back'));
      }
      if (e.ctrlKey && e.key === 'ArrowRight') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('survey-preview-next'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, handleForceSave]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface-secondary dark:bg-secondary-900">
        <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-surface-secondary dark:bg-secondary-900 font-sans flex flex-col transition-colors duration-300">
      <Header className="bg-white dark:bg-secondary-900 border-b border-border dark:border-secondary-800 shadow-soft z-10 relative shrink-0" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 overflow-hidden"
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
        {/* Left Panel */}
        <motion.aside variants={itemVariants} className="w-full md:w-[60%] overflow-y-auto p-4 md:p-6 bg-surface-secondary dark:bg-secondary-900 transition-colors duration-300">
          <TabNavigation />
          
          <div className="pb-12">
            {activeTab === 'content' ? (
              <ContentPanel />
            ) : (
              <StylingPanel />
            )}
          </div>
        </motion.aside>
        
        {/* Right Panel */}
        <motion.main variants={itemVariants} className="hidden md:flex flex-1 bg-surface-primary dark:bg-secondary-950 items-center justify-center p-4 lg:p-8 transition-colors duration-300 overflow-hidden">
          <div 
            className="flex items-center justify-center origin-center transition-transform"
            style={{ transform: `scale(${frameScale})` }}
          >
            <MobileFrame />
          </div>
        </motion.main>
      </motion.div>
      <MobilePreviewModal />
    </div>
  );
};
