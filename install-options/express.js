import chalk from 'chalk';
import { getCssPath } from '../lib/utils.js';

async function action() {
  const cssFilePath = await getCssPath();
  console.log('Express | Absolute path to CSS file:', cssFilePath);
}

export default {
  name: chalk.blue('Express ready 💻'),
  action,
};
