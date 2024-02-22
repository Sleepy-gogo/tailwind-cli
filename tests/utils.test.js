import { expect, test } from 'vitest';
import {
  getOptions,
  generateTailwindCssPath,
  getExpressScripts
} from '../src/lib/utils.js';

const options = await getOptions('tests/test-options');

test('Loads all the available options', () => {
  expect(options).toHaveLength(3);
});

test('Loads all the available suboptions', () => {
  const dirOption = options.find((option) => option.type === 'dir');
  expect(dirOption.options).toHaveLength(1);
});

test('Option actions work', () => {
  const option = options.find((option) => option.name === 'Option 1');
  expect(option.action()).toBe('Action working');
});

test('Generates the correct path', () => {
  const cssFilePath = './src/css/styles.css';
  const tailwindCssPath = 'src/css/tailwind.css';
  expect(generateTailwindCssPath(cssFilePath)).toBe(tailwindCssPath);
});

test('Express scripts generated correctly', async () => {
  const cssPath = './css/styles.css';
  const twPath = generateTailwindCssPath(cssPath);

  const scripts = await getExpressScripts(
    {
      index: './index.js',
      tw: twPath,
      css: cssPath
    },
    false
  );
  const expectedScripts = {
    'build:css': 'bunx tailwindcss -i css/tailwind.css -o ./css/styles.css'
  };

  expect(scripts).toMatchObject(expectedScripts);
});

test('Express dev scripts generated correctly', async () => {
  const cssPath = './css/styles.css';
  const twPath = generateTailwindCssPath(cssPath);

  const scripts = await getExpressScripts(
    {
      index: './index.js',
      tw: twPath,
      css: cssPath
    },
    true
  );
  const expectedScripts = {
    'build:css': 'bunx tailwindcss -i css/tailwind.css -o ./css/styles.css',
    dev: 'run-p dev:*',
    'dev:server': 'nodemon ./index.js',
    'dev:watch-css':
      'bunx tailwindcss -i css/tailwind.css -o ./css/styles.css --watch'
  };

  expect(scripts).toMatchObject(expectedScripts);
});
