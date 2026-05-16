# collection-archive

A minimal Expo app with two tabs and localization support for English and Spanish.

## Getting started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Run the app in English

   ```bash
   pnpm run start:en
   ```

3. Run the app in Spanish

   ```bash
   pnpm run start:es
   ```

4. Run the web app in English

   ```bash
   pnpm run web:en
   ```

5. Run the web app in Spanish

   ```bash
   pnpm run web:es
   ```

## Scripts

- `pnpm run start` — start Expo in the default locale
- `pnpm run start:en` — start Expo in English
- `pnpm run start:es` — start Expo in Spanish
- `pnpm run web:en` — start the web app in English
- `pnpm run web:es` — start the web app in Spanish
- `pnpm run lint` — run Expo lint
- `pnpm run reset-project` — reset starter app files
- `pnpm run bump-version` — bump the version patch level
- `pnpm run bump-version -- patch` — bump the version patch level
- `pnpm run bump-version -- minor` — bump the version minor level
- `pnpm run bump-version -- major` — bump the version major level
- `pnpm run bump-version -- X.Y.Z` — set an explicit version

## Localization

This app reads the locale from the `APP_LOCALE` environment variable and supports:

- `en` — English
- `es` — Spanish

## Project structure

- `src/app/index.tsx` — Home tab
- `src/app/statistics.tsx` — Statistics tab
- `src/components/app-tabs.tsx` — Native tab navigator
- `src/components/app-tabs.web.tsx` — Web tab navigator
- `src/locales/en.json` — English translations
- `src/locales/es.json` — Spanish translations

## Changelog

See `CHANGELOG.md` for release history.

## License

This project is licensed under the MIT License. See `LICENSE`.
