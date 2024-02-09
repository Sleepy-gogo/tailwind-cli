import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import { sleep } from './utils.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';

export async function doAnimation(animation, duration = 2000) {
  await sleep(duration);
  animation.stop();
}

export async function doWithSpinner(action, message, success = 'Done!') {
  const spinner = createSpinner(message).start();
  try {
    await action();
    spinner.success({ text: success });
  } catch (error) {
    spinner.error({ text: error });
    process.exit(1);
  }
}

export async function getFilePath(file, defaultPath) {
  const answers = await inquirer.prompt({
    message: `Enter the path to your : ${file}`,
    default: defaultPath,
    name: 'file_path',
    type: 'input',
  });
  return answers.file_path;
}

export async function welcome() {
  await doAnimation(chalkAnimation.radar('Welcome to TailwindCSS CLI'));
  console.clear();
}

export async function farewell() {
  await sleep(1000);
  console.log(chalk.green.bold('\n✓ All done\n'));
  figlet('  E  n  j  o  y  !', (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
  });
}

export async function getViewEngine() {
  const answers = await inquirer.prompt({
    message: 'Choose your view engine: ',
    name: 'view_engine',
    type: 'list',
    choices: ['Ejs', 'Pug', 'Mst', 'None'],
  });
  return answers.view_engine.toLowerCase();
}
