/** An error response. */
export interface ErrorResponse {
    /**
     * The status of this error.
     * * `-1` - Request failed to send, etc.
     * * `-2` - Failed to parse response. (Response wasn't valid JSON.)
     * * `-3` - Unknown response.
     * * `XXX` - Server response status code.
     */
    status: number;
    /** Error message. */
    error: string;
}

/**
 * Send a request.
 * @param method The request method.
 * @param url The URL of this request.
 * @param body The optional body to provide.
 * @returns The response data.
 * @throws {Error} Error response.
 */
export function request<T>(method: RequestInit['method'], url: URL, body?: any): Promise<T> {
    return new Promise(async (resolve, reject: (reason: ErrorResponse) => void) => {
        const response = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : undefined
        }).catch((error) => reject({ status: -1, error: `${error}` }));

        if (response && response.status) {
            const data = await response.json().catch((error) => reject({ status: -2, error: `${error}` }));
            if (data && response.status < 300) resolve(data as T);
            else reject({ status: response.status, error: `${JSON.stringify(data)}` });
        } else {
            reject({ status: -3, error: 'Unknown response.' });
        }
    });
}
