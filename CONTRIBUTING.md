# Contributing Guidelines

## File Naming Conventions

- All files must use kebab-case (e.g., `my-file-name.ts`).

## Coding Style

- Always use prototyped style for classes; never use the `class` keyword (class sugar syntax).
- Classes and their methods/functions must follow this style:
    ```ts
    export const myFunction = function(this: ...) { ... }
    ```

## Test Implementation

- Test files must be implemented step by step, starting in a very minimalistic style.
- When writing tests, always use available mock builders from the codebase as much as possible.

---

Please follow these rules for all code contributions and code generation in this project.
