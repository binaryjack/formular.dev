# Contributing Guidelines

## Package manager

- Use exclusively PNPM

## File Naming Conventions

- All files must use kebab-case (e.g., `my-file-name.ts`).

## Coding Style

- Always use prototyped style for classes; never use the `class` keyword (class sugar syntax).
- Classes and their methods/functions must follow this style:
    ```ts
    export const myFunction = function(this: ...) { ... }
    ```
- Each interface (Excepted for those which are not the ones for the props component in React) should reside in an individual file and placed in a folder `interfaces`, the file should follow this naming convention: `i-my-interface-name.ts`

- Each enum should reside in an individual file and placed in a folder `enums`, the file name should follow this naming convention: `my-enum-name.enum.ts`

- Each type should reside  in an individual file and placed in a folder `types`, the file name should follow this naming convention: `my-interface-name.type.ts`

- For the lib project, all the folders must have their:
  - `index.ts` that exports all the relevant objects classes etc. files paths in the current folder and /or of the sub folders 
  - `types.ts` that exports all the relevant types, interfaces files path in the current folder and /or of the sub folders 



## Test Implementation

- Test files must be implemented step by step, starting in a very minimalistic style.
- When writing tests, always use available mock builders from the codebase as much as possible.
- **All test files must be placed under `src/__tests__/`, using subfolders to mirror the structure of the `src/` directory.**
- **Do not place test files beside their target files or in scattered `__test__`/`__tests__` folders elsewhere.**
- **Test file names must use kebab-case and clearly indicate the file or feature they are testing.**

---

Please follow these rules for all code contributions and code generation in this project.

--- INFO ---

- historically some `class` style were introduced by copilot in general for testing purpose, this is acceptable. We only want to rely on `prototyped style class` for the product itself.

## Scripts 

- Never use Webpack 