import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { AuthModal } from './components/auth/AuthModal';
import { SurveyRunner } from './components/survey/SurveyRunner';
import { Toaster } from 'react-hot-toast';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  useKeyboardShortcuts();
  
  return (
    <Router>
      <AuthModal />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder/:id" element={<AppLayout />} />
        <Route path="/survey/:id" element={<SurveyRunner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </Router>
  );
}

export default App;
