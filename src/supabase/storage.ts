import { supabase } from './config';

export const uploadMedia = async (userId: string, file: File): Promise<string> => {
  const filePath = `${userId}/${Date.now()}_${file.name}`;
  
  const { error } = await supabase.storage
    .from('survey-media') // Ensure you create a public bucket named "survey-media" in Supabase
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading media:', error);
    throw error;
  }

  // Get public URL
  const { data } = supabase.storage
    .from('survey-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
