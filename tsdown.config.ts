import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/schema.ts'],
  sourcemap: true,
  outDir: 'dist',
});
