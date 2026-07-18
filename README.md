# Calendar Todo

A todo list application integrated with a calendar view. Create, manage, and
organize tasks by date to get both a temporal (calendar) and a task-focused (list)
perspective on your workload.

This project is built on [GitHub Spark](https://github.com/github/spark) and uses
its key-value hook (`useKV`) to persist tasks, so your todos remain available
across sessions without any backend of your own.

## Features

- **Create tasks** with a title, an optional description, and an associated date.
- **Calendar view** that shows dot indicators on dates that have tasks and lets
  you navigate between months.
- **Filter by date**: click a date to show only that day's tasks, or "View All"
  to see every task.
- **Complete / uncomplete tasks** via a checkbox, with completed tasks sorted to
  the bottom and visually de-emphasized.
- **Edit tasks** (title and description) inline.
- **Delete tasks** with an immediate toast confirmation.
- **Responsive layout** that stacks the calendar and list on mobile.
- Toast notifications (via [Sonner](https://sonner.emilkowal.ski/)) and subtle
  animations (via [Framer Motion](https://www.framer.com/motion/)).

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) (with `@vitejs/plugin-react-swc`)
- [GitHub Spark](https://github.com/github/spark) (`@github/spark`) for the app
  runtime and `useKV` persistence
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- [shadcn/ui](https://ui.shadcn.com/) components (in `src/components/ui`)
- [date-fns](https://date-fns.org/) for date handling
- [Phosphor Icons](https://phosphoricons.com/) for UI icons

## Requirements

- **Node.js** 20.19+ or 22.12+ (required by Vite 7)
- **npm** (the repository ships a `package-lock.json`)

## Installation

```bash
git clone https://github.com/ozekimasaki/calendar-todo-list.git
cd calendar-todo-list
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Then open the URL that Vite prints in the terminal.

Create a production build and preview it:

```bash
npm run build
npm run preview
```

## Development Commands

All commands are defined in `package.json`:

| Command            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `npm run dev`      | Start the Vite development server.                      |
| `npm run build`    | Type-build with `tsc -b --noCheck`, then `vite build`.  |
| `npm run preview`  | Serve the production build locally.                     |
| `npm run optimize` | Run Vite's dependency pre-bundling (`vite optimize`).   |
| `npm run lint`     | Run ESLint (`eslint .`). See the note below.            |
| `npm run kill`     | Free port 5000 (`fuser -k 5000/tcp`).                   |

> **Note on `lint`:** the `lint` script is defined in `package.json`, but the
> repository does not currently include an ESLint flat config
> (`eslint.config.js`). With ESLint 9 the command therefore fails until such a
> config is added.

To type-check the project without emitting output, run:

```bash
npx tsc -b
```

## Project Structure

```
.
├── index.html               # Vite HTML entry point
├── src/
│   ├── main.tsx             # React entry point (mounts <App /> in an ErrorBoundary)
│   ├── App.tsx              # Top-level app: state, todo CRUD handlers, layout
│   ├── ErrorFallback.tsx    # Fallback UI for react-error-boundary
│   ├── components/
│   │   ├── TodoCalendar.tsx # Month calendar with per-date task indicators
│   │   ├── TodoList.tsx     # Task list, add form, filtering, empty states
│   │   ├── TodoItem.tsx     # Single task row (toggle / edit / delete)
│   │   └── ui/              # shadcn/ui component library
│   ├── hooks/
│   │   └── use-mobile.ts    # useIsMobile() responsive hook
│   ├── lib/
│   │   ├── date-utils.ts    # date-fns helpers (formatting, same-day compare)
│   │   └── utils.ts         # cn() class-name helper
│   ├── types/
│   │   └── todo.ts          # Todo interface
│   └── styles/theme.css     # Theme variables
├── vite.config.ts           # Vite config (React, Tailwind, Spark plugins, @ alias)
├── tsconfig.json            # TypeScript config (@/* -> ./src/*)
├── tailwind.config.js       # Tailwind theme configuration
├── components.json          # shadcn/ui configuration
├── PRD.md                   # Product requirements / design guide
└── package.json
```

The `@` import alias resolves to `src/` (configured in both `vite.config.ts` and
`tsconfig.json`).

## Data Model

Tasks conform to the `Todo` interface in `src/types/todo.ts`:

```ts
interface Todo {
  id: string
  title: string
  description?: string
  date: string          // ISO date string
  completed: boolean
  createdAt: string     // ISO date string
}
```

Tasks are stored under the `todos` key via Spark's `useKV` hook.

## License

Licensed under the MIT License. See [LICENSE](./LICENSE) for details. The Spark
Template files and resources from GitHub are licensed under the terms of the MIT
license, Copyright GitHub, Inc.
