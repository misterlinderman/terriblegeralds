import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { applyThemeToDocument, DEFAULT_THEME_TOKENS } from '../lib/themeTokens';
import { fetchActiveTheme } from '../services/contentApi';
import type { ThemePreset } from '../types';
import { SiteThemeContext } from './siteThemeContext';

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreset>({
    ...DEFAULT_THEME_TOKENS,
    sortOrder: 0,
    active: true,
  });

  const refreshTheme = useCallback(async () => {
    const active = await fetchActiveTheme();
    applyThemeToDocument(active);
    setTheme(active);
  }, []);

  useEffect(() => {
    refreshTheme().catch((error) => console.error('Failed to load site theme:', error));
  }, [refreshTheme]);

  const value = useMemo(() => ({ theme, refreshTheme }), [theme, refreshTheme]);

  return <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>;
}
