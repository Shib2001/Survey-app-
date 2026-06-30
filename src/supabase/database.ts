import { supabase } from './config';

// Save survey config to Supabase
export const saveSurveyConfig = async (userId: string, config: any) => {
  const { error } = await supabase
    .from('surveys')
    .upsert({ 
      id: userId, 
      config: config,
      updated_at: new Date().toISOString() 
    });

  if (error) {
    console.error('Error saving survey:', error);
    throw error;
  }
};

// Load survey config from Supabase
export const loadSurveyConfig = async (userId: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('config')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error loading survey:', error);
    return null;
  }
  return data?.config || null;
};

// Real-time listener for collaborative editing
export const subscribeSurveyConfig = (userId: string, callback: (data: any) => void) => {
  const subscription = supabase
    .channel(`survey_${userId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'surveys', filter: `id=eq.${userId}` },
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
