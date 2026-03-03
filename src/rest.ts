import { Routes } from './endpoints.js';
import { request } from './requests.js';
import type {
    AddOrganizationMemberRequestBody,
    AnalyzeFunnelRequestBody,
    CreateFunnelRequestBody,
    CreateGoalRequestBody,
    CreateSiteRequestBody,
    Dimension,
    GetFunnelStepSessionsRequestBody,
    GetSiteResponse,
    Mode,
    Parameter,
    SiteId,
    SuccessResponse,
    UpdateGoalRequestBody,
    UpdatePrivateLinkRequestBody,
    UpdateSiteConfigRequestBody
} from './types.js';

/** Ensure `Rest` implements every method in `Routes`. */
type RouteMethods = {
    [K in keyof Routes]: any;
};

/** Rest methods to invoke the API. */
export class Rest implements RouteMethods {
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

    /**
     * Send a request for this rest instance.
     * @param method The request method.
     * @param url The URL of this request.
     * @param body The optional body to provide.
     * @returns The response data.
     * @throws {Error} Error response.
     */
    async request<T>(method: Parameters<typeof request>[1], url: URL, body?: any): Promise<T> {
        return request<T>(this.#apiKey, method, url, body);
    }

    // SITES

    /** Returns details for a specific site. */
    async getSite(): Promise<GetSiteResponse> {
        return this.request<GetSiteResponse>('GET', this.routes.getSite(this.siteId));
    }

    /** Permanently deletes a site and all its data. Requires admin/owner role. */
    async deleteSite(): Promise<SuccessResponse> {
        return this.request<SuccessResponse>('DELETE', this.routes.deleteSite(this.siteId));
    }

    /** Updates site configuration settings. Requires admin/owner role. */
    async updateSiteConfig(config: UpdateSiteConfigRequestBody): Promise<any> {
        return this.request<any>('PUT', this.routes.updateSiteConfig(this.siteId), config);
    }

    /** Returns the list of excluded IP addresses. */
    async getExcludedIPs(): Promise<any> {
        return this.request<any>('GET', this.routes.getExcludedIPs(this.siteId));
    }

    /** Returns the list of excluded country codes. */
    async getExcludedCountries(): Promise<any> {
        return this.request<any>('GET', this.routes.getExcludedCountries(this.siteId));
    }

    /** Returns the private link key configuration. */
    async getPrivateLinkConfig(): Promise<any> {
        return this.request<any>('GET', this.routes.getPrivateLinkConfig(this.siteId));
    }

    /** Generates or revokes a private link key. Requires admin/owner role. */
    async updatePrivateLinkConfig(action: UpdatePrivateLinkRequestBody['action']): Promise<any> {
        return this.request<any>('POST', this.routes.updatePrivateLinkConfig(this.siteId), {
            action
        } satisfies UpdatePrivateLinkRequestBody);
    }

    // ORGANIZATION

    /** Returns all organizations the authenticated user is a member of, including all members for each organization. */
    async getMyOrganizations(): Promise<any> {
        return this.request<any>('GET', this.routes.getMyOrganizations());
    }

    /** Creates a new site in an organization. Requires admin/owner role. */
    async createSite(organizationId: string, details: CreateSiteRequestBody): Promise<any> {
        return this.request<any>('POST', this.routes.createSite(organizationId), details);
    }

    /** Returns all members of an organization with user details. */
    async getOrganizationMembers(organizationId: string): Promise<any> {
        return this.request<any>('GET', this.routes.getOrganizationMembers(organizationId));
    }

    /** Adds a user to an organization with a specified roles. */
    async addOrganizationMember(organizationId: string, member: AddOrganizationMemberRequestBody): Promise<any> {
        return this.request<any>('POST', this.routes.addOrganizationMember(organizationId), member);
    }

    // OVERVIEW

    /** Returns high-level analytics metrics for a site. */
    async getOverview(options: Parameters<Routes['getOverview']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getOverview(this.siteId, options));
    }

