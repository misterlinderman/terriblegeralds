/** Terrible Gerald's operates in Central Time (Omaha). */
export const SITE_TIMEZONE = 'America/Chicago';

/**
 * Format a stored calendar date for display in Central Time.
 * Legacy records saved as UTC midnight (from `new Date("YYYY-MM-DD")`) are read
 * using UTC so the intended calendar day is preserved.
 */
export function formatCalendarDate(isoDate: string): string {
  const date = new Date(isoDate);

  const isLegacyUtcMidnight =
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0;

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: isLegacyUtcMidnight ? 'UTC' : SITE_TIMEZONE,
  });
}
