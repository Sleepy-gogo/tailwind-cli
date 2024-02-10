#!/usr/bin/env node

import {
  simple,
  express,
  react,
  vue,
  svelte
} from './install-options/index.js';
import { farewell, welcome } from './lib/message-utils.js';
import { getInstallationType } from './lib/prompts.js';

const installOptions = [simple, express, react, vue, svelte];

async function app() {
  await welcome();
  const selectedOption = await getInstallationType(installOptions);
  await selectedOption.action();
  await farewell();
}

await app();
