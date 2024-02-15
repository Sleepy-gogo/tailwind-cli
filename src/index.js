#!/usr/bin/env node

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { farewell } from './lib/message-utils.js';
import { getOption } from './lib/prompts.js';
import { getOptions } from './lib/utils.js';
import chalk from 'chalk';

async function app() {
  console.clear();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const optionsPath = path.join(__dirname, 'options');
  const options = await getOptions(optionsPath);
  const selectedOption = await getOption(
    options,
    `Choose the type of your ${chalk.cyan('TailwindCSS')} instalation.`
  );
  await selectedOption.action();
  await farewell();
}

await app();
