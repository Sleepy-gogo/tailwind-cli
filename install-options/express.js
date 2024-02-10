import chalk from 'chalk';
import confirm from '@inquirer/confirm';
import { detect } from 'detect-package-manager';
import { getFilePath, getViewEngine } from '../lib/prompts.js';
import {
  addScripts,
  addTailwindDirectives,
  generateFiles,
  generateTailwindCssPath,
  installDependencies,
  setTailwindConfig
} from '../lib/utils.js';
import { doWithSpinner } from '../lib/message-utils.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './public/css/styles.css');
  const twPath = generateTailwindCssPath(cssFilePath);
  await doWithSpinner(
    addTailwindDirectives.bind(null, twPath),
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
  await doWithSpinner(
    addScripts.bind(null, {
      'build:css': `postcss ${twPath} -o ${cssFilePath}`
    }),
    'Adding css compiling scripts...',
    'Css compiling scripts added succesfully!'
  );

  const viewEngine = await getViewEngine();

  if (viewEngine !== 'none') {
    await doWithSpinner(
      setTailwindConfig.bind(null, [`./**/*.{html,${viewEngine}}`]),
      'Setting Tailwind config...',
      'Config set succesfully!'
    );
  }

  const confirmation = await confirm({
    message: 'Do you want add dev scripts for Tailwind compiling on save?'
  });

  if (!confirmation) {
    return;
  }

  await doWithSpinner(
    installDependencies.bind(null, '-D nodemon npm-run-all'),
    'Installing script dependencies...',
    'Dependencies installed succesfully!'
  );

  const indexPath = await getFilePath('Index file', './app.js');
  const pm = (await detect()) ?? 'npm';

  await doWithSpinner(
    addScripts.bind(null, {
      dev: 'run-p dev:*',
      'dev:server': `nodemon ${indexPath}`,
      'dev:watch-css': `watch -n 0.5 '${pm} run build:css' ${twPath}`
    }),
    'Adding scripts...',
    'Scripts added succesfully!'
  );
}

export default {
  name: chalk.blue('Express ready 💻'),
  action
};
