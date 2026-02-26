import { Routes } from './endpoints.js';
import { request } from './requests.js';
import type { GetSiteResponse, SiteId, UpdatePrivateLinkRequestBody, UpdateSiteConfigRequestBody } from './types.js';

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
    async deleteSite(): Promise<any> {
        return request<any>(this.#apiKey, 'DELETE', this.routes.deleteSite(this.siteId));
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

    /** Returns the private link key configuration */
    async getPrivateLinkConfig(): Promise<any> {
        return request<any>(this.#apiKey, 'GET', this.routes.getPrivateLinkConfig(this.siteId));
    }

    /** Returns the private link key configuration */
    async updatePrivateLinkConfig(action: UpdatePrivateLinkRequestBody['action']): Promise<any> {
        return request<any>(this.#apiKey, 'POST', this.routes.updatePrivateLinkConfig(this.siteId), {
            action
        } satisfies UpdatePrivateLinkRequestBody);
    }

    // ORGANIZATION

    // OVERVIEW

    // EVENTS

    // ERRORS

    // GOALS

    // FUNNELS

    // PERFORMANCE

    // SESSIONS

    // USERS

    // MISC
}
