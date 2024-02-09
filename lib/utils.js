import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import { detect } from 'detect-package-manager';
import { createSpinner } from 'nanospinner';

const execPromise = promisify(exec);

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function doAnimation(animation, duration = 2000) {
  await sleep(duration);
  animation.stop();
}

export async function getCssPath() {
  const answers = await inquirer.prompt({
    message: 'Enter the path to your CSS file: ',
    default: './styles.css',
    name: 'css_file_path',
    type: 'input',
  });

  return path.resolve(process.cwd(), answers.css_file_path);
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

export async function addTailwindDirectives(cssPath) {
  try {
    let cssFileContent;
    try {
      cssFileContent = await fs.promises.readFile(cssPath, 'utf8');
    } catch {
      cssFileContent = '';
    }

    const linesToAdd = [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;',
    ];

    let lines = cssFileContent.split('\n');
    lines = [...linesToAdd, ...lines];

    const modifiedCssContent = lines.join('\n');

    await fs.promises.writeFile(cssPath, modifiedCssContent, 'utf8');
  } catch (error) {
    throw new Error(chalk.bgRedBright("Couldn't add Tailwind directives."));
  }
}

export async function installDependencies() {
  try {
    const pm = (await detect()) ?? 'npm';

    const { error } = await execPromise(
      `${pm} install -D tailwindcss postcss autoprefixer`
    );

    if (error) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(chalk.bgRedBright("Couldn't install dependencies."));
  }
}

export async function generateFiles() {
  const dir = process.cwd();
}
