import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';
import { supabase } from '../../supabase/config';
import { saveSurveyConfig } from '../../supabase/database';
import toast from 'react-hot-toast';

export const SyncManager: React.FC = () => {
  const content = useAppSelector(state => state.content.present);
  const styling = useAppSelector(state => state.styling.present);
  const isFirstRender = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't save on the very first render Mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const syncToCloud = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return; // Only sync if logged in

      try {
        await saveSurveyConfig(session.user.id, { content, styling });
        console.log('Synced to Supabase at', new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Auto-save failed:', err);
        toast.error('Failed to auto-save to cloud', { id: 'autosave-error' });
      }
    };

    // Debounce the save operation by 1000ms
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      syncToCloud();
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [content, styling]);

  return null; // Headless component
};
