import React, { useState } from 'react';
import { Image as ImageIcon, UploadCloud, Link as LinkIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateThankYouPage } from '../../store/contentSlice';
import type { ThankYouPage } from '../../store/types';
import toast from 'react-hot-toast';
import { uploadMedia } from '../../supabase/storage';

export const ThankYouPageEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const thankYouPage = useAppSelector((state) => state.content.present.thankYouPage);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = (field: keyof ThankYouPage, value: any) => {
    dispatch(updateThankYouPage({ [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const loadingToast = toast.loading('Uploading media to Supabase...');
    
    try {
      // Use a dummy user ID for now, since we haven't implemented full auth yet
      const userId = 'demo-user';
      const publicUrl = await uploadMedia(userId, file);
      
      handleChange('mediaUrl', publicUrl);
      
      if (file.type.includes('image/gif')) handleChange('mediaType', 'gif');
      else if (file.name.endsWith('.json')) handleChange('mediaType', 'lottie');
      else handleChange('mediaType', 'image');
      
      toast.success('Media uploaded successfully!', { id: loadingToast });
    } catch (error) {
      toast.error('Upload failed. Ensure Supabase storage is public.', { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-border dark:border-secondary-700 transition-colors duration-300 overflow-hidden mt-6">
      <div className="p-6">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-content dark:text-secondary-50 transition-colors duration-300">Thank You Page</h2>
            <p className="text-sm text-content-secondary dark:text-secondary-400 transition-colors duration-300">Shown after the survey is completed.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={thankYouPage.enabled} onChange={(e) => handleChange('enabled', e.target.checked)} />
            <div className="w-11 h-6 bg-border dark:bg-secondary-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>

        {thankYouPage.enabled && (
          <div className="flex flex-col gap-6">
            
            {/* Media Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Featured Media</label>
              <div className="border-2 border-dashed border-border dark:border-secondary-700 rounded-xl p-8 flex flex-col items-center justify-center bg-surface-secondary dark:bg-secondary-900/50 hover:bg-surface-hover dark:hover:bg-secondary-800 transition-colors relative">
                {thankYouPage.mediaUrl ? (
                  <div className="flex flex-col items-center gap-4">
                    <img src={thankYouPage.mediaUrl} alt="Preview" className="h-32 object-contain rounded-lg shadow-sm" />
                    <button 
                      onClick={() => { handleChange('mediaUrl', null); handleChange('mediaType', null); }}
                      className="text-sm text-red-500 hover:text-red-600 font-semibold"
                    >
                      Remove Media
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-content-secondary dark:text-secondary-400 text-center">
                    <UploadCloud size={32} className="mb-2" />
                    <p className="text-sm font-semibold text-content dark:text-secondary-200">Click or drag file to upload</p>
                    <p className="text-xs">PNG, JPG, GIF, or Lottie JSON (Max 5MB)</p>
                    <input 
                      type="file" 
                      accept="image/*,.json"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Title</label>
              <input 
                type="text" 
                value={thankYouPage.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Subtitle</label>
              <textarea 
                value={thankYouPage.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="min-h-[80px] rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 p-3 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div className="h-px bg-border dark:bg-secondary-700 my-2" />

            {/* Redirect Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-content dark:text-secondary-300">Button Action</label>
                <select 
                  value={thankYouPage.redirectType}
                  onChange={(e) => handleChange('redirectType', e.target.value)}
                  className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="none">Just close survey</option>
                  <option value="url">Redirect to URL</option>
                </select>
              </div>

              {thankYouPage.redirectType === 'url' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-content dark:text-secondary-300">Redirect URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-secondary dark:text-secondary-500">
                      <LinkIcon size={16} />
                    </div>
                    <input 
                      type="url" 
                      value={thankYouPage.redirectUrl}
                      onChange={(e) => handleChange('redirectUrl', e.target.value)}
                      placeholder="https://example.com"
                      className="h-10 w-full pl-9 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 pr-3 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Button Text</label>
              <input 
                type="text" 
                value={thankYouPage.ctaButtonText}
                onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
