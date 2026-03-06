![rybbit.ts](https://raw.githubusercontent.com/jacobhumston/rybbit.ts/refs/heads/main/.github/rybbit-ts-logo.png)

A TypeScript wrapper for rybbit.com API.

```bash
npm install rybbit.ts
# bun install rybbit.ts
# deno install npm:rybbit.ts
```

## Example

```ts
import rybbit from 'rybbit.ts';

// create a rest instance
const analytics = new rybbit({
    domain: 'https://example.rybbit.com',
    siteId: 1,
    apiKey: process.env.RYBBIT_API_KEY
});

// track a custom event
const result = await analytics.track({
    type: 'custom_event',
    ip_address: '8.8.8.8',
    event_name: 'server sided event',
    properties: { test_property: 'yes' }
});

// Result: { success: true }
```
![custom-event](https://raw.githubusercontent.com/jacobhumston/rybbit.ts/refs/heads/main/.github/custom-event.png)


For more information, please see the documentation: [rybbit.lovely.sh](https://rybbit.lovely.sh)
