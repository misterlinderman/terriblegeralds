/** Public URL for the home hero reel. Override via VITE_HERO_VIDEO_URL in client/.env. */
export const DEFAULT_HERO_VIDEO = '/media/hero/terrible-geralds-hero-260725-1.mp4';

export const HERO_VIDEO_URL =
  import.meta.env.VITE_HERO_VIDEO_URL?.trim() || DEFAULT_HERO_VIDEO;
