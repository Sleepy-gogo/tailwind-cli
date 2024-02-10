import chalk from 'chalk';
import { getFilePath } from '../lib/prompts.js';
import { doWithSpinner } from '../lib/message-utils.js';
import {
  addTailwindDirectives,
  generateFiles,
  installDependencies,
  setTailwindConfig
} from '../lib/utils.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './src/style.css');
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
    generateFiles.bind(null, ['postcss-es', 'tailwind']),
    'Generating files...',
    'Files generated succesfully!'
  );
  await doWithSpinner(
    setTailwindConfig.bind(
      null,
      ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      true
    ),
    'Setting Tailwind config...',
    'Config set succesfully!'
  );
}

export default {
  name: chalk.cyan('Vue ready ✨'),
  action
};
