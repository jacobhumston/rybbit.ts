import type { DateString } from './types.js';
import type { ErrorResponse } from './requests.js';

/**
 * Converts a {@linkcode Date} to {@linkcode DateString}.
 * @param date The {@linkcode Date} to convert.
 * @returns The converted {@linkcode DateString}.
 */
export function toDateString(date: Date): DateString {
    return date.toISOString().split('T')[0] as DateString;
}

/**
 * A utility function which you can use to insure rejected
 * promise errors are a type of {@linkcode ErrorResponse}.
 * @param callback The callback to handle this error.
 */
export function handleRejection(callback: (error: ErrorResponse) => void | Promise<void>) {
    return function (reason: any) {
        let res: ErrorResponse = { status: -3, error: 'Unknown response.' };
        if (
            typeof reason === 'object' &&
            typeof reason.status === 'number' &&
            typeof reason.error === 'string' &&
            Object.keys(reason).length === 2
        )
            res = reason;
        callback(res);
    };
}
