import { supabase } from './config';

export interface SurveyRecord {
  id: string;
  user_id: string;
  name: string;
  config: any;
  created_at: string;
  updated_at: string;
}

// ─── Survey Operations ───────────────────────────────────

export const createSurvey = async (userId: string, name: string, config: any) => {
  const { data, error } = await supabase
    .from('surveys')
    .insert([{ user_id: userId, name, config }])
    .select()
    .single();

  if (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
  return data;
};

export const updateSurvey = async (surveyId: string, name: string, config: any) => {
  const { data, error } = await supabase
    .from('surveys')
    .update({ name, config, updated_at: new Date().toISOString() })
    .eq('id', surveyId)
    .select()
    .single();

  if (error) {
    console.error('Error updating survey:', error);
    throw error;
  }
  return data;
};

export const getSurveys = async (userId: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching surveys:', error);
    return [];
  }
  return data as SurveyRecord[];
};

export const getSurveyById = async (surveyId: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', surveyId)
    .single();

  if (error) {
    console.error('Error fetching survey by id:', error);
    return null;
  }
  return data as SurveyRecord;
};

export const deleteSurvey = async (surveyId: string) => {
  const { error } = await supabase
    .from('surveys')
    .delete()
    .eq('id', surveyId);

  if (error) {
    console.error('Error deleting survey:', error);
    throw error;
  }
};

// ─── Response Operations ─────────────────────────────────

export const submitResponse = async (surveyId: string, answers: any) => {
  const { error } = await supabase
    .from('responses')
    .insert([{ survey_id: surveyId, answers }]);

  if (error) {
    console.error('Error submitting response:', error);
    throw error;
  }
};

// Real-time listener for collaborative editing (if still needed)
export const subscribeSurveyConfig = (surveyId: string, callback: (data: any) => void) => {
  const subscription = supabase
    .channel(`survey_${surveyId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'surveys', filter: `id=eq.${surveyId}` },
      (payload) => {
        if (payload.new && 'config' in payload.new) {
          callback(payload.new.config);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
