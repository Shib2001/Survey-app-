import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Plus, GripVertical } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateQuestion, addOption, removeOption } from '../../store/contentSlice';
import type { QuestionPage, QuestionType, RangeSettings, RatingSettings } from '../../store/types';
import { motion } from 'framer-motion';

interface Props {
  questionId: string;
  index: number;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'single_choice', label: 'Single Choice (Radio)' },
  { value: 'multiple_choice', label: 'Multiple Choice (Checkboxes)' },
  { value: 'text', label: 'Text Input' },
  { value: 'range', label: 'Slider / Range' },
  { value: 'rating', label: 'Rating' },
];

export const QuestionPageEditor: React.FC<Props> = ({ questionId, index }) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((state) => 
    state.content.present.questions.find((q) => q.id === questionId)
  );
  
  const [isOpen, setIsOpen] = useState(index === 0);

  if (!question) return null;

  const handleChange = (field: keyof QuestionPage, value: any) => {
    dispatch(updateQuestion({ id: question.id, updates: { [field]: value } }));
  };

  const handleRangeChange = (field: keyof RangeSettings, value: any) => {
    const current = question.rangeSettings || { min: 1, max: 10, step: 1, leftLabel: 'Min', rightLabel: 'Max' };
    handleChange('rangeSettings', { ...current, [field]: value });
  };

  const handleRatingChange = (field: keyof RatingSettings, value: any) => {
    const current = question.ratingSettings || { maxStars: 5, shape: 'star' };
    handleChange('ratingSettings', { ...current, [field]: value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)' }}
      className="mb-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-border dark:border-secondary-700 transition-all duration-300 p-0 overflow-hidden"
    >
      {/* Accordion Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-surface-secondary dark:bg-secondary-900/50 hover:bg-surface-hover dark:hover:bg-secondary-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <span className="font-semibold text-content dark:text-secondary-100">{question.title || `Question ${index + 1}`}</span>
        </div>
        <div className="text-content-secondary dark:text-secondary-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-6 flex flex-col gap-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => handleChange('type', e.target.value as QuestionType)}
                className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
              >
                {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-content dark:text-secondary-300">Question Title</label>
            <input 
              type="text" 
              value={question.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="e.g. How did you hear about us?"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-content dark:text-secondary-300">Subtitle (Optional)</label>
            <textarea 
              value={question.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="min-h-[80px] rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 p-3 focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="e.g. Please select all that apply"
            />
          </div>

          {/* Type-Specific Editors */}
          
          {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-content dark:text-secondary-300">Options</label>
              {question.options.map((opt, optIndex) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <div className="text-border dark:text-secondary-600 cursor-grab">
                    <GripVertical size={20} />
                  </div>
                  <input 
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[optIndex] = { ...opt, text: e.target.value };
                      handleChange('options', newOptions);
                    }}
                    className="flex-1 h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <button 
                    onClick={() => dispatch(removeOption({ questionId: question.id, optionId: opt.id }))}
                    disabled={question.options.length <= 2}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => dispatch(addOption(question.id))}
                className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors w-max"
              >
                <Plus size={16} /> Add Option
              </button>
            </div>
          )}

          {question.type === 'range' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-surface-secondary dark:bg-secondary-900/50 rounded-xl border border-border dark:border-secondary-700">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Min Value</label>
                <input type="number" value={question.rangeSettings?.min ?? 1} onChange={e => handleRangeChange('min', parseInt(e.target.value))} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Max Value</label>
                <input type="number" value={question.rangeSettings?.max ?? 10} onChange={e => handleRangeChange('max', parseInt(e.target.value))} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Left Label</label>
                <input type="text" value={question.rangeSettings?.leftLabel ?? 'Min'} onChange={e => handleRangeChange('leftLabel', e.target.value)} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Right Label</label>
                <input type="text" value={question.rangeSettings?.rightLabel ?? 'Max'} onChange={e => handleRangeChange('rightLabel', e.target.value)} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm" />
              </div>
            </div>
          )}

          {question.type === 'rating' && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-surface-secondary dark:bg-secondary-900/50 rounded-xl border border-border dark:border-secondary-700">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Max Stars/Items</label>
                <input type="number" value={question.ratingSettings?.maxStars ?? 5} onChange={e => handleRatingChange('maxStars', parseInt(e.target.value))} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-content-secondary dark:text-secondary-400">Shape</label>
                <select value={question.ratingSettings?.shape ?? 'star'} onChange={e => handleRatingChange('shape', e.target.value)} className="h-9 rounded-md border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-2 text-sm">
                  <option value="star">Star</option>
                  <option value="heart">Heart</option>
                  <option value="thumb">Thumb</option>
                </select>
              </div>
            </div>
          )}

          {/* Additional Settings */}
          <div className="h-px bg-border dark:bg-secondary-700 my-2" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-content dark:text-secondary-300">Allow "Other" or comments?</p>
              <p className="text-xs text-content-secondary dark:text-secondary-500">Adds a text box below options.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={question.additionalComments} onChange={(e) => handleChange('additionalComments', e.target.checked)} />
              <div className="w-11 h-6 bg-border dark:bg-secondary-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-content dark:text-secondary-300">Submit Button Text</label>
            <input 
              type="text" 
              value={question.submitButtonText}
              onChange={(e) => handleChange('submitButtonText', e.target.value)}
              className="h-10 rounded-lg border border-border dark:border-secondary-700 bg-white dark:bg-secondary-950 text-content dark:text-secondary-50 px-3 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

        </div>
      )}
    </motion.div>
  );
};
