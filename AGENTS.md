# Repository Guidelines

## Project Overview

Lune UI is a high-performance, shadcn-compatible source registry built on Base UI.

The repository uses shadcn's official monorepo workflow:

```text
apps/web
  → docs/playground

packages/ui
  → canonical Lune UI source
  → components
  → hooks
  → utilities
  → shared styles
```

`apps/web` previews and documents the exact components from `packages/ui`. Do not create duplicate component implementations inside the app.

Lune is not a conventional compiled UI library first. Its primary distribution model is source installation through the shadcn CLI and registry system.

## Project Structure & Module Organization

This repository is a workspace managed with Turborepo.

The browser playground lives in `apps/web`. Its React entry points are under `apps/web/src`, and Vite configuration is in `apps/web/vite.config.ts`.

Canonical reusable UI source belongs in `packages/ui/src`:

- `components/` — UI components
- `hooks/` — reusable UI behavior
- `lib/` — utilities
- `styles/` — shared theme and motion styles

Import shared modules through package exports, for example:

```ts
import { Button } from "@workspace/ui/components/button"
```

Do not reach across workspaces with relative filesystem imports.

Build output such as `dist/` must not be committed.

## shadcn / Base UI Rules

Lune uses **Base UI** as its primitive foundation through the shadcn `base-nova` style.

New shadcn components must use the Base UI implementation unless a deliberate architectural decision says otherwise.

Use shadcn's official monorepo workflow:

```bash
cd apps/web
npx shadcn@latest add button
```

The CLI should route reusable UI components into `packages/ui`.

Requirements:

- `apps/web/components.json` and `packages/ui/components.json` must stay compatible
- keep the same `style`, `iconLibrary`, and `baseColor` across workspaces
- use `style: "base-nova"`
- use `cssVariables: true`
- keep Tailwind v4 `tailwind.config` empty in `components.json`
- shared UI imports must resolve through the workspace package
- do not manually copy generated components between workspaces
- there must be one canonical source file for each reusable component

## Theme Contract

Lune components must remain fully compatible with the shadcn semantic theme system.

Components consume semantic tokens such as:

```text
bg-background
text-foreground
bg-primary
text-primary-foreground
bg-secondary
text-secondary-foreground
bg-accent
text-accent-foreground
bg-muted
text-muted-foreground
bg-destructive
text-destructive-foreground
border-border
border-input
ring-ring
```

### Never hardcode component colors

Component styling must not contain literal palette values such as:

```text
white
black
gray
zinc
slate
neutral
red
blue
#hex
rgb()
hsl()
oklch()
color-mix()
```

Actual colors belong to the theme layer, not component files.

Do not add component-specific dark-mode color branches when semantic tokens can express the state.

Prefer:

```tsx
className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
```

instead of literal light/dark palette rules.

The separation is:

```text
theme
  → semantic tokens
  → Lune components
  → structure, sizing, motion, interaction
```

A consumer must be able to replace the shadcn theme without modifying Lune component source.

## Motion & Performance

Lune treats performance and motion quality as first-class requirements.

Targets:

- smooth 60 FPS minimum
- 120 Hz-friendly interactions where practical
- minimal main-thread work during animation
- no unnecessary per-frame React state updates

Prefer compositor-friendly animation:

```text
transform
opacity
```

Avoid layout-driven animation where possible:

```text
width
height
top
left
margin
padding
```

Avoid expensive mass effects:

```text
filter
blur
backdrop-filter
mass will-change
large animated shadows
continuous JS animation loops
```

Use CSS transitions by default.

Use polished transitions.dev-style motion patterns where appropriate, but adapt them to Lune's shared motion system rather than copying arbitrary timings into components.

Use Motion only when CSS is insufficient for a genuinely complex interaction such as:

- drag/reorder
- shared layout movement
- gesture-driven interactions
- complex presence/layout interpolation

Do not make basic components depend on a JS animation runtime unnecessarily.

Shared durations, easing, scale values, and motion behavior belong in shared motion tokens.

Do not hardcode arbitrary animation durations or easing curves throughout component files.

All animated components must respect `prefers-reduced-motion`.

Do not use `will-change` as a generic optimization. Add it only when profiling demonstrates a real benefit.

## Component Architecture

Start from current shadcn/Base UI implementations and modify them into Lune components.

Preserve useful primitive behavior including:

- accessibility semantics
- keyboard interaction
- focus management
- ARIA behavior
- escape handling
- portal behavior

