# rybbit.ts

A TypeScript wrapper for rybbit.com API.

```bash
npm install rybbit.ts
# bun install rybbit.ts
# deno install npm:rybbit.ts
```

## Example

```ts
import rybbit from 'rybbit.ts';

const analytics = new rybbit('https://example.rybbit.com', 1, process.env.KEY);
console.log(await analytics.getSite()); // logs site info
```

For more information, please see the documentation: [rybbit.lovely.sh](https://rybbit.lovely.sh)
