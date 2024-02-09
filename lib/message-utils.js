import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import { sleep, resolvePath } from './utils.js';
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

export async function getCssPath() {
  const answers = await inquirer.prompt({
    message: 'Enter the path to your CSS file: ',
    default: './styles.css',
    name: 'css_file_path',
    type: 'input',
  });

  return resolvePath(answers.css_file_path);
}

export async function welcome() {
  await doAnimation(chalkAnimation.rainbow('Welcome to TailwindCSS CLI'));
  console.clear();
}

export async function farewell() {
  await sleep();
  console.log(chalk.green.bold('\n✓ All done\n'));
  figlet('  E  n  j  o  y  !', (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
  });
}
