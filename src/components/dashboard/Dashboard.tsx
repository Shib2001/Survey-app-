import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getSurveys, deleteSurvey, type SurveyRecord } from '../../supabase/database';
import toast from 'react-hot-toast';
import { setAuthModalOpen } from '../../store/authSlice';
import { Header } from '../layout/Header';

import { Sidebar, type SidebarView } from './Sidebar';
import { SurveysView } from './SurveysView';
import { ContentView } from './ContentView';
import { AnalyticsView } from './AnalyticsView';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { AnimatedPerimeter } from '../layout/AnimatedPerimeter';

export const Dashboard: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<SidebarView>('surveys');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadSurveys();
    } else {
      setSurveys([]);
      setLoading(false);
    }
  }, [user]);

  const loadSurveys = async () => {
    setLoading(true);
    if (!user) return;
    try {
      const data = await getSurveys(user.id);
      setSurveys(data);
    } catch {
      toast.error('Failed to load surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSurveyToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!surveyToDelete) return;
    try {
      await deleteSurvey(surveyToDelete);
      setSurveys(surveys.filter(s => s.id !== surveyToDelete));
      toast.success('Survey deleted');
    } catch {
      toast.error('Failed to delete survey');
    } finally {
      setSurveyToDelete(null);
    }
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/survey/${id}`);
    toast.success('Survey link copied!');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'surveys':
        return (
          <SurveysView
            user={user}
            surveys={surveys}
            loading={loading}
            onDelete={handleDeleteClick}
            onShare={handleShare}
            onSignIn={() => dispatch(setAuthModalOpen(true))}
          />
        );
      case 'content':
        return <ContentView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen h-[100dvh] bg-surface-secondary dark:bg-secondary-900 font-sans flex flex-col relative">
      <AnimatedPerimeter />
      <Header className="bg-surface dark:bg-secondary-900 border-b border-border dark:border-secondary-800 z-10 relative shadow-sm" />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar active={activeView} onChange={(view) => {
          if (!user && view === 'analytics') {
            toast('Please login first to see the analytics', { icon: '🔒' });
            return;
          }
          setActiveView(view);
        }} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      <DeleteConfirmModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};
