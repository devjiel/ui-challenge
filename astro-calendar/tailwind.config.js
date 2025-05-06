import { createGlobPatternsForDependencies } from '@nxtensions/astro/tailwind';
import { join } from 'path';

const { fontFamily } = require("tailwindcss/defaultTheme");

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
        foo: '#123',
        many: {
          nested: {
            objects: {
              here: '#456',
            },
          },
        },
      },
    },
  },
  plugins: [],
};