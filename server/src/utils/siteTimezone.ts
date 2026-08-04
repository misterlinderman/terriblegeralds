/** Terrible Gerald's operates in Central Time (Omaha). */
export const SITE_TIMEZONE = 'America/Chicago';

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parse a date-only value (YYYY-MM-DD) from an HTML date input as a calendar day
 * in Central Time. Stored at UTC noon so the day stays stable across US timezones.
 */
export function parseCalendarDate(value: string): Date {
  const match = DATE_ONLY_PATTERN.exec(value.trim());
  if (!match) {
    return new Date(NaN);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return new Date(NaN);
  }

  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
}

/**
 * Format a stored calendar date for display in Central Time.
 * Legacy records saved as UTC midnight (from `new Date("YYYY-MM-DD")`) are read
 * using UTC so the intended calendar day is preserved.
 */
export function formatCalendarDate(date: Date): string {
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
