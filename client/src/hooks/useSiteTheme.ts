import { useContext } from 'react';
import { SiteThemeContext } from '../context/siteThemeContext';

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error('useSiteTheme must be used within SiteThemeProvider');
  }
  return context;
}
