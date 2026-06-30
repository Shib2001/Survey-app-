import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeTab: 'content' as 'content' | 'styling',
  },
  reducers: {
    setActiveTab(state, action: PayloadAction<'content' | 'styling'>) {
      state.activeTab = action.payload;
    }
  }
});

export const { setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
