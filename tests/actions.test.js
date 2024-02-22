import fs from 'fs';
import mock from 'mock-fs';
import { expect, test } from 'vitest';

import {
  addScripts,
  addTailwindDirectives,
  generateFiles,
  setTailwindConfig
} from '../src/lib/actions.js';

mock({
  'css/styles.css': 'body { color: red; }',
  'package.json': JSON.stringify({
    scripts: {
      test: 'echo "Error: no test specified"'
    }
  }),
  'bun.lockb': ''
});

test('Adds Tailwind directives', async () => {
  const cssPath = 'css/styles.css';
  const expected =
    '@tailwind base;\n@tailwind components;\n@tailwind utilities;\nbody { color: red; }';

  await addTailwindDirectives(cssPath);

  expect(await fs.promises.readFile(cssPath, 'utf-8')).toMatch(expected);
});

test('Generate tailwind files', async () => {
  const fileList = ['postcss', 'tailwind'];

  await generateFiles(fileList);
  const files = await fs.promises.readdir('');

  expect(files).contain('postcss.config.js', 'tailwind.config.js');
});

test('Generated files are not empty', async () => {
  const fileList = ['postcss-es', 'tailwind-es'];

  await generateFiles(fileList);

  const twContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  const pcContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;

  expect(await fs.promises.readFile('tailwind.config.js', 'utf-8')).toMatch(
    twContent
  );
  expect(await fs.promises.readFile('postcss.config.js', 'utf-8')).toMatch(
    pcContent
  );
});

test('Set custom Tailwind config', async () => {
  const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
  await setTailwindConfig(content);

  const configFileContent = await fs.promises.readFile(
    'tailwind.config.js',
    'utf-8'
  );

  const contentRegex = /content:\s*(\[.*?\])/s;
  const match = configFileContent.match(contentRegex);

  expect(match[1]).toMatch(JSON.stringify(content, null, 2));
});

test('Add scripts', async () => {
  const scripts = {
    test: 'echo tested',
    other: 'echo "another test"'
  };

  await addScripts(scripts);

  const packageJsonContent = await fs.promises.readFile(
    'package.json',
    'utf-8'
  );
  const packageScripts = JSON.parse(packageJsonContent).scripts;

  expect(packageScripts).toMatchObject(scripts);
});
