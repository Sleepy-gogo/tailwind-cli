import chalk from 'chalk';

import {
  addTailwindDirectives,
  doWithSpinner,
  getCssPath,
  installDependencies,
} from '../lib/utils.js';

async function action() {
  const cssFilePath = await getCssPath();
  await doWithSpinner(
    addTailwindDirectives.bind(null, cssFilePath),
    'Adding Tailwind directives...',
    'Directives added succesfully!'
  );
  await doWithSpinner(
    installDependencies,
    'Installing dependencies...',
    'Dependencies installed succesfully!'
  );
}

export default {
  name: chalk.white('Just the files 🪛'),
  action,
};
