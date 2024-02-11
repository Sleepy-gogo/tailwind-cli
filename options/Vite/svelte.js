import {
  addTailwindDirectives,
  generateFiles,
  installDependencies,
  setTailwindConfig
} from '../../lib/actions.js';
import { doWithSpinner } from '../../lib/message-utils.js';
import { getFilePath } from '../../lib/prompts.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './src/app.css');
  await doWithSpinner(
    addTailwindDirectives.bind(null, cssFilePath),
    'Adding Tailwind directives...',
    'Directives added succesfully!'
  );
  await doWithSpinner(
    installDependencies.bind(null, '-D tailwindcss postcss autoprefixer'),
    'Installing dependencies...',
    'Dependencies installed succesfully!'
  );
  await doWithSpinner(
    generateFiles.bind(null, ['postcss-es', 'tailwind-es']),
    'Generating files...',
    'Files generated succesfully!'
  );
  await doWithSpinner(
    setTailwindConfig.bind(null, [
      './index.html',
      './src/**/*.{svelte,js,ts,jsx,tsx}'
    ]),
    'Setting Tailwind config...',
    'Config set succesfully!'
  );
}

export default {
  name: 'Svelte ready 🧡',
  action
};
