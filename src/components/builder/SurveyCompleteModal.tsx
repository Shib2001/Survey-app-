import React from 'react';
import { CheckCircle, Share2, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  surveyId: string;
}

export const SurveyCompleteModal: React.FC<Props> = ({ isOpen, onClose, surveyId }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/survey/${surveyId}`);
    toast.success('Survey link copied!');
  };

  const handleGoDashboard = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 text-center p-8 relative">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600 dark:text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your survey form is complete
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Your survey has been successfully saved. What would you like to do next?
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Share2 size={18} />
            Copy link share survey
          </button>
          
          <button 
            onClick={handleGoDashboard}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 dark:bg-secondary-800 hover:bg-gray-200 dark:hover:bg-secondary-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg transition-colors"
          >
            <LayoutDashboard size={18} />
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
