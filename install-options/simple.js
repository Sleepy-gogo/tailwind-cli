import chalk from 'chalk';
import { getFilePath } from '../lib/prompts.js';
import { doWithSpinner } from '../lib/message-utils.js';
import {
  addTailwindDirectives,
  generateFiles,
  installDependencies
} from '../lib/utils.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './styles.css');
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
    generateFiles.bind(null, ['postcss', 'tailwind']),
    'Generating files...',
    'Files generated succesfully!'
  );
}

export default {
  name: chalk.white('Standard 🪛') + chalk.gray(' (Vanilla files)'),
  action
};
