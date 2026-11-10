# Gualtiero Debernardi Portfolio

Personal portfolio built with Astro, React, and Tailwind CSS.

## Development

Requires Node.js 22.23.4 or newer.

```sh
npm ci
npx astro dev --background
npm run build
npm run preview
```

Manage the background dev server with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.

## Projects

Project entries live in `src/content/projects/` as Markdown files. Each entry requires a numeric `order`, `title`, `category`, `description`, and `tags`. Lower order values appear first. Available categories are defined in `src/content/project-categories.ts`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on pushes to `main` or a manual workflow run. The production site and repository base path are configured in `astro.config.mjs`.
