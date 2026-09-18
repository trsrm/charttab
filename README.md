# ChartTab

> **Archived — not maintained.** Built on Chrome's Manifest V2, which Chrome
> has since retired; the extension was removed from the Chrome Web Store as a
> result and is not being ported to Manifest V3. Kept here for history.

A Chrome new-tab extension with two tabs:

- **Goals** — set a target (e.g. "read a 500-page book by Friday"), track
  progress as you go, and see a line chart of planned vs. actual progress.
- **Bookmarks** — a folder/thumbnail view of your bookmarks, richer than
  Chrome's built-in new-tab shortcuts.

## Build & development

### Install dependencies

Before building, run:

```bash
npm install
bower install
```

Run `grunt` for building and `grunt debug` for preview.

## Unit tests

Run `npm install` and then `npm run unit` to execute the test suite. Use `npm test` to run ESLint.

## Testing

Run `npm test` to run linting.

## Chrome Extension

Formerly published at the Chrome Web Store; delisted after Chrome dropped
Manifest V2 support. The store listing is no longer available.
