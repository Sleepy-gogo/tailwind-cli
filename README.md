<h1 align="center">TailwindCSS CLI Installer</h1>

![imagen](https://github.com/Sleepy-gogo/tailwind-install/assets/62667318/2613ca1b-812c-4cc3-a397-6deed45784e6)


This project has been made to facilitate the installation of TailwindCSS, creating files, and adding dependencies as needed. This has been fine-tuned for personal use, but contributions are welcome.

## Usage 📖

Running the command

```bash
npx @sleepygogo/tailwindcss-cli
```

Will ask you what kind of installation you need, and then create the files and install the dependencies using the package manager used in your project.

> This is meant to be used on almost clear projects, and destructive behavior could be possible.

## Supported installations ☄️

### Standard 🪛

Using this option, will create the `tailwind.config.js` and `postcss.config.js` files found in [Using PostCSS](https://tailwindcss.com/docs/installation/using-postcss)'s installation guide on TailwindCSS official docs. Further modifications may be needed for your project needs and specifications.

### React ready ⚛️

Using this option, will create the `tailwind.config.js` file from [Using Vite#React](https://tailwindcss.com/docs/guides/vite#react) on TailwindCSS official docs. This is mainly thought for Vite based projects. React frameworks as Next, Gatsby, Remix will be added in the future.

### Express ready 💻

Using this option will create the `tailwind.config.js` specially thought for Express projects using a view engine, as it'll ask which one you're using.

It'll, also, ask if you want to also add quick scripts for tailwind's class compilation while you use the dev server. This may be a bit weird, as it'll not put the rules on your css file, instead creating a new one, and compiling from it to your original file as you edit. This was tuned for personal use, and may not be particularly useful for your project.

If the scripts are not selected, you may need to add your own to compile the tailwind css to your css file. This is how it may look like:

```json
{
  "name": "your-project",
  ...
  "scripts": {
    "build:css": "postcss styles.css -o public/styles.css"
  },
  ...
}
```
