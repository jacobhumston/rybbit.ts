import { Routes } from './endpoints.js';
import { request } from './requests.js';
import type {
    AddOrganizationMemberRequestBody,
    CreateSiteRequestBody,
    GetSiteResponse,
    SiteId,
    SkipFirstArrayItem,
    SuccessResponse,
    UpdatePrivateLinkRequestBody,
    UpdateSiteConfigRequestBody
} from './types.js';

/** Rest methods to invoke the API. */
export class Rest {
    /** Routes of this Rest instance. */
    routes: Routes;

    /** {@linkcode SiteId} for this rest instance. */
    siteId: SiteId;

    /** API key for this rest instance. */
    #apiKey: string;

    constructor(domain: string, siteId: SiteId, apiKey: string) {
        this.routes = new Routes(new URL(domain));
        this.siteId = siteId;
        this.#apiKey = apiKey;
    }

    // SITES

    /** Returns details for a specific site. */
    async getSite(): Promise<GetSiteResponse> {
        return request<GetSiteResponse>(this.#apiKey, 'GET', this.routes.getSite(this.siteId));
    }

    /** Permanently deletes a site and all its data. Requires admin/owner role. */
    async deleteSite(): Promise<SuccessResponse> {
        return request<SuccessResponse>(this.#apiKey, 'DELETE', this.routes.deleteSite(this.siteId));
    }

    /** Updates site configuration settings. Requires admin/owner role. */
    async updateSiteConfig(config: UpdateSiteConfigRequestBody): Promise<any> {
        return request<any>(this.#apiKey, 'PUT', this.routes.updateSiteConfig(this.siteId), config);
    }

    /** Returns the list of excluded IP addresses. */
    async getExcludedIPs(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getExcludedIPs(this.siteId));
    }

    /** Returns the list of excluded country codes. */
    async getExcludedCountries(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getExcludedCountries(this.siteId));
    }

    /** Returns the private link key configuration. */
    async getPrivateLinkConfig(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getPrivateLinkConfig(this.siteId));
    }

