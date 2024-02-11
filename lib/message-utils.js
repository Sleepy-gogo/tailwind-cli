import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';

import { sleep } from './utils.js';

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

export async function welcome() {
  await doAnimation(chalkAnimation.radar('Welcome to TailwindCSS CLI'), 1500);
  console.clear();
}

export async function farewell() {
  await sleep(1000);
  console.log(chalk.green.bold('\n✓ All done\n'));
  figlet('  E  n  j  o  y  !', (_, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
  });
}
