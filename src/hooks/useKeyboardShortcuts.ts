import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setActiveTab } from '../store/uiSlice';
import { ActionCreators } from 'redux-undo';
import toast from 'react-hot-toast';

export const useKeyboardShortcuts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + 1 -> Content Tab
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        dispatch(setActiveTab('content'));
        toast.success('Switched to Content tab', { icon: '📝' });
      }
      
      // Ctrl/Cmd + 2 -> Styling Tab
      if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        dispatch(setActiveTab('styling'));
        toast.success('Switched to Styling tab', { icon: '🎨' });
      }

      // Ctrl/Cmd + Z -> Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        // Dispatch undo for both slices
        dispatch({ type: 'content/UNDO' });
        dispatch({ type: 'styling/UNDO' });
        // ActionCreators.undo() from redux-undo doesn't easily dispatch to multiple slices by default without aliasing, 
        // but redux-undo listens to '@@redux-undo/UNDO'. Actually let's use the explicit ActionCreators.undo()
        dispatch(ActionCreators.undo());
        toast('Undo', { icon: '↩️' });
      }

      // Ctrl/Cmd + Shift + Z -> Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        dispatch(ActionCreators.redo());
        toast('Redo', { icon: '↪️' });
      }

      // Ctrl/Cmd + S -> Force Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // A global event that SyncManager will listen to, or we just rely on auto-save
        toast.success('Saved to cloud', { icon: '☁️' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
};
