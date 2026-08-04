import { createContext } from 'react';
import type { ThemePreset } from '../types';

export interface SiteThemeContextValue {
  theme: ThemePreset;
  refreshTheme: () => Promise<void>;
}

export const SiteThemeContext = createContext<SiteThemeContextValue | undefined>(undefined);
