import { binaryQuestion, getFilePath, getViewEngine } from '../lib/prompts.js';
import { generateTailwindCssPath, getExpressScripts } from '../lib/utils.js';
import { doWithSpinner } from '../lib/message-utils.js';
import {
  addScripts,
  addTailwindDirectives,
  generateFiles,
  installDependencies,
  setTailwindConfig
} from '../lib/actions.js';

async function action() {
  const cssFilePath = await getFilePath('CSS file', './public/css/styles.css');
  const viewEngine = await getViewEngine();
  const isESM = await binaryQuestion('Do you want to use ESM?');
  const confirmation = await binaryQuestion(
    'Do you also want add dev scripts for Tailwind compiling on save?'
  );

  let indexPath;
  if (confirmation) {
    indexPath = await getFilePath('Index file', './app.js');
  }

  const files = isESM ? ['postcss-es', 'tailwind-es'] : ['postcss', 'tailwind'];
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
    generateFiles.bind(null, files),
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

  if (viewEngine !== 'none') {
    await doWithSpinner(
      setTailwindConfig.bind(null, [`./**/*.{html,${viewEngine}}`]),
      'Setting Tailwind config...',
      'Config set succesfully!'
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

  const scripts = await getExpressScripts(indexPath, twPath);

  await doWithSpinner(
    addScripts.bind(null, scripts),
    'Adding scripts...',
    'Scripts added succesfully!'
  );
}

export default {
  name: '💻 Express ready',
  action,
  type: 'option'
};
