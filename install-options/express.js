import chalk from 'chalk';

async function action() {
  console.log('Express');
}

export default {
  name: chalk.blue('Express ready 💻'),
  action,
};
