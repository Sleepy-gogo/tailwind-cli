#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';

import { doAnimation } from './lib/utils.js';
import { simple, express, react } from './install-options/index.js';

async function welcome() {
  await doAnimation(chalkAnimation.rainbow('Welcome to TailwindCSS CLI'));
}

async function menu() {
  const installOptions = [simple, express, react];

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
}

await welcome();
await menu();
