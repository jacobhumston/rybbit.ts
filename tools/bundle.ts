import { mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

mkdirSync('dist/bundle', { recursive: true });

await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist/bundle',
    target: 'node',
    format: 'esm',
    minify: true,
    naming: {
        entry: 'index.js'
    }
});

execSync('bunx dts-bundle-generator -o dist/bundle/index.d.ts src/index.ts', {
    stdio: 'inherit'
});

console.log('✓ Bundle created successfully');
