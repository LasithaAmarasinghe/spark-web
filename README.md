# Spark Web

This is official website of SPARK Branch, ENTC. This repository contains the web frontend used to present community projects, challenge details and undergraduate work. The site is built with Next.js (App Router), React, TypeScript and Tailwind CSS with Mantine UI components.

## Key features

- Static export-friendly Next.js app (configured to export to a base path)
- Content driven from local JSON files in `constants/`
- Reusable, responsive UI components and a simple app shell

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS, PostCSS
- Mantine UI components

## Quick start

Make sure you have Node.js installed. From the repository root (Windows / cmd.exe):

```cmd
npm run clean
npm run dev
```

To build and run a production export:

```cmd
npm run build
npm run start
```

## Project structure (high level)

- `app/` — Next.js App Router pages and layout
	- `app/layout.tsx` — global layout, fonts and providers
	- `app/page.tsx`, `app/challenge/page.tsx`, `app/pi_community/page.tsx` — pages
- `clients/` — page client components that wire data -> UI
- `components/` — reusable UI components (app shell, cards, carousel, modal, etc.)
- `constants/` — source JSON content used to render pages (community, challenge, etc.)
- `models/` — TypeScript models for page/component data shapes
- `utils/` — helper utilities (json loader, images, colors, breakpoints, fonts)
- `public/` — static assets, images and site manifest

Notable files:

- `next.config.mjs` — app configuration (basePath / export settings)
- `tailwind.config.ts`, `postcss.config.mjs` — styling toolchain
- `utils/json_utils.ts` — loader used to read JSON content from `constants/`

## Content & data

Editable content lives in `constants/`. Pages read JSON at build/time using `getJsonData` (see `utils/json_utils.ts`). Example files:
- `constants/community/pi_mora.json`
- `constants/community/tech_demo.json`
- `constants/challenge/challenge.json`

To change displayed content, update or add files under `constants/` and rebuild.

## Development notes

- The app uses a `basePath` (configured in `next.config.mjs`) so static assets and routing assume the site is served under a subpath (for this project it is configured to `/spark`).
- Responsive helpers such as `useIsMobile` (in `utils/breakpoint_utils.ts`) are used widely for layout choices.
- Fonts are configured in `utils/font_utils.ts` and applied in `app/layout.tsx`.

## Contributing

Contributions are welcome. For small changes:

1. Fork the repo
2. Create a feature branch
3. Update JSON content or components
4. Run the app locally and verify
5. Open a pull request with a short description

## Where to look first (recommended)

1. `app/layout.tsx` — global providers, fonts and layout
2. `clients/*_client.tsx` — entry points for page content and rendering
3. `components/custom_app_shell/custom_app_shell.tsx` — header and shell behavior
4. `utils/json_utils.ts` — how JSON content is loaded

---
