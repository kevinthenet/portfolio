# Kevin Castro's Portfolio

![Continuous Integration Badge](https://github.com/kevinthenet/portfolio/actions/workflows/continuous-integration.yml/badge.svg)

![Continuous Deployment Badge](https://github.com/kevinthenet/portfolio/actions/workflows/continuous-deployment.yml/badge.svg)

## 🏗️ Project Setup

To install and run this project locally:

```
npm install
```

This will install project dependencies.

To set up pre-commit hooks via the `husky` npm module:

```
npm run prepare
```

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```
/
├── cypress/
│   ├── components/
│   │   └── component-test.cy.ts
│   └── e2e/
│       └── e2e-test.cy.ts
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

> Note: Cypress requires the dev server to be running to run tests locally.

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, are placed in the `public/` directory.

## 🧞 Project Commands

All commands should be run from the root of the project:

| Command                    | Action                                                           |
| :------------------------- | :--------------------------------------------------------------- |
| `npm start`                | Starts local dev server at `localhost:4321`                      |
| `npm install`              | Installs dependencies                                            |
| `npm run build`            | Build your production site to `./dist/`                          |
| `npm run preview`          | Preview your build locally, before deploying                     |
| `npm run astro ...`        | Run CLI commands like `astro add`, `astro check`                 |
| `npm run astro -- --help`  | Get help using the Astro CLI                                     |
| `npm run test`             | Run test jobs locally                                            |
| `npm run test:spec`        | run a specific component test (append `-- path/to/test.cy.ts`)   |
| `npm run test:interactive` | Start up Cypress server (for interactive test editing)           |
| `npm run reset`            | Clears out the `dist` and `node_modules` directory for debugging |

## Local testing

In order to run tests locally, you first need to spin up a local dev server for cypress to connect to.

Run this command in a new terminal:

```sh
npm start
```

Then, run this command in a separate terminal:

```sh
npm run test
```
