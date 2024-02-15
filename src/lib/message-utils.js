import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { sleep } from './utils.js';

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

export async function farewell() {
  await sleep(1000);
  console.log(chalk.green.bold('\n✓ All done :D\n'));
}
