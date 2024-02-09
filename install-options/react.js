import chalk from 'chalk';
import { getCssPath } from '../lib/utils.js';

async function action() {
  const cssFilePath = await getCssPath();
  console.log('React | Absolute path to CSS file:', cssFilePath);
}

export default {
  name: chalk.blueBright('React ready ⚛️'),
  action,
};