Do not rewrite Base UI primitives from scratch merely to change styling.

Components should be:

- focused
- composable
- source-copyable
- theme-driven
- accessible
- dependency-light
- easy to understand after installation into another project

Avoid speculative abstractions.

Reuse real concepts, not arbitrary fragments of code.

Do not create generalized components with oversized prop APIs simply to remove a few repeated lines.

Around 250–300 LOC should trigger a responsibility review, not an automatic file split. Split only when doing so creates a meaningful ownership boundary.

## Dependency Discipline

Each registry component should bring only what it actually requires.

Installing a simple component such as Button must not unnecessarily pull in:

- Motion
- dialog infrastructure
- popover infrastructure
- large animation helper libraries
- unrelated Lune components

Keep dependency graphs shallow.

Prefer existing shared helpers such as `cn` rather than duplicating utilities.

## Playground Rules

`apps/web` is the Lune development playground and documentation surface.

Use it to test each component across relevant states:

- light mode
- dark mode
- multiple semantic themes
- hover
- focus
- pressed
- disabled
- loading
- keyboard interaction
- reduced motion
- narrow layouts
- wide layouts

The playground should import the exact canonical component source from `packages/ui`.

Do not create playground-only copies of reusable UI components.

Keep the playground straightforward. It exists to develop, demonstrate, and stress-test Lune components, not to become a separate product.

## Coding Style & Naming Conventions

Use TypeScript and functional React components.

Follow the existing Prettier output:

- two-space indentation
- no semicolons
- double quotes in TS/TSX

Name:

- component files in lowercase kebab case (`theme-provider.tsx`)
- exported components in PascalCase
- hooks with a `use` prefix
- utilities in camelCase

Prefer Tailwind utilities and the shared `cn` helper for class composition.

Do not bypass package exports with deep relative imports across workspaces.

## Testing Guidelines

Use the repository's configured test stack for component and utility behavior.

Prioritize tests for:

- interaction behavior
- accessibility-critical behavior
- state transitions
- keyboard controls
- reduced-motion behavior when meaningful
- registry-safe imports
- bugs that could regress

Do not write brittle tests that merely snapshot long class strings.

Visual changes must also be manually checked in `apps/web`.

For performance-sensitive components, inspect browser profiling when behavior could affect:

- scripting
- layout
- paint
- compositing
- React render frequency
- memory
- long tasks

## Build, Test, and Development Commands

Run commands from the repository root using the package manager and Node version configured by the repository.

Typical commands:

- `npm install` — install workspace dependencies
- `npm run dev` — start Turborepo development tasks
- `npm run build` — type-check and build workspaces
- `npm run lint` — run linting
- `npm run typecheck` — run TypeScript checks
- `npm run test` — run tests when configured
- `npm run format` — format supported files
- `npm --workspace web run preview` — preview the production web build

Use the actual scripts declared in `package.json` as the source of truth if they differ from this list.

Before claiming a change is complete, run all relevant:

```text
format
lint
typecheck
tests
build
```

For registry or shadcn configuration changes, also validate that the CLI can install the affected component into the intended workspace correctly.

## Registry Rules

Lune's external shadcn registry should publish the same canonical source developed in `packages/ui`.

Do not maintain a second registry-specific copy of components.

The intended flow is:

```text
shadcn CLI
  → packages/ui canonical source
  → customize into Lune
  → apps/web previews same source
  → registry publishes same source
  → consuming apps receive editable source
```

Registry entries must declare required package and registry dependencies accurately.

Do not assume a component is complete merely because it works inside the monorepo. Test source installation through the shadcn CLI when registry behavior changes.

## Change Discipline

Before changing a component or shared system:

1. identify the correct ownership location
2. inspect the existing shadcn/Base UI implementation
3. search for existing Lune tokens/helpers first
4. preserve semantic theme compatibility
5. preserve accessibility behavior
6. preserve performance constraints
7. avoid unrelated refactors
8. validate the component in `apps/web`
9. run the relevant checks

Do not simplify a performance-sensitive implementation into a slower one merely because the slower version has fewer lines.

## Commit & Pull Request Guidelines

Keep commits focused and use short imperative summaries.

Pull requests should include:

- concise change summary
- validation commands run
- linked issues when applicable
- screenshots or recordings for visual changes
- notes for configuration, dependency, registry, or shared-component changes

Call out changes that affect multiple workspaces or the shadcn install workflow.
