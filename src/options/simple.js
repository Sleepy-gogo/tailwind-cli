import chalk from 'chalk';
import {
  addTailwindDirectives,
  generateFiles,
  installDependencies
} from '../lib/actions.js';
import { doWithSpinner } from '../lib/message-utils.js';
import { binaryQuestion, getFilePath } from '../lib/prompts.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './styles.css');
  const isESM = await binaryQuestion('Do you want to use ESM?');

  const files = isESM ? ['postcss-es', 'tailwind-es'] : ['postcss', 'tailwind'];

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
    generateFiles.bind(null, files),
    'Generating files...',
    'Files generated succesfully!'
  );
}

export default {
  name: `🪛 Standard ${chalk.gray('(Normal files)')}`,
  action,
  type: 'option'
};
