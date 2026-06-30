import React from 'react';
import { Minus, Plus, Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setNumberOfPages } from '../../store/contentSlice';
import toast from 'react-hot-toast';

export const IntroductionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const numberOfPages = useAppSelector((state) => state.content.present.numberOfPages);
  
  const handleIncrease = () => {
    dispatch(setNumberOfPages(numberOfPages + 1));
  };
  
  const handleDecrease = () => {
    if (numberOfPages > 1) {
      toast.success(`Removed Question ${numberOfPages}`);
      dispatch(setNumberOfPages(numberOfPages - 1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
      if (val < numberOfPages) {
        toast.success(`Removed Questions down to ${val}`);
      }
      dispatch(setNumberOfPages(val));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-border dark:border-secondary-700 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-content dark:text-secondary-50 transition-colors duration-300">Introduction</h2>
          <p className="text-sm text-content-secondary dark:text-secondary-400 transition-colors duration-300">Configure the base settings for your survey.</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-content dark:text-secondary-100 transition-colors duration-300">
          Number of Survey Pages
        </label>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDecrease}
            disabled={numberOfPages <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-secondary-700 bg-surface-secondary dark:bg-secondary-900 text-content dark:text-secondary-300 hover:bg-surface-hover dark:hover:bg-secondary-700 disabled:opacity-50 transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <input 
            type="number" 
            min={1}
            value={numberOfPages}
            onChange={handleChange}
            className="w-20 h-10 text-center rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
          />
          
          <button 
            onClick={handleIncrease}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-border dark:border-secondary-700 bg-surface-secondary dark:bg-secondary-900 text-content dark:text-secondary-300 hover:bg-surface-hover dark:hover:bg-secondary-700 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <p className="text-xs text-content-secondary dark:text-secondary-500 mt-2 transition-colors duration-300">
          This automatically creates or removes question pages in your builder.
        </p>
      </div>
    </div>
  );
};
