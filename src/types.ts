/**
 * A date with the format of `year-month-day`.
 * Example: `2019-02-24`
 */
export type DateString = `${number}-${number}-${number}`;

/** List of timezones. */
export type TimeZone =
    | 'system'
    | 'Pacific/Honolulu'
    | 'America/Anchorage'
    | 'America/Los_Angeles'
    | 'America/Denver'
    | 'America/Chicago'
    | 'America/New_York'
    | 'America/Halifax'
    | 'America/Sao_Paulo'
    | 'Atlantic/South_Georgia'
    | 'Atlantic/Azores'
    | 'UTC'
    | 'Europe/London'
    | 'Europe/Paris'
    | 'Europe/Berlin'
    | 'Europe/Helsinki'
    | 'Europe/Moscow'
    | 'Asia/Dubai'
    | 'Asia/Karachi'
    | 'Asia/Kolkata'
    | 'Asia/Dhaka'
    | 'Asia/Bangkok'
    | 'Asia/Singapore'
    | 'Asia/Shanghai'
    | 'Asia/Tokyo'
    | 'Australia/Sydney'
    | 'Pacific/Auckland';

/** List of buckets. */
export type Bucket =
    | 'minute'
    | 'five_minutes'
    | 'ten_minutes'
    | 'fifteen_minutes'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'week'
    | 'year';

/** List of parameters. */
export type Parameter =
    | 'pathname'
    | 'page_title'
    | 'country'
    | 'region'
    | 'city'
    | 'browser'
    | 'operating_system'
    | 'device_type'
    | 'referrer'
    | 'channel'
    | 'utm_source'
    | 'utm_medium'
    | 'utm_campaign'
    | 'utm_term'
    | 'utm_content'
    | 'language'
    | 'entry_page'
    | 'exit_page'
    | 'event_name';

/** List of sort by choices. */
export type SortBy = 'goalId' | 'name' | 'goalType' | 'createdAt';

/** Lust of order choices. */
export type Order = 'asc' | 'desc';

/** List of modes. */
export type Mode = 'day' | 'week' | 'reached' | 'dropped';

/** List of dimensions. */
export type Dimension = 'pathname' | 'country' | 'browser' | 'operating_system' | 'device_type';

/** List of filter parameters. */
export type FilterParameter =
    | 'country'
    | 'region'
    | 'city'
    | 'browser'
    | 'operating_system'
    | 'device_type'
    | 'pathname'
    | 'referrer'
    | 'utm_source'
    | 'utm_medium'
    | 'utm_campaign'
    | 'channel'
    | 'entry_page'
    | 'exit_page'
    | 'language';

/** List of filter types. */
export type FilterTypes = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'regex';

/** A filter object. */
export interface Filter {
    /** {@linkcode FilterParameter Parameter} of this filter. */
    parameter: FilterParameter;

    /** {@linkcode FilterTypes Type} of filter. */
    type: FilterTypes;

    /** Values of this filter. */
    value: Array<string>;
}
