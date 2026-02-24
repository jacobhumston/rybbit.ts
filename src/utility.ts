import type { DateString } from './types.js';

/**
 * Converts a {@linkcode Date} to {@linkcode DateString}.
 * @param date The {@linkcode Date} to convert.
 * @returns The converted {@linkcode DateString}.
 */
export function toDateString(date: Date): DateString {
    return date.toISOString().split('T')[0] as DateString;
}
