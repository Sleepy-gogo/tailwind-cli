import {
  addTailwindDirectives,
  generateFiles,
  installDependencies,
  setTailwindConfig
} from '../lib/actions.js';
import { doWithSpinner } from '../lib/message-utils.js';
import { binaryQuestion, getFilePath } from '../lib/prompts.js';

async function action() {
  const useSrc = await binaryQuestion('Are you using the src folder?');
  const cssFilePath = await getFilePath(
    'globals.css file',
    `./${useSrc ? 'src/' : ''}app/globals.css`
  );

  const content = useSrc
    ? ['./src/**/*.{js,ts,jsx,tsx,mdx}']
    : [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}'
      ];

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
    setTailwindConfig.bind(null, content),
    'Setting Tailwind config...',
    'Config set succesfully!'
  );
}

export default {
  name: '🚀 NextJS ready',
  action,
  type: 'option'
};
