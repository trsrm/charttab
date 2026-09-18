# Repository Guidelines

> Archived project (see README). These guidelines are kept for reference,
> not because active development is expected.

## Project Structure & Module Organization
- `app/`: Source for the Chrome extension.
  - `scripts/`: AngularJS 1.x app code
    - `controllers/` (e.g., `NewTabCtrl.js`)
    - `services/` (e.g., `bookmarks.js`, `charts.js`)
    - `directives/` (e.g., `chart.js`)
    - `charttab.js`, `config.js`
  - `views/`, `styles/`, `images/`, `_locales/`
  - `manifest.json`, `newtab.html`
- `dist/`: Production build output.
- `package/`: Zipped releases created by Grunt packaging.
- `Gruntfile.js`: Build/debug tasks.  `eslint.config.js`/`.prettierrc`: lint/format rules.

## Build, Test, and Development Commands
- `npm run debug`: Runs `grunt debug`; serves from `app/` with live reload.
- `npm run build`: Runs `grunt build`; outputs to `dist/` (minified assets, processed HTML).
- `npm test`: Lints `app/` with ESLint.
- `npm run format`: Formats JS files via Prettier.
Tip: For Chrome, use “Load unpacked” from `app/` during development and from `dist/` after a build.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; semicolons; single quotes; trailing commas where valid.
- Tools: ESLint (see `eslint.config.js`) and Prettier (see `.prettierrc`).
- AngularJS patterns: register on `angular.module('charttab')`; keep controllers lean, move logic to services.
- Names: controllers `PascalCase` (e.g., `NewTabCtrl.js`); services/directives `lowerCamel` (e.g., `bookmarks.js`, `chart.js`).

## Testing Guidelines
- Framework: No unit tests yet; CI test is linting (`npm test`).
- Additions: If introducing tests, prefer co-located `*.spec.js` next to source or `app/scripts/__tests__/` and keep functions small and pure for easy testing.

## Commit & Pull Request Guidelines
- Commits: Imperative subject line; group related changes. Release commits often start with a version tag (e.g., `[0.5.6]` or `0.5.6 release:`) followed by a short change list.
- PRs: Include a clear description, linked issues, and screenshots/GIFs for UI changes. Note any manifest permission changes. Keep diffs focused.

## Security & Configuration Tips
- Permissions: Keep `app/manifest.json` permissions minimal; justify changes in PRs.
- Localization: Put user-facing strings in `_locales/`.
- Config: Prefer `app/scripts/config.js` for constants and avoid hardcoding secrets (none should be required for this extension).

