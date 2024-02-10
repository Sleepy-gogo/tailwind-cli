import chalk from 'chalk';
import inquirer from 'inquirer';

export async function getFilePath(file, defaultPath) {
  const answers = await inquirer.prompt({
    message: `Enter the path to your ${chalk.cyan(file)}: `,
    default: defaultPath,
    name: 'file_path',
    type: 'input'
  });
  return answers.file_path;
}

export async function getViewEngine() {
  const answers = await inquirer.prompt({
    message: `Choose your ${chalk.cyan('view engine')}: `,
    name: 'view_engine',
    type: 'list',
    choices: ['Ejs', 'Pug', 'Mst', 'None']
  });
  return answers.view_engine.toLowerCase();
}

export async function getInstallationType(options) {
  const answers = await inquirer.prompt({
    message: `Choose the type of your ${chalk.cyan(
      'TailwindCSS'
    )} instalation.`,
    name: 'instalation_type',
    type: 'list',
    choices: options.map((option) => option.name)
  });
  const selectedInstallOption = options.find(
    (option) => option.name === answers.instalation_type
  );
  return selectedInstallOption;
}
