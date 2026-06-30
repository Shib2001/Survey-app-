import React, { useEffect } from 'react';

export const GoogleFontLoader: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  useEffect(() => {
    if (!fontFamily) return;
    
    const fontId = `google-font-${fontFamily.replace(/\s+/g, '-')}`;
    if (document.getElementById(fontId)) return;

    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap`;
    document.head.appendChild(link);
  }, [fontFamily]);

  return null;
};
