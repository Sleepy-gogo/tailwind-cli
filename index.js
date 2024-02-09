#!/usr/bin/env node

import inquirer from 'inquirer';
import {
  simple,
  express,
  react,
  vue,
  svelte,
} from './install-options/index.js';
import { farewell, welcome } from './lib/message-utils.js';
import chalk from 'chalk';

const installOptions = [simple, express, react, vue, svelte];

async function app() {
  await welcome();
  const answers = await inquirer.prompt({
    message: `Choose the type of your ${chalk.cyan(
      'TailwindCSS'
    )} instalation.`,
    name: 'instalation_type',
    type: 'list',
    choices: installOptions.map((option) => option.name),
  });
  const selectedInstallOption = installOptions.find(
    (option) => option.name === answers.instalation_type
  );

  await selectedInstallOption.action();
  await farewell();
}

await app();