    /** Generates or revokes a private link key. Requires admin/owner role. */
    async updatePrivateLinkConfig(action: UpdatePrivateLinkRequestBody['action']): Promise<any> {
        return request<any>(this.#apiKey, 'POST', this.routes.updatePrivateLinkConfig(this.siteId), {
            action
        } satisfies UpdatePrivateLinkRequestBody);
    }

    // ORGANIZATION

    /** Returns all organizations the authenticated user is a member of, including all members for each organization. */
    async getMyOrganizations(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getMyOrganizations());
    }

    /** Creates a new site in an organization. Requires admin/owner role. */
    async createSite(organizationId: string, details: CreateSiteRequestBody): Promise<any> {
        return request<any>(this.#apiKey, 'POST', this.routes.createSite(organizationId), details);
    }

    /** Returns all members of an organization with user details. */
    async getOrganizationMembers(organizationId: string): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getOrganizationMembers(organizationId));
    }

    /** Adds a user to an organization with a specified roles. */
    async addOrganizationMember(organizationId: string, member: AddOrganizationMemberRequestBody): Promise<any> {
        return request<any>(this.#apiKey, 'POST', this.routes.addOrganizationMember(organizationId), member);
    }

    // OVERVIEW

    /** Returns high-level analytics metrics for a site. */
    async getOverview(...params: SkipFirstArrayItem<Parameters<Routes['getOverview']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getOverview(this.siteId, ...params));
    }

    /** Returns time-series analytics data broken down by time buckets */
    async getOverviewTimeSeries(
        ...params: SkipFirstArrayItem<Parameters<Routes['getOverviewTimeSeries']>>
    ): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getOverviewTimeSeries(this.siteId, ...params));
    }

    /** Returns dimensional analytics broken down by a specific parameter. */
    async getMetric(...params: SkipFirstArrayItem<Parameters<Routes['getMetric']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getMetric(this.siteId, ...params));
    }

    /** Returns the count of active sessions within the specified time window. */
    async getLiveVisitors(...params: SkipFirstArrayItem<Parameters<Routes['getLiveVisitors']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getLiveVisitors(this.siteId, ...params));
    }

    // EVENTS

    /** Returns a paginated list of events with cursor-based pagination. */
    async getEvents(...params: SkipFirstArrayItem<Parameters<Routes['getEvents']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getEvents(this.siteId, ...params));
    }

    /** Returns list of unique custom event names with counts. */
    async getEventNames(...params: SkipFirstArrayItem<Parameters<Routes['getEventNames']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getEventNames(this.siteId, ...params));
    }

    /** Returns property key-value pairs for a specific event. */
    async getEventProperties(...params: SkipFirstArrayItem<Parameters<Routes['getEventProperties']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getEventProperties(this.siteId, ...params));
    }

    /** Returns outbound link clicks with occurrence counts. */
    async getOutboundLinks(...params: SkipFirstArrayItem<Parameters<Routes['getOutboundLinks']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getOutboundLinks(this.siteId, ...params));
    }

    // ERRORS

    /** Returns unique error messages with occurrence and session counts. */
    async getErrorNames(...params: SkipFirstArrayItem<Parameters<Routes['getErrorNames']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getErrorNames(this.siteId, ...params));
    }

    /** Returns individual error occurrences with context and stack traces. */
    async getErrorEvents(...params: SkipFirstArrayItem<Parameters<Routes['getErrorEvents']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getErrorEvents(this.siteId, ...params));
    }

    /** Returns error occurrence counts over time. */
    async getErrorTimeSeries(...params: SkipFirstArrayItem<Parameters<Routes['getErrorTimeSeries']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getErrorTimeSeries(this.siteId, ...params));
    }

    // GOALS

    /** Returns paginated list of goals with conversion metrics. */
    async getGoals(...params: SkipFirstArrayItem<Parameters<Routes['getGoals']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getGoals(this.siteId, ...params));
    }

    /** Returns sessions that completed a specific goal. */
    async getGoalSessions(...params: SkipFirstArrayItem<Parameters<Routes['getGoalSessions']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getGoalSessions(this.siteId, ...params));
    }

    // FUNNELS

    /** Returns all saved funnels for a site. */
    async getFunnels(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getFunnels(this.siteId));
    }

    // PERFORMANCE

    /** Returns aggregate Core Web Vitals metrics. */
    async getPerformanceOverview(
        ...params: SkipFirstArrayItem<Parameters<Routes['getPerformanceOverview']>>
    ): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getPerformanceOverview(this.siteId, ...params));
    }

    /** Returns performance metrics over time. */
    async getPerformanceTimeSeries(
        ...params: SkipFirstArrayItem<Parameters<Routes['getPerformanceTimeSeries']>>
    ): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getPerformanceTimeSeries(this.siteId, ...params));
    }

    /** Returns performance breakdown by dimension. */
    async getPerformanceByDimension(
        ...params: SkipFirstArrayItem<Parameters<Routes['getPerformanceByDimension']>>
    ): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getPerformanceByDimension(this.siteId, ...params));
    }

    // SESSIONS

    /** Returns a paginated list of sessions. */
    async getSessions(...params: SkipFirstArrayItem<Parameters<Routes['getSessions']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getSessions(this.siteId, ...params));
    }

    /** Returns detailed session information with events. */
    async getSession(...params: SkipFirstArrayItem<Parameters<Routes['getSession']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getSession(this.siteId, ...params));
    }

    /** Returns aggregated session locations for map visualization. */
    async getSessionLocations(...params: SkipFirstArrayItem<Parameters<Routes['getSessionLocations']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getSessionLocations(this.siteId, ...params));
    }

    // USERS

    /** Returns a paginated list of users. */
    async getUsers(...params: SkipFirstArrayItem<Parameters<Routes['getUsers']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getUsers(this.siteId, ...params));
    }

    /** Returns daily session counts for a specific user. */
    async getUserSessionCount(...params: SkipFirstArrayItem<Parameters<Routes['getUserSessionCount']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getUserSessionCount(this.siteId, ...params));
    }

    /** Returns detailed user profile information. */
    async getUserInfo(...params: SkipFirstArrayItem<Parameters<Routes['getUserInfo']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getUserInfo(this.siteId, ...params));
    }

    // MISC

    /** Returns cohort-based retention analysis. */
    async getRetention(...params: SkipFirstArrayItem<Parameters<Routes['getRetention']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getRetention(this.siteId, ...params));
    }

    /** Returns most common page navigation paths. */
    async getJourneys(...params: SkipFirstArrayItem<Parameters<Routes['getJourneys']>>): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getJourneys(this.siteId, ...params));
    }
}
