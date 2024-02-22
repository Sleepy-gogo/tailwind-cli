<h1 align="center">TailwindCSS CLI Installer</h1>

![imagen](https://github.com/Sleepy-gogo/tailwind-cli/assets/62667318/c88d88fc-b30b-46ef-ba24-6b35dde9bdcb)

This project has been made to facilitate the installation of TailwindCSS, creating files, and adding dependencies as needed. This has been fine-tuned for personal use, but contributions are welcome.

## Usage 📖

Running the command

```bash
npx @sleepygogo/tailwindcss-cli
```

Will ask you what kind of installation you need, and then create the files and install the dependencies using the package manager used in your project.

> This is meant to be used on almost clear projects, and destructive behavior could be possible.

## Supported installations ☄️

### 🪛 Standard

Using this option, will create the `tailwind.config.js` and `postcss.config.js` files found in [Using PostCSS](https://tailwindcss.com/docs/installation/using-postcss)'s installation guide on TailwindCSS official docs. Further modifications may be needed for your project needs and specifications.

### Vite

Using any option of this category, will create the `tailwind.config.js` file from [Using Vite](https://tailwindcss.com/docs/guides/vite) on TailwindCSS official docs, based on the framework choosen.

- **⚛️ React ready**

This is mainly thought for Vite based projects. React frameworks as Gatsby, or Remix will be added in the future.

- **✨ Vue ready**

This is mainly thought for Vite based projects. Vue frameworks as Nuxt will be added in the future.

- **🧡 Svelte ready**

This is mainly thought for Vite based projects. Svelte frameworks as SvelteKit will be added in the future.

### 🚀 Next.js

Using this option will create the `tailwind.config.js` already configured for Next.js projects found in [Using Next.js](https://tailwindcss.com/docs/guides/nextjs)'s installation guide. Option thought specially for projects created without Tailwind already added via the `create-next-app`.

### 💻 Express

Using this option will create the `tailwind.config.js` specially thought for Express projects using a view engine, as it'll ask which one you're using.

Running this command will generate a `tailwind.css` file right next to your main one. This is so you can compile the classes from that file onto your main one. It'll also add the command for doing so:

```json
{
  "scripts": {
    "build:css": "npx tailwindcss -i path/to/tailwind.css -o path/to/style.css"
  }
}
```

It'll, also, ask if you want to also add quick scripts for tailwind's class compilation while you use the dev server. This was tuned for personal use, and may not be particularly useful for your project. It'll basically:

- Install nodemon and npm-run-all

- Create dev: scripts that whill run your applicacion, and tailwind's class compilation while you use the dev server using the --watch flag on Tailwindcss CLI. This is done for compatibility between OS's.
