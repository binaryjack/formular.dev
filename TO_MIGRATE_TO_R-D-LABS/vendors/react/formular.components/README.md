# FORMULAR React Components

This package serves two purposes and depends on shared assets for logo icons and other shared resources.

## 📦 Library (for consumption by other projects)

- **`src/index.ts`** - Main library exports for React components and adapters
- **`src/adapters/`** - React-specific adapters and utilities
- **`src/components/`** - Reusable React components

## 🔧 Demo/Development App (for development and testing)

- **`src/main.tsx`** - Entry point for the development application
- **`src/index.tsx`** - Demo-specific exports and utilities
- **`src/app.tsx`** - Main demo application component
- **`index.html`** - HTML entry point (references `main.tsx`)

## File Purpose Clarification

| File            | Purpose         | When Used                                     |
| --------------- | --------------- | --------------------------------------------- |
| `src/index.ts`  | Library exports | When this package is imported as a dependency |
| `src/main.tsx`  | Demo app entry  | When running `pnpm dev` for development       |
| `src/index.tsx` | Demo exports    | For development utilities and demo components |

## Development

```bash
pnpm dev    # Starts the demo app (uses main.tsx)
pnpm build  # Builds the library (uses index.ts)
```

## Scripts

- `dev` - Start development server with demo app
- `build` - Build the library for production
- `test` - Run tests
- `storybook` - Start Storybook for component documentation

## Dependencies

Ensure `shared-assets` is installed and referenced correctly for logo icons and other shared resources.
