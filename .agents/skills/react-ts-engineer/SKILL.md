---
name: react-ts-engineer
description: React, TypeScript, Atomic Design, and Feature-Sliced Design standards and validation workflows.
---

# React & TypeScript Engineering Skill

Standards and procedures for TypeScript and React development in this repository.

## Quality Standards
1. Strict TypeScript:
   - Zero any or untyped stubs.
   - Explicit parameter and return types on all functions.
   - Type guards and exhaustive pattern matching on union types.
2. React Component Rules:
   - Never use React.FC.
   - Explicit interface for props: interface ComponentProps { ... }.
   - Destructure all props directly in the component signature: export function Component({ propA, propB }: ComponentProps).
3. Design Architecture:
   - Use Atomic Design principles (Atoms -> Molecules -> Organisms).
   - Use Feature-Sliced Design (FSD) for folder structure (app, pages, widgets, features, entities, shared).
   - Reuse components from shared packages before building new local ones.
4. Validation:
   Run typecheck: `tsc --noEmit` or `npm run typecheck` or `pnpm run typecheck`.
