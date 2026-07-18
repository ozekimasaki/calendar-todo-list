# AGENTS.md

Guidance for coding agents working in this repository. Keep changes minimal and
consistent with the existing code.

## Project Overview

Calendar Todo is a single-page React application (a calendar-integrated todo
list) built on [GitHub Spark](https://github.com/github/spark). Tasks are
persisted with Spark's `useKV` hook — there is no separate backend in this repo.

- Bundler/dev server: **Vite 7** (`@vitejs/plugin-react-swc`)
- UI: **React 19** + **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**
- App framework: **`@github/spark`** (registered as a Vite plugin, provides `useKV`)

## Project Structure & Entry Points

- `index.html` — Vite HTML entry; loads `/src/main.tsx`.
- `src/main.tsx` — React entry point; mounts `<App />` inside a
  `react-error-boundary` with `ErrorFallback`. Also imports `@github/spark/spark`
  and the global stylesheets.
- `src/App.tsx` — top-level component. Owns the `todos` state (via `useKV`) and
  `selectedDate`, and defines the add/toggle/update/delete handlers.
- `src/components/TodoCalendar.tsx` — month grid, month navigation, per-date
  task indicators.
- `src/components/TodoList.tsx` — task list, add form, date filtering, empty states.
- `src/components/TodoItem.tsx` — single task row (complete / edit / delete).
- `src/components/ui/` — shadcn/ui components; generally do not edit by hand.
- `src/hooks/use-mobile.ts` — `useIsMobile()` responsive helper.
- `src/lib/date-utils.ts` — date-fns helpers; `src/lib/utils.ts` — `cn()` helper.
- `src/types/todo.ts` — the `Todo` interface (the app's core data model).

The `@` import alias maps to `src/` (see `vite.config.ts` and `tsconfig.json`).

## Setup

```bash
npm install
```

Requires Node.js 20.19+ or 22.12+ (Vite 7). Use npm; the repo has a
`package-lock.json`.

## Build / Test / Lint / Typecheck

These are the real commands available in this repository:

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (runs `tsc -b --noCheck && vite build`)
- **Preview build:** `npm run preview`
- **Optimize deps:** `npm run optimize`
- **Type-check:** `npx tsc -b` (there is no dedicated `typecheck` script; the
  `build` script passes `--noCheck`, so run this to actually type-check)
- **Lint:** `npm run lint` runs `eslint .` **but currently fails** — the repo has
  no ESLint flat config (`eslint.config.js`), which ESLint 9 requires. If you add
  linting, add that config first, and do not claim lint passes until it does.

There is **no test framework or test script** configured in this repo. Do not
invent test commands. If tests are required, propose adding a runner (e.g.
Vitest) rather than assuming one exists.

Before finishing a change, at minimum run `npx tsc -b` and `npm run build` and
make sure both succeed. (`npm run build` currently emits some Tailwind CSS
`@media (pointer: ...)` warnings but completes successfully.)

## Coding Conventions

- **Language:** TypeScript with strict null checks (`strictNullChecks: true`).
  Prefer explicit types on component props (see the existing `*Props` interfaces).
- **Style:** existing source files use 2-space indentation and no semicolons.
  Match the style of the file you are editing.
- **Imports:** use the `@/…` alias for intra-`src` imports (e.g.
  `import { Todo } from '@/types/todo'`), matching existing code.
- **Components:** function components with named exports (e.g.
  `export function TodoList(...)`). `App` is the default export.
- **Class names:** compose Tailwind classes with the `cn()` helper from
  `@/lib/utils`.
- **Dates:** use `date-fns` and the helpers in `@/lib/date-utils`; dates are
  stored as ISO strings on the `Todo` type.
- **Icons:** the app UI uses `@phosphor-icons/react`. Note that
  `components.json` declares `lucide` as the shadcn icon library, so newly
  scaffolded shadcn components may import from `lucide-react`; follow whichever
  matches the file you are working in.
- **Notifications:** user-facing feedback uses `sonner` (`toast.success(...)`).
- **Persistence:** read/write task data through the `useKV('todos', [])` hook in
  `App.tsx`; the setter callbacks defensively handle a possibly-undefined value.

## Notes & Gotchas

- Do not remove the `createIconImportProxy()` and `sparkPlugin()` entries in
  `vite.config.ts` — they are required by Spark (marked `DO NOT REMOVE`).
- Scope changes narrowly; avoid touching `src/components/ui/*` unless necessary.
- There are no git pre-commit hooks configured in this repo.
- Dependabot is enabled (`.github/dependabot.yml`) for npm and devcontainers.
