
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      return savedTheme as Theme;
    }
    return 'light';
  });
  
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  
  // Effect to detect system preference
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial system theme
    setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    darkModeQuery.addEventListener('change', handleChange);
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Effect to apply theme
  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const themeOrder: Theme[] = ['light', 'dark', 'system'];
      const currentIndex = themeOrder.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      return themeOrder[nextIndex];
    });
  };
  
  const actualTheme = theme === 'system' ? systemTheme : theme;
  
  return { theme, actualTheme, toggleTheme };
};
