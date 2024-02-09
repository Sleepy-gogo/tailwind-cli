import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import { detect } from 'detect-package-manager';

import files from './file-contents.js';

const execPromise = promisify(exec);

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addTailwindDirectives(cssPath) {
  try {
    let cssFileContent;
    try {
      cssFileContent = await fs.promises.readFile(resolvePath(cssPath), 'utf8');
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

    await fs.promises.writeFile(
      resolvePath(cssPath),
      modifiedCssContent,
      'utf8'
    );
  } catch (error) {
    throw new Error(chalk.bgRedBright("Couldn't add Tailwind directives."));
  }
}

export async function installDependencies(packages) {
  try {
    const pm = (await detect()) ?? 'npm';

    const { error } = await execPromise(`${pm} install ${packages}`);

    if (error) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(chalk.bgRedBright("Couldn't install dependencies."));
  }
}

export function resolvePath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

export async function generateFiles(fileList) {
  try {
    for (const item of fileList) {
      const file = files[item];
      const filePath = resolvePath(file.name);
      await fs.promises.writeFile(filePath, file.content, 'utf8');
    }
  } catch (error) {
    throw new Error(chalk.bgRedBright("Couldn't generate files."));
  }
}

export async function setTailwindConfig(content, ecmaScript = false) {
  try {
    const twConfigPath = resolvePath('tailwind.config.js');
    let configFileContent = await fs.promises.readFile(twConfigPath, 'utf-8');

    const contentRegex = /content:\s*(\[.*?\])/s;
    const match = configFileContent.match(contentRegex);

    if (match) {
      configFileContent = configFileContent.replace(
        match[1],
        JSON.stringify(content, null, 2)
      );
    } else {
      throw new Error();
    }

    if (ecmaScript) {
      configFileContent = configFileContent.replace(
        /module\.exports\s*=/,
        'export default'
      );
    }

    await fs.promises.writeFile(twConfigPath, configFileContent, 'utf-8');
  } catch {
    throw new Error(
      chalk.bgRedBright('No se pudo encontrar el content en tailwind.config.js')
    );
  }
}

export async function addScripts(scripts) {
  try {
    const packageJsonPath = resolvePath('package.json');

    let packageJsonContent = await fs.promises.readFile(
      packageJsonPath,
      'utf-8'
    );
    let packageJson = JSON.parse(packageJsonContent);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts = {
      ...packageJson.scripts,
      ...scripts,
    };

    await fs.promises.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf-8'
    );
  } catch {
    throw new Error(
      chalk.bgRedBright('No se pudo agregar los scripts al package.json')
    );
  }
}

export function generateTailwindCssPath(cssFilePath) {
  // Obtener el directorio donde se encuentra el archivo algo.css
  const cssDirectory = path.dirname(cssFilePath);

  // Construir el camino al archivo tailwind.css en la misma carpeta
  const tailwindCssPath = path.join(cssDirectory, 'tailwind.css');

  return tailwindCssPath;
}
