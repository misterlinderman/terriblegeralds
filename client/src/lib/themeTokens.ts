import type { ThemePreset } from '../types';

export type ThemeFormData = Omit<ThemePreset, '_id' | 'active'>;

/** Matches server/src/constants/defaultTheme.ts */
export const DEFAULT_THEME_TOKENS: ThemeFormData = {
  name: 'Season 3 · Vol. 6',
  bone: '#F1E6D2',
  bone2: '#E8D8BC',
  cream: '#FBF5E8',
  ink: '#17120D',
  inkSoft: '#2C241B',
  red: '#C8341B',
  redDeep: '#971F0F',
  gold: '#E8A11E',
  goldDeep: '#C9851A',
  teal: '#2E7C78',
  paperLine: 'rgba(23,18,13,.14)',
  fontDisplay: '"tomarik-display","DM Serif Display",Georgia,serif',
  fontEditorial: '"new-spirit","Fraunces",Georgia,serif',
  fontAccent: '"new-spirit","Fraunces",Georgia,serif',
  fontBody: '"Hanken Grotesk",system-ui,sans-serif',
  fontMono: '"Space Mono",monospace',
  displayTracking: '-.1em',
  buttonTracking: '-.07em',
  sortOrder: 0,
};

export type ThemeTokenInput = ThemeFormData;

export function themeToCssVars(
  theme: Pick<
    ThemePreset,
    | 'bone'
    | 'bone2'
    | 'cream'
    | 'ink'
    | 'inkSoft'
    | 'red'
    | 'redDeep'
    | 'gold'
    | 'goldDeep'
    | 'teal'
    | 'paperLine'
    | 'fontDisplay'
    | 'fontEditorial'
    | 'fontAccent'
    | 'fontBody'
    | 'fontMono'
    | 'displayTracking'
    | 'buttonTracking'
  >
): Record<string, string> {
  return {
    '--bone': theme.bone,
    '--bone-2': theme.bone2,
    '--cream': theme.cream,
    '--ink': theme.ink,
    '--ink-soft': theme.inkSoft,
    '--red': theme.red,
    '--red-deep': theme.redDeep,
    '--gold': theme.gold,
    '--gold-deep': theme.goldDeep,
    '--teal': theme.teal,
    '--paper-line': theme.paperLine,
    '--font-display': theme.fontDisplay,
    '--font-serif': theme.fontEditorial,
    '--font-editorial': theme.fontEditorial,
    '--font-accent': theme.fontAccent,
    '--font-body': theme.fontBody,
    '--font-mono': theme.fontMono,
    '--display-tracking': theme.displayTracking,
    '--button-tracking': theme.buttonTracking,
    '--surface-page': theme.bone,
    '--surface-panel': theme.bone2,
    '--surface-card': theme.cream,
    '--surface-inverse': theme.ink,
    '--text-primary': theme.ink,
    '--text-secondary': theme.inkSoft,
    '--text-on-inverse': theme.cream,
    '--text-on-inverse-muted': '#e9dcc4',
    '--border-default': theme.ink,
    '--border-accent': theme.red,
    '--accent-primary': theme.red,
    '--accent-primary-shadow': theme.redDeep,
    '--accent-secondary': theme.gold,
    '--accent-secondary-shadow': theme.goldDeep,
    '--accent-tertiary': theme.teal,
    '--link-color': theme.red,
    '--link-color-hover': theme.redDeep,
    '--text-display': theme.fontDisplay,
    '--text-editorial': theme.fontEditorial,
    '--text-accent': theme.fontAccent,
    '--text-body': theme.fontBody,
    '--text-code': theme.fontMono,
  };
}

export function applyThemeToDocument(theme: ThemeTokenInput | ThemePreset): void {
  const root = document.documentElement;
  const vars = themeToCssVars(theme);
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function themePresetToForm(theme: ThemePreset): ThemeFormData {
  return {
    name: theme.name,
    bone: theme.bone,
    bone2: theme.bone2,
    cream: theme.cream,
    ink: theme.ink,
    inkSoft: theme.inkSoft,
    red: theme.red,
    redDeep: theme.redDeep,
    gold: theme.gold,
    goldDeep: theme.goldDeep,
    teal: theme.teal,
    paperLine: theme.paperLine,
    fontDisplay: theme.fontDisplay,
    fontEditorial: theme.fontEditorial,
    fontAccent: theme.fontAccent,
    fontBody: theme.fontBody,
    fontMono: theme.fontMono,
    displayTracking: theme.displayTracking,
    buttonTracking: theme.buttonTracking,
    sortOrder: theme.sortOrder,
  };
}
