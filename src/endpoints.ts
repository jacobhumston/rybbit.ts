import type {
    DateString,
    TimeZone,
    Filter,
    Bucket,
    Parameter,
    Timestamp,
    SortBy,
    Order,
    Mode,
    Dimension
} from './types.js';

/** Route interfaces, used to construct URLs. */
export class Routes {
    /** Base URL for this route constructor. */
    #base: URL;

    /**
     * Create a new route constructor.
     * @param base The base URL for this constructor.
     */
    constructor(base: URL) {
        this.#base = base;
    }

    /**
     * Create a URL.
     * @param path The path of this URL.
     * @param queries The queries for this URL.
     * @returns The created URL.
     */
    #create(path: string, queries?: Record<string, string | undefined>): URL {
        const url = new URL(`${this.#base.origin}${path}`);

        if (queries) {
            const search = url.searchParams;
            for (const [name, value] of Object.entries(queries)) {
                if (value === undefined) continue;
                search.set(name, value);
            }
        }

        return url;
    }

    // SITES

    /** `GET` Returns details for a specific site */
    getSite(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}`);
    }

    /** `DELETE` Permanently deletes a site and all its data. Requires admin/owner role. */
    deleteSite(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}`);
    }

    /** `PUT` Updates site configuration settings. Requires admin/owner role. */
    updateSiteConfig(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/config`);
    }

    /** `GET` Returns the list of excluded IP addresses */
    getExcludedIPs(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/excluded-ips`);
    }

    /** `GET` Returns the list of excluded country codes */
    getExcludedCountries(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/excluded-counties`);
    }

    /** `GET` Returns the private link key configuration */
    getPrivateLinkConfig(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/private-link-config`);
    }

    /** `POST` Generates or revokes a private link key. Requires admin/owner role. */
    updatePrivateLinkConfig(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/private-link-config`);
    }

    // ORGANIZATIONS

    /** `GET` Returns all organizations the authenticated user is a member of, including all members for each organization */
    getMyOrganizations(): URL {
        return this.#create(`/api/organizations`);
    }

    /** `POST` Creates a new site in an organization. Requires admin/owner role. */
    createSite(organizationId: string): URL {
        return this.#create(`/api/organizations/${organizationId}/sites`);
    }

    /** `GET` Returns all members of an organization with user details */
    getOrganizationMembers(organizationId: string): URL {
        return this.#create(`/api/organizations/${organizationId}/members`);
    }

    /** `POST` Adds a user to an organization with a specified role */
    addOrganizationMember(organizationId: string): URL {
        return this.#create(`/api/organizations/${organizationId}/members`);
    }

    // OVERVIEW

    /** `GET` Returns high-level analytics metrics for a site */
    getOverview(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/overview`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    /** `GET` Returns time-series analytics data broken down by time buckets */
    getOverviewTimeSeries(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        bucket?: Bucket
    ): URL {
        return this.#create(`/api/sites/${siteId}/overview-bucketed`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            bucket: bucket
        });
    }

    /** `GET` Returns dimensional analytics broken down by a specific parameter */
    getMetric(
        siteId: number,
        parameter: Parameter,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        limit?: number,
        page?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/metric`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            parameter: parameter,
            limit: limit?.toString(),
            page: page?.toString()
        });
    }

    /** `GET` Returns the count of active sessions within the specified time window */
    getLiveVisitors(siteId: number, minutes?: number): URL {
        return this.#create(`/api/sites/${siteId}/live-user-count`, {
            minutes: minutes?.toString()
        });
    }

    // EVENTS

    /** `GET` Returns a paginated list of events with cursor-based pagination */
    getEvents(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        pageSize?: number,
        sinceTimestamp?: Timestamp,
        beforeTimestamp?: Timestamp
    ): URL {
        return this.#create(`/api/sites/${siteId}/events`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page_size: pageSize?.toString(),
            since_timestamp: sinceTimestamp,
            before_timestamp: beforeTimestamp
        });
    }

    /** `GET` Returns list of unique custom event names with counts */
    getEventNames(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/events/names`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    /** `GET` Returns property key-value pairs for a specific event */
    getEventProperties(
        siteId: number,
        eventName: string,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/events/properties`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            event_name: eventName
        });
    }

    /** `GET` Returns outbound link clicks with occurrence counts */
    getOutboundLinks(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/events/outbound`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    // ERRORS

    /** `GET` Returns unique error messages with occurrence and session counts */
    getErrorNames(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/error-names`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            limit: limit?.toString()
        });
    }

    /** `GET` Returns individual error occurrences with context and stack traces */
    getErrorEvents(
        siteId: number,
        errorMessage: string,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/error-events`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            limit: limit?.toString(),
            errorMessage: errorMessage
        });
    }

    /** `GET` Returns error occurrence counts over time */
    getErrorTimeSeries(
        siteId: number,
        errorMessage: string,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        bucket?: Bucket
    ): URL {
        return this.#create(`/api/sites/${siteId}/error-bucketed`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            bucket: bucket,
            errorMessage: errorMessage
        });
    }

    // GOALS

    /** `GET` Returns paginated list of goals with conversion metrics */
    getGoals(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        pageSize?: number,
        sortBy?: SortBy,
        order?: Order
    ): URL {
        return this.#create(`/api/sites/${siteId}/goals`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            page_size: pageSize?.toString(),
            sort: sortBy,
            order: order
        });
    }

    /** `GET` Returns sessions that completed a specific goal */
    getGoalSessions(
        siteId: number,
        goalId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/goals/${goalId}/sessions`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            limit: limit?.toString()
        });
    }

    /** `POST` Creates a new goal */
    createGoal(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/goals`);
    }

    /** `PUT` Updates an existing goal */
    updateGoal(siteId: number, goalId: number): URL {
        return this.#create(`/api/sites/${siteId}/goals/${goalId}`);
    }

    /** `DELETE` Deletes a goal */
    deleteGoal(siteId: number, goalId: number): URL {
        return this.#create(`/api/sites/${siteId}/goals/${goalId}`);
    }

    // FUNNELS

    /** `GET` Returns all saved funnels for a site */
    getFunnels(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/funnels`);
    }

    /** `GET` Analyzes funnel conversion data step-by-step */
    analyzeFunnel(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/funnels/analyze`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    /** `GET` Returns sessions that reached or dropped at a specific funnel step */
    getFunnelStepSessions(
        siteId: number,
        stepNumber: number,
        mode: Mode,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/funnels/${stepNumber}/sessions`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            mode: mode,
            page: page?.toString(),
            limit: limit?.toString()
        });
    }

    /** `POST` Creates a saved funnel */
    createFunnel(siteId: number): URL {
        return this.#create(`/api/sites/${siteId}/funnels`);
    }

    /** `DELETE` Deletes a saved funnel */
    deleteFunnel(siteId: number, funnelId: number): URL {
        return this.#create(`/api/sites/${siteId}/funnels/${funnelId}`);
    }

    // PERFORMANCE

    /** `GET` Returns aggregate Core Web Vitals metrics */
    getPerformanceOverview(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/performance/overview`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    /** `GET` Returns performance metrics over time */
    getPerformanceTimeSeries(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        bucket?: Bucket
    ): URL {
        return this.#create(`/api/sites/${siteId}/performance/time-series`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            bucket: bucket
        });
    }

    /** `GET` Returns performance breakdown by dimension */
    getPerformanceByDimension(
        siteId: number,
        dimension: Dimension,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number,
        sortBy?: SortBy,
        sortOrder?: Order
    ): URL {
        return this.#create(`/api/sites/${siteId}/performance/by-dimension`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            dimension: dimension,
            page: page?.toString(),
            limit: limit?.toString(),
            sort_by: sortBy,
            sort_order: sortOrder
        });
    }

    // SESSIONS

    /** `GET` Returns a paginated list of sessions */
    getSessions(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        limit?: number,
        userId?: string,
        identifiedOnly?: boolean
    ): URL {
        return this.#create(`/api/sites/${siteId}/sessions`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            limit: limit?.toString(),
            user_id: userId,
            identified_only: identifiedOnly?.toString()
        });
    }

    /** `GET` Returns detailed session information with events */
    getSession(siteId: number, sessionId: string, limit?: number, offset?: number): URL {
        return this.#create(`/api/sites/${siteId}/sessions/${sessionId}`, {
            limit: limit?.toString(),
            offset: offset?.toString()
        });
    }

    /** `GET` Returns aggregated session locations for map visualization */
    getSessionLocations(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>
    ): URL {
        return this.#create(`/api/sites/${siteId}/session-locations`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined
        });
    }

    // USERS

    /** `GET` Returns a paginated list of users */
    getUsers(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        page?: number,
        pageSize?: number,
        sortBy?: SortBy,
        sortOrder?: Order,
        identifiedOnly?: boolean
    ): URL {
        return this.#create(`/api/sites/${siteId}/users`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            page: page?.toString(),
            page_size: pageSize?.toString(),
            sort_by: sortBy,
            sort_order: sortOrder,
            identified_only: identifiedOnly?.toString()
        });
    }

    /** `GET` Returns daily session counts for a specific user */
    getUserSessionCount(siteId: number, userId: string, timezone?: TimeZone): URL {
        return this.#create(`/api/sites/${siteId}/users/session-count`, {
            user_id: userId,
            timezone: timezone
        });
    }

    /** `GET` Returns detailed user profile information */
    getUserInfo(siteId: number, userId: string): URL {
        return this.#create(`/api/sites/${siteId}/users/${userId}`);
    }

    // MISC

    /** `GET` Returns cohort-based retention analysis */
    getRetention(siteId: number, mode?: Mode, range?: number): URL {
        return this.#create(`/api/sites/${siteId}/retention`, {
            mode: mode,
            range: range?.toString()
        });
    }

    /** `GET` Returns most common page navigation paths */
    getJourneys(
        siteId: number,
        startDate?: DateString,
        endDate?: DateString,
        timezone?: TimeZone,
        filters?: Array<Filter>,
        steps?: number,
        limit?: number
    ): URL {
        return this.#create(`/api/sites/${siteId}/users`, {
            start_date: startDate,
            end_date: endDate,
            time_zone: timezone,
            filters: filters !== undefined ? JSON.stringify(filters) : undefined,
            steps: steps?.toString(),
            limit: limit?.toString()
        });
    }

    /** `POST` Track events, etc */
    track(): URL {
        return this.#create(`/api/track`);
    }
}
