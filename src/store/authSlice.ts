import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: { id: string; email: string } | null;
  isAuthModalOpen: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthModalOpen: false,
  isLoading: true, // starts loading to check initial session
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; email: string } | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setAuthModalOpen(state, action: PayloadAction<boolean>) {
      state.isAuthModalOpen = action.payload;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});

export const { setUser, setAuthModalOpen, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
