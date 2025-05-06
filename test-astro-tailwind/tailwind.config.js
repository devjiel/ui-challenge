import { createGlobPatternsForDependencies } from '@nxtensions/astro/tailwind';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(
      __dirname,
      'src/**/!(*.stories|*.spec).{astro,html,js,jsx,md,svelte,ts,tsx,vue}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        foo: '#FFFF00',
        many: {
          nested: {
            objects: {
              here: '#0000FF',
            },
          },
        },
      },
    },
  },
  plugins: [],
};