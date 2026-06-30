import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import type { ContentState, QuestionPage, ThankYouPage } from './types';

const initialState: ContentState = {
  numberOfPages: 1,
  questions: [
    {
      id: uuid(),
      type: 'single_choice',
      title: 'Question 1',
      subtitle: 'Please select an option',
      options: [
        { id: uuid(), text: 'Option 1' },
        { id: uuid(), text: 'Option 2' },
      ],
      additionalComments: false,
      logic: [],
      submitButtonText: 'Next',
    }
  ],
  thankYouPage: {
    enabled: true,
    mediaUrl: null,
    mediaType: null,
    title: 'Thank You!',
    subtitle: 'Your response has been recorded.',
    ctaButtonText: 'Finish',
    redirectType: 'none',
    redirectUrl: '',
  }
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setNumberOfPages(state, action: PayloadAction<number>) {
      const count = action.payload;
      if (count > state.questions.length) {
        // Add new questions with defaults
        for (let i = state.questions.length; i < count; i++) {
          state.questions.push({
            id: uuid(),
            type: 'single_choice',
            title: `Question ${i + 1}`,
            subtitle: '',
            options: [
              { id: uuid(), text: 'Option 1' },
              { id: uuid(), text: 'Option 2' },
            ],
            additionalComments: false,
            logic: [],
            submitButtonText: 'Next',
          });
        }
      } else {
        state.questions = state.questions.slice(0, count);
      }
      state.numberOfPages = count;
    },
    updateQuestion(state, action: PayloadAction<{ id: string; updates: Partial<QuestionPage> }>) {
      const q = state.questions.find(q => q.id === action.payload.id);
      if (q) Object.assign(q, action.payload.updates);
    },
    addOption(state, action: PayloadAction<string>) {
      const q = state.questions.find(q => q.id === action.payload);
      if (q) q.options.push({ id: uuid(), text: `Option ${q.options.length + 1}` });
    },
    removeOption(state, action: PayloadAction<{ questionId: string; optionId: string }>) {
      const q = state.questions.find(q => q.id === action.payload.questionId);
      if (q && q.options.length > 2) {
        q.options = q.options.filter(o => o.id !== action.payload.optionId);
      }
    },
    updateThankYouPage(state, action: PayloadAction<Partial<ThankYouPage>>) {
      Object.assign(state.thankYouPage, action.payload);
    },
    updateContent(_state, action: PayloadAction<ContentState>) {
      return action.payload;
    },
    resetContent() {
      return initialState;
    }
  },
});

export const { setNumberOfPages, updateQuestion, addOption, removeOption, updateThankYouPage, updateContent, resetContent } = contentSlice.actions;
export default contentSlice.reducer;