    /** Returns time-series analytics data broken down by time buckets */
    async getOverviewTimeSeries(options: Parameters<Routes['getOverviewTimeSeries']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getOverviewTimeSeries(this.siteId, options));
    }

    /** Returns dimensional analytics broken down by a specific parameter. */
    async getMetric(parameter: Parameter, options: Parameters<Routes['getMetric']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getMetric(this.siteId, parameter, options));
    }

    /** Returns the count of active sessions within the specified time window. */
    async getLiveVisitors(minutes?: number): Promise<any> {
        return this.request<any>('GET', this.routes.getLiveVisitors(this.siteId, minutes));
    }

    // EVENTS

    /** Returns a paginated list of events with cursor-based pagination. */
    async getEvents(options: Parameters<Routes['getEvents']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getEvents(this.siteId, options));
    }

    /** Returns list of unique custom event names with counts. */
    async getEventNames(options: Parameters<Routes['getEventNames']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getEventNames(this.siteId, options));
    }

    /** Returns property key-value pairs for a specific event. */
    async getEventProperties(eventName: string, options: Parameters<Routes['getEventProperties']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getEventProperties(this.siteId, eventName, options));
    }

    /** Returns outbound link clicks with occurrence counts. */
    async getOutboundLinks(options: Parameters<Routes['getOutboundLinks']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getOutboundLinks(this.siteId, options));
    }

    // ERRORS

    /** Returns unique error messages with occurrence and session counts. */
    async getErrorNames(options: Parameters<Routes['getErrorNames']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getErrorNames(this.siteId, options));
    }

    /** Returns individual error occurrences with context and stack traces. */
    async getErrorEvents(errorMessage: string, options: Parameters<Routes['getErrorEvents']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getErrorEvents(this.siteId, errorMessage, options));
    }

    /** Returns error occurrence counts over time. */
    async getErrorTimeSeries(errorMessage: string, options: Parameters<Routes['getErrorTimeSeries']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getErrorTimeSeries(this.siteId, errorMessage, options));
    }

    // GOALS

    /** Returns paginated list of goals with conversion metrics. */
    async getGoals(options: Parameters<Routes['getGoals']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getGoals(this.siteId, options));
    }

    /** Returns sessions that completed a specific goal. */
    async getGoalSessions(goalId: number, options: Parameters<Routes['getGoalSessions']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getGoalSessions(this.siteId, goalId, options));
    }

    /** Creates a new goal. */
    async createGoal(goal: CreateGoalRequestBody): Promise<any> {
        return this.request<any>('POST', this.routes.createGoal(this.siteId), goal);
    }

    /** Updates an existing goal. */
    async updateGoal(goalId: number, goal: UpdateGoalRequestBody): Promise<any> {
        return this.request<any>('PUT', this.routes.updateGoal(this.siteId, goalId), goal);
    }

    /** Deletes a goal. */
    async deleteGoal(goalId: number): Promise<any> {
        return this.request<any>('DELETE', this.routes.deleteGoal(this.siteId, goalId));
    }

    // FUNNELS

    /** Returns all saved funnels for a site. */
    async getFunnels(): Promise<any> {
        return this.request<any>('GET', this.routes.getFunnels(this.siteId));
    }

    /** Analyzes funnel conversion data step-by-step. */
    async analyzeFunnel(funnel: AnalyzeFunnelRequestBody, options: Parameters<Routes['analyzeFunnel']>[1]) {
        return this.request<any>('POST', this.routes.analyzeFunnel(this.siteId, options), funnel);
    }

    /** Returns sessions that reached or dropped at a specific funnel step. */
    async getFunnelStepSessions(
        funnel: GetFunnelStepSessionsRequestBody,
        stepNumber: number,
        mode: Mode,
        options: Parameters<Routes['getFunnelStepSessions']>[3]
    ) {
        return this.request<any>(
            'POST',
            this.routes.getFunnelStepSessions(this.siteId, stepNumber, mode, options),
            funnel
        );
    }

    /** Creates a saved funnel. */
    async createFunnel(funnel: CreateFunnelRequestBody) {
        return this.request<any>('POST', this.routes.createFunnel(this.siteId), funnel);
    }

    /** Deletes a saved funnel. */
    async deleteFunnel(funnelId: number): Promise<any> {
        return this.request<any>('DELETE', this.routes.deleteFunnel(this.siteId, funnelId));
    }

    // PERFORMANCE

    /** Returns aggregate Core Web Vitals metrics. */
    async getPerformanceOverview(options: Parameters<Routes['getPerformanceOverview']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getPerformanceOverview(this.siteId, options));
    }

    /** Returns performance metrics over time. */
    async getPerformanceTimeSeries(options: Parameters<Routes['getPerformanceTimeSeries']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getPerformanceTimeSeries(this.siteId, options));
    }

    /** Returns performance breakdown by dimension. */
    async getPerformanceByDimension(
        dimension: Dimension,
        options: Parameters<Routes['getPerformanceByDimension']>[2]
    ): Promise<any> {
        return this.request<any>('GET', this.routes.getPerformanceByDimension(this.siteId, dimension, options));
    }

    // SESSIONS

    /** Returns a paginated list of sessions. */
    async getSessions(options: Parameters<Routes['getSessions']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getSessions(this.siteId, options));
    }

    /** Returns detailed session information with events. */
    async getSession(sessionId: string, options: Parameters<Routes['getSession']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getSession(this.siteId, sessionId, options));
    }

    /** Returns aggregated session locations for map visualization. */
    async getSessionLocations(options: Parameters<Routes['getSessionLocations']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getSessionLocations(this.siteId, options));
    }

    // USERS

    /** Returns a paginated list of users. */
    async getUsers(options: Parameters<Routes['getUsers']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getUsers(this.siteId, options));
    }

    /** Returns daily session counts for a specific user. */
    async getUserSessionCount(userId: string, options: Parameters<Routes['getUserSessionCount']>[2]): Promise<any> {
        return this.request<any>('GET', this.routes.getUserSessionCount(this.siteId, userId, options));
    }

    /** Returns detailed user profile information. */
    async getUserInfo(userId: string): Promise<any> {
        return this.request<any>('GET', this.routes.getUserInfo(this.siteId, userId));
    }

    // MISC

    /** Returns cohort-based retention analysis. */
    async getRetention(options: Parameters<Routes['getRetention']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getRetention(this.siteId, options));
    }

    /** Returns most common page navigation paths. */
    async getJourneys(options: Parameters<Routes['getJourneys']>[1]): Promise<any> {
        return this.request<any>('GET', this.routes.getJourneys(this.siteId, options));
    }

    /** Track events, etc. */
    async track(props: any): Promise<any> {
        return this.request<any>('POST', this.routes.track(), props);
    }
}
