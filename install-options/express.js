import chalk from 'chalk';

import confirm from '@inquirer/confirm';

import {
  addScripts,
  addTailwindDirectives,
  generateFiles,
  generateTailwindCssPath,
  installDependencies,
  setTailwindConfig,
} from '../lib/utils.js';
import {
  doWithSpinner,
  getFilePath,
  getViewEngine,
} from '../lib/message-utils.js';

async function action() {
  const confirmation = await confirm({
    message: 'Do you want add dev scripts for Tailwind compiling on save?',
  });
  const cssFilePath = await getFilePath('CSS file', './public/css/styles.css');
  await doWithSpinner(
    addTailwindDirectives.bind(
      null,
      confirmation ? generateTailwindCssPath(cssFilePath) : cssFilePath
    ),
    'Adding Tailwind directives...',
    'Directives added succesfully!'
  );
  await doWithSpinner(
    installDependencies.bind(null, '-D tailwindcss postcss autoprefixer'),
    'Installing tailwind dependencies...',
    'Dependencies installed succesfully!'
  );
  await doWithSpinner(
    generateFiles.bind(null, ['postcss', 'tailwind']),
    'Generating files...',
    'Files generated succesfully!'
  );

  const viewEngine = await getViewEngine();

  if (viewEngine !== 'none') {
    await doWithSpinner(
      setTailwindConfig.bind(null, [`./**/*.{html,${viewEngine}}`])
    );
  }

  if (!confirmation) {
    return;
  }

  await doWithSpinner(
    installDependencies.bind(null, '-D nodemon npm-run-all'),
    'Installing script dependencies...',
    'Dependencies installed succesfully!'
  );

  const indexPath = await getFilePath('Index file', './app.js');
  await doWithSpinner(
    addScripts.bind(
      null,
      indexPath,
      cssFilePath,
      generateTailwindCssPath(cssFilePath)
    ),
    'Adding scripts...',
    'Scripts added succesfully!'
  );
}

export default {
  name: chalk.blue('Express ready 💻'),
  action,
};
