# Repository Guidelines

## Project Structure & Module Organization

This repository is an npm workspace managed with Turborepo. The browser application lives in `apps/web`; its React entry points are under `apps/web/src`, and Vite configuration is in `apps/web/vite.config.ts`. Reusable UI code belongs in `packages/ui/src`: place components in `components/`, helpers in `lib/`, hooks in `hooks/`, and shared styles in `styles/globals.css`. Import shared modules through package exports, for example `@workspace/ui/components/button`, rather than reaching across directories with relative paths. Build output is written to `dist/` and should not be committed.

## Build, Test, and Development Commands

Run commands from the repository root with Node.js 20 or newer and npm 11.

- `npm install` installs all workspace dependencies.
- `npm run dev` starts persistent development tasks; the web workspace runs Vite.
- `npm run build` type-checks and creates the production web bundle.
- `npm run lint` runs ESLint across workspaces.
- `npm run typecheck` checks TypeScript without emitting files.
- `npm run format` rewrites TypeScript and TSX with Prettier and its Tailwind plugin.
- `npm --workspace web run preview` serves the production build locally.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Follow the existing Prettier output: two-space indentation, no semicolons, and double quotes in TS/TSX. ESLint enforces recommended JavaScript, TypeScript, React Hooks, and Vite refresh rules. Name component files in lowercase kebab case (`theme-provider.tsx`), exported components in PascalCase, hooks with a `use` prefix, and utilities in camelCase. Prefer Tailwind utility classes and use the shared `cn` helper for conditional class composition.

## Testing Guidelines

No automated test framework or coverage threshold is configured yet. Before submitting changes, run `npm run lint`, `npm run typecheck`, and `npm run build`, then manually verify affected UI states in Vite. If introducing tests, colocate them as `*.test.ts` or `*.test.tsx` and add the runner to the relevant workspace plus the root Turbo pipeline.

## Commit & Pull Request Guidelines

Recent history uses short, lowercase, imperative summaries (for example, `remove turborepo and migrate to shadcn monorepo`). Keep commits focused and describe the user-visible intent. Pull requests should include a concise summary, validation commands run, linked issues when applicable, and screenshots or recordings for visual changes. Call out configuration, dependency, or shared-component changes that affect multiple workspaces.
