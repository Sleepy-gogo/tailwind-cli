import chalk from 'chalk';
import inquirer from 'inquirer';
import confirm from '@inquirer/confirm';

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

export async function binaryQuestion(message) {
  const confirmation = await confirm({
    message
  });
  return confirmation;
}

export async function getOption(options, message) {
  const { option } = await inquirer.prompt({
    message,
    name: 'option',
    type: 'list',
    choices: options
      .map((option) => option.name)
      .sort((a, b) => a.localeCompare(b))
  });

  let selectedOption = options.find((element) => element.name === option);

  if (selectedOption.type === 'dir') {
    selectedOption = await getOption(
      selectedOption.options,
      `Choose the type of ${chalk.cyan(
        selectedOption.name.substring(2)
      )} instalation.`
    );
  }

  return selectedOption;
}
