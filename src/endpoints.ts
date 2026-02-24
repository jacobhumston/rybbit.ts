/** Route interfaces, used to construct URLs. */
export class Routes {
    /** Base URL for this route constructor. */
    base: URL;

    /**
     * Create a new route constructor.
     * @param base The base URL for this constructor.
     */
    constructor(base: URL) {
        this.base = base;
    }

    /**
     * Create a URL.
     * @param path The path of this URL.
     * @param queries The queries for this URL.
     * @returns The created URL.
     */
    create(path: string, queries?: Record<string, string>): URL {
        const url = new URL(`${this.base.origin}${path}`);

        if (queries) {
            const search = url.searchParams;
            for (const [name, value] of Object.entries(queries)) {
                search.set(name, value);
            }
        }

        return url;
    }

    // SITES

    /** `GET` Returns details for a specific site */
    getSite(siteId: number) {
        return this.create(`/api/sites/${siteId}`);
    }

    /** `DELETE` Permanently deletes a site and all its data. Requires admin/owner role. */
    deleteSite(siteId: number) {
        return this.create(`/api/sites/${siteId}`);
    }

    /** `PUT` Updates site configuration settings. Requires admin/owner role. */
    updateSiteConfig(siteId: number) {
        return this.create(`/api/sites/${siteId}/config`);
    }

    /** `GET` Returns the list of excluded IP addresses */
    getExcludedIPs(siteId: number) {
        return this.create(`/api/sites/${siteId}/excluded-ips`);
    }

    /** `GET` Returns the list of excluded country codes */
    getExcludedCountries(siteId: number) {
        return this.create(`/api/sites/${siteId}/excluded-counties`);
    }

    /** `GET` Returns the private link key configuration */
    getPrivateLinkConfig(siteId: number) {
        return this.create(`/api/sites/${siteId}/private-link-config`);
    }

    /** `POST` Generates or revokes a private link key. Requires admin/owner role. */
    updatePrivateLinkConfig(siteId: number) {
        return this.create(`/api/sites/${siteId}/private-link-config`);
    }

    // ORGANIZATIONS

    /** `GET` Returns all organizations the authenticated user is a member of, including all members for each organization */
    getMyOrganizations() {
        return this.create(`/api/organizations`);
    }

    /** `POST` Creates a new site in an organization. Requires admin/owner role. */
    createSite(organizationId: string) {
        return this.create(`/api/organizations/${organizationId}/sites`);
    }

    /** `GET` Returns all members of an organization with user details */
    getOrganizationMembers(organizationId: string) {
        return this.create(`/api/organizations/${organizationId}/members`);
    }

    /** `POST` Adds a user to an organization with a specified role */
    addOrganizationMember(organizationId: string) {
        return this.create(`/api/organizations/${organizationId}/members`);
    }

    // OVERVIEW

    // EVENTS

    // GOALS

    // FUNNELS

    // PERFORMANCE

    // SESSIONS

    // USERS

    // MISC
}
