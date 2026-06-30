import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import undoable from 'redux-undo';
// Custom storage to bypass Vite's ESM/CJS interop issues with redux-persist
const storage = {
  getItem(key: string) {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};
import contentReducer from './contentSlice';
import stylingReducer from './stylingSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'survey-builder',
  storage,
  whitelist: ['content', 'styling'],
};

const rootReducer = combineReducers({
  content: undoable(contentReducer),
  styling: undoable(stylingReducer),
  ui: uiReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
