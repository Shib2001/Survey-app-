import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Toaster } from 'react-hot-toast';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { SyncManager } from './components/layout/SyncManager';

function App() {
  useKeyboardShortcuts();
  
  return (
    <>
      <SyncManager />
      <AppLayout />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;
