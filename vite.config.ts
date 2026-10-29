import {defineConfig} from 'vite';
import {rmSync} from 'node:fs';
import {resolve} from 'node:path';

export default defineConfig({
  base: './',
  server: {host: '127.0.0.1', port: 5180, strictPort: true},
  preview: {host: '127.0.0.1', port: 5181, strictPort: true},
  plugins: [{name: 'exclude-archived-public-pages', closeBundle() {
    for (const file of ['subsidizing-competition/index.html', 'research/food-delivery-essay.pdf']) {
      rmSync(resolve('dist', file), {force: true});
    }
  }}],
});
