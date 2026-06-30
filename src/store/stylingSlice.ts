import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StylingState } from './types';

// Mock initial state with basic defaults for Phase 2
const initialState: StylingState = {
  appearance: {
    backgroundColor: '#ffffff',
    cornerRadius: { topLeft: 32, topRight: 32, bottomLeft: 32, bottomRight: 32 },
    delaySeconds: 0,
    backdropColor: '#000000',
    backdropOpacity: 0.5,
  },
  questionTitle: { color: '#0F172A', fontFamily: 'Inter', fontSize: 26, fontWeight: 800, bold: true, italic: false, underline: false, alignment: 'left', margin: { top: 12, bottom: 8, left: 0, right: 0 } },
  subtitle: { color: '#64748B', fontFamily: 'Inter', fontSize: 16, fontWeight: 400, bold: false, italic: false, underline: false, alignment: 'left', margin: { top: 0, bottom: 32, left: 0, right: 0 } },
  optionList: { layout: 'radio', optionHeight: 56, bulletSpacing: 12, optionSpacing: 12, cornerRadius: { topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16 } },
  selectedOption: { borderColor: '#DC2626', textColor: '#DC2626', backgroundColor: '#FEF2F2', borderWidth: 2, fontFamily: 'Inter', fontSize: 16, fontWeight: 600, fontStyle: { bold: false, italic: false, underline: false }, alignment: 'left' },
  unselectedOption: { borderColor: '#F1F5F9', textColor: '#334155', backgroundColor: '#F8FAFC', borderWidth: 2, fontFamily: 'Inter', fontSize: 16, fontWeight: 500, fontStyle: { bold: false, italic: false, underline: false }, alignment: 'left' },
  additionalComment: { borderColor: '#E2E8F0', textColor: '#0F172A', backgroundColor: '#FFFFFF', borderWidth: 1, fontFamily: 'Inter', fontSize: 14, fontWeight: 400, fontStyle: { bold: false, italic: false, underline: false }, alignment: 'left' },
  ctaButton: { fullWidth: true, borderColor: '#DC2626', textColor: '#FFFFFF', backgroundColor: '#DC2626', fontFamily: 'Inter', fontSize: 18, fontStyle: { bold: true, italic: false, underline: false }, height: 56, width: 200, borderWidth: 0, cornerRadius: { topLeft: 28, topRight: 28, bottomLeft: 28, bottomRight: 28 }, alignment: 'center', margin: { top: 32, bottom: 0, left: 0, right: 0 } },
  crossButton: { enabled: true, style: 'default', customIcon: null, crossColor: '#94A3B8', fillColor: 'transparent', strokeColor: 'transparent', size: 24, margin: { top: 20, bottom: 0, left: 0, right: 20 } },
  thankYouTitle: { color: '#0F172A', fontFamily: 'Inter', fontSize: 28, fontWeight: 800, bold: true, italic: false, underline: false, alignment: 'center', margin: { top: 0, bottom: 12, left: 0, right: 0 } },
  thankYouSubtitle: { color: '#64748B', fontFamily: 'Inter', fontSize: 16, fontWeight: 400, bold: false, italic: false, underline: false, alignment: 'center', margin: { top: 0, bottom: 32, left: 0, right: 0 } },
  thankYouImage: { width: 120, height: 120, margin: { top: 0, bottom: 24, left: 0, right: 0 } },
  thankYouButton: { fullWidth: true, borderColor: '#DC2626', textColor: '#FFFFFF', backgroundColor: '#DC2626', fontFamily: 'Inter', fontSize: 18, fontStyle: { bold: true, italic: false, underline: false }, height: 56, width: 200, borderWidth: 0, cornerRadius: { topLeft: 28, topRight: 28, bottomLeft: 28, bottomRight: 28 }, alignment: 'center', margin: { top: 24, bottom: 0, left: 0, right: 0 } },
};

const stylingSlice = createSlice({
  name: 'styling',
  initialState,
  reducers: {
    updateStyling(state, action: PayloadAction<Partial<StylingState>>) {
      Object.assign(state, action.payload);
    },
    resetStyling() {
      return initialState;
    }
  }
});

export const { updateStyling, resetStyling } = stylingSlice.actions;
export default stylingSlice.reducer;
