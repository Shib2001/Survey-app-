import React, { useState, useEffect, useRef } from 'react';
import { LayoutTemplate, User, Moon, Sun, Download, Upload, LogOut, LayoutDashboard, Save, RotateCcw, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/config';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateStyling } from '../../store/stylingSlice';
import { setAuthModalOpen, setUser as setReduxUser } from '../../store/authSlice';
import { AccountModal } from '../auth/AccountModal';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateSurvey, createSurvey } from '../../supabase/database';
import { resetContent } from '../../store/contentSlice';
import { resetStyling } from '../../store/stylingSlice';
import { SurveyCompleteModal } from '../builder/SurveyCompleteModal';
import { ResetConfirmModal } from '../builder/ResetConfirmModal';
import Swal from 'sweetalert2';
import logoUrl from '../../assets/logo.png';

export const Header: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [savedSurveyId, setSavedSurveyId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const contentState = useAppSelector(state => state.content.present);
  const stylingState = useAppSelector(state => state.styling.present);
  const user = useAppSelector(state => state.auth.user);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isBuilderMode = location.pathname.startsWith('/builder');

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setReduxUser(session?.user ? { id: session.user.id, email: session.user.email || '' } : null));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setReduxUser(session?.user ? { id: session.user.id, email: session.user.email || '' } : null));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  // Theme and Custom Event Listeners
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    const onSave = () => handleSave();
    const onReset = () => handleReset();
    document.addEventListener('save-survey', onSave);
    document.addEventListener('reset-survey', onReset);

    return () => {
      document.removeEventListener('save-survey', onSave);
      document.removeEventListener('reset-survey', onReset);
    };
  }, [user, id, contentState, stylingState]);

  const handleSignIn = () => {
    dispatch(setAuthModalOpen(true));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    dispatch(resetContent());
    dispatch(resetStyling());
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleSave = async () => {
    if (!user) {
      Swal.fire({
        title: 'Sign In Required',
        text: 'Sign in first to save your form',
        icon: 'warning',
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'Sign In'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setAuthModalOpen(true));
        }
      });
      return;
    }

    try {
      if (id && id !== 'new') {
        await updateSurvey(id, contentState.questions[0]?.title || 'Untitled Survey', { content: contentState, styling: stylingState });
        setSavedSurveyId(id);
      } else {
        const survey = await createSurvey(user.id, contentState.questions[0]?.title || 'Untitled Survey', { content: contentState, styling: stylingState });
        setSavedSurveyId(survey.id);
      }
      
      // Reset content automatically
      dispatch(resetContent());
      dispatch(resetStyling());
      
      // Show success modal
      setCompleteModalOpen(true);
    } catch (error) {
      toast.error('Failed to save survey');
    }
  };

  const handleReset = () => {
    setResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    dispatch(resetContent());
    dispatch(resetStyling());
    toast.success('Survey has been reset');
  };

  const handleExport = () => {
    const config = { content: contentState, styling: stylingState };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-campaign-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Configuration exported!', { icon: '⬇️' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.content && json.styling) {
          dispatch(updateStyling(json.styling));
          dispatch({ type: 'content/UPDATE_ALL', payload: json.content });
          toast.success('Configuration imported!', { icon: '⬆️' });
        } else {
          toast.error('Invalid configuration file');
        }
      } catch (err) {
        toast.error('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleTheme = (e: React.MouseEvent) => {
    const nextTheme = !isDark;
    
    if (!(document as any).startViewTransition) {
      document.documentElement.classList.toggle('dark');
      setIsDark(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    document.documentElement.classList.add('disable-transitions');

    const transition = (document as any).startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
      setIsDark(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: nextTheme ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: nextTheme ? '::view-transition-new(root)' : '::view-transition-old(root)',
          fill: 'forwards',
        }
      );
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove('disable-transitions');
    });
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 120 }}
    >
      <header className={`flex items-center justify-between px-4 sm:px-6 py-4 dark:bg-secondary-900 dark:border-secondary-800 ${className}`}>
        <div className="flex items-center gap-3">
          {/* Hamburger Menu (Mobile Dashboard) */}
          {!isBuilderMode && (
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
              onClick={() => {
                // Dispatch event to open sidebar drawer
                document.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
              }}
            >
              <Menu size={24} />
            </button>
          )}

          <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-sm">
            <img src={logoUrl} alt="Survey Campaign Builder Logo" className="w-7 h-7 object-contain" />
          </div>
          <Link to="/">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-red-500 to-primary-400 animate-pulse hover:opacity-80 transition-opacity"
            >
              Survey Campaign Builder
            </motion.h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {isBuilderMode && (
            <div className="flex items-center gap-1 sm:gap-2 border-r border-border dark:border-secondary-800 pr-2 sm:pr-4 mr-1 sm:mr-2">
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('open-mobile-preview'))}
                className="md:hidden flex items-center gap-1 px-2.5 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors text-xs font-semibold"
              >
                <span>Preview</span>
              </button>

              <button 
                onClick={handleReset}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                title="Reset"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors text-sm font-medium"
                title="Save"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          )}

          {isBuilderMode && (
            <div className="flex items-center gap-1 border-r border-border dark:border-secondary-800 pr-2 sm:pr-4 mr-1 sm:mr-2">
              {user && (
                <Link to="/" className="hidden sm:flex p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors" title="Dashboard">
                  <LayoutDashboard size={18} />
                </Link>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImport} 
                accept=".json" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="hidden sm:flex p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
                title="Import Config (JSON)"
              >
                <Upload size={18} />
              </button>
              <button 
                onClick={handleExport}
                className="hidden sm:flex p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
                title="Export Config (JSON)"
              >
                <Download size={18} />
              </button>
            </div>
          )}

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-1 sm:gap-3 ml-1 sm:ml-2">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-content-secondary dark:text-secondary-300 bg-gray-50 dark:bg-secondary-800 px-3 py-1.5 rounded-lg border border-border dark:border-secondary-700">
                <span className="truncate max-w-[120px]">{user.email.split('@')[0]}</span>
              </div>
              <button 
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
                title="Account Settings"
              >
                <User size={18} />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors text-content-secondary dark:text-secondary-300"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 transition-colors text-sm font-medium text-content-secondary dark:text-secondary-300"
            >
              <User size={18} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </header>
      
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
        user={user} 
      />

      <SurveyCompleteModal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        surveyId={savedSurveyId}
      />

      <ResetConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </motion.div>
  );
};
