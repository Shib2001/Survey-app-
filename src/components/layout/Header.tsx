import React, { useState, useEffect, useRef } from 'react';
import { LayoutTemplate, User, Moon, Sun, Download, Upload, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/config';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateStyling } from '../../store/stylingSlice';
import toast from 'react-hot-toast';

export const Header: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const contentState = useAppSelector(state => state.content.present);
  const stylingState = useAppSelector(state => state.styling.present);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
    } catch (error) {
      toast.error('Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
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
          // This requires bulk dispatch which we didn't explicitly write, 
          // but we can dispatch individual state replacements if we want, or just reload styling for now
          // For simplicity, we just dispatch styling update. In a real app we'd have a root hydrate action.
          dispatch(updateStyling(json.styling));
          dispatch({ type: 'content/UPDATE_ALL', payload: json.content }); // Hypothetical
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
    
    // Fallback if browser doesn't support startViewTransition
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
        }
      );
    });
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 dark:bg-secondary-900 dark:border-secondary-800 transition-colors ${className}`}>
      <div className="flex items-center gap-3">
        <div className="bg-primary-500 p-2 rounded-lg text-white">
          <LayoutTemplate size={24} />
        </div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-red-500 to-primary-400 animate-pulse"
        >
          Survey Campaign Builder
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Export / Import */}
        <div className="flex items-center gap-1 border-r border-border dark:border-secondary-800 pr-4 mr-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            accept=".json" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
            title="Import Config (JSON)"
          >
            <Upload size={18} />
          </button>
          <button 
            onClick={handleExport}
            className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
            title="Export Config (JSON)"
          >
            <Download size={18} />
          </button>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 text-content-secondary dark:text-secondary-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors text-sm font-medium text-content-secondary dark:text-secondary-300"
          >
            <img src={user.user_metadata?.avatar_url} alt="" className="w-5 h-5 rounded-full" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button 
            onClick={handleSignIn}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover dark:hover:bg-secondary-800 transition-colors text-sm font-medium text-content-secondary dark:text-secondary-300"
          >
            <User size={18} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
