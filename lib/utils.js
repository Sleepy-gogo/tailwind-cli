import path from 'path';
import fs from 'fs';
import { detect } from 'detect-package-manager';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resolvePath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

export function generateTailwindCssPath(cssFilePath) {
  const cssDirectory = path.dirname(cssFilePath);
  const tailwindCssPath = path.join(cssDirectory, 'tailwind.css');

  return tailwindCssPath;
}

export function getOptionPath(optionsPath, file) {
  const filePath = path.join(optionsPath, file);
  const fileURL = new URL(`file://${filePath}`).toString();
  return fileURL;
}

export async function getOptionData(optionsPath, file) {
  return (await import(getOptionPath(optionsPath, file))).default;
}

export async function getOptions(optionsPath) {
  const files = fs.readdirSync(optionsPath);
  const options = [];

  await Promise.all(
    files.map(async (option) => {
      try {
        let optionData;
        if (option.endsWith('.js')) {
          optionData = await getOptionData(optionsPath, option);
        } else {
          const innerOptions = await getOptions(path.join(optionsPath, option));
          optionData = {
            name: `📁 ${option}`,
            type: 'dir',
            options: innerOptions
          };
        }

        options.push(optionData);
      } catch (error) {
        console.error(`Error processing option ${option}:`, error);
      }
    })
  );
  return options;
}

const pmExecuters = {
  npm: 'npx',
  yarn: 'yarn',
  pnpm: 'pnpx',
  bun: 'bunx'
};

export async function getExpressScripts(indexes, devScripts) {
  const pm = (await detect()) ?? 'npm';
  const executer = pmExecuters[pm];

  const scripts = {
    'build:css': `${executer} tailwindcss -i ${indexes.tw} -o ${indexes.css}`
  };

  if (devScripts) {
    scripts.dev = 'run-p dev:*';
    scripts['dev:server'] = `nodemon ${indexes.index}`;
    scripts[
      'dev:watch-css'
    ] = `${executer} tailwindcss -i ${indexes.tw} -o ${indexes.css} --watch`;
  }

  return scripts;
}
