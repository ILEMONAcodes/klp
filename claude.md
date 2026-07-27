# KLP Frontend — Agent Rules

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma (PostgreSQL) · Leaflet · Cloudinary

## Project Structure

```
app/          → Pages, layouts, API routes, server actions
components/   → Reusable UI components
lib/          → Shared utilities (e.g. Prisma client)
prisma/       → Schema & migrations
public/       → Static assets
```

## Code Rules

- **TypeScript only** — no `any`. Define explicit types/interfaces for props, API responses, and Prisma models.
- **Server Components by default** — only add `"use client"` when the component needs interactivity (hooks, event handlers, browser APIs).
- **Server Actions** go in `app/actions/`. Keep them thin — validate input, call Prisma, return a result.
- **No inline styles** — use Tailwind classes. Keep class lists readable; extract to variables or components when they get long.
- **Components** should be single-responsibility. If a file exceeds ~400 lines, break it up.
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for route folders.
- **Imports**: Use `@/` path aliases (e.g. `@/components/Navbar`). No relative `../../` imports.

## Error Handling

- Wrap async server actions and API calls in try/catch. Return structured `{ success, data?, error? }` responses.
- Use Next.js `error.tsx` and `loading.tsx` boundary files per route.

## Environment Variables

- Access secrets only on the server. Never expose keys to the client.
- Prefix client-safe vars with `NEXT_PUBLIC_`.

## Before Committing

- Run `npm run build` — fix all type and lint errors.
- No `console.log` in production code (use it for debugging only, remove before committing).
- Preserve existing comments and docstrings unrelated to your changes.
