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
  return path.join(optionsPath, file);
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
          const innerOptions = await getOptions(
            getOptionPath(optionsPath, option)
          );
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

export async function getExpressScripts(indexPath, twPath) {
  const pm = (await detect()) ?? 'npm';

  return {
    dev: 'run-p dev:*',
    'dev:server': `nodemon ${indexPath}`,
    'dev:watch-css': `watch -n 0.5 '${pm} run build:css' ${twPath}`
  };
}
