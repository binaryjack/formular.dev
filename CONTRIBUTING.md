# Contributing Guidelines

## Copilot Summaries

- Place all copilot summaries and others comments or recommendation files into `copilot-summaries`
- No code files into it of course!

## General Documentation 

- Create or use the `docs` folder to place all the generated documentation.


## Monorepo 

- Do always use TypeScript
- Du always use Vite.js

## Package manager

- Use exclusively PNPM

## File Naming Conventions

- All files must use kebab-case (e.g., `my-file-name.ts`).

## Coding Style

### Class
- ALWAYS use prototyped style for classes; NEVER use the `class` keyword (class sugar syntax).
- Classes and their methods/functions must follow this style:
    ```ts
    export const myFunction = function(this: ...) { ... }
    ```
### Class Methods
- Any of the prototype functions of the class (as described above) should be placed into an individual file into the `prototype` folder, then they must be referenced into the `prototype-based` class file under `Object.assign(MyClass.prototype, {myFunction1, myFunction2 ... etc.})`

### interfaces
- One interface per file.
- place them in the closest folder `interfaces`, or create one related to the current treated topic.
- naming convention: `i-my-interface-name.ts`.
- An interface name are always prefixed with `I`  example `IMyInterface`.
- Exception: In th ecase of a react component Keep the `IMyComponentProps` in the same file as the `MyComponent` Component.


### Enums
- Each enum should reside in an individual file and placed in a folder `enums`, the file name should follow this naming convention: `my-enum-name.enum.ts`
- An enum are always suffixed by Enum

### Types
- Each type should reside  in an individual file and placed in a folder `types`, the file name should follow this naming convention: `my-interface-name.type.ts`
- An type are always suffixed by Type

### Exports
- For the lib project, all the folders must have their:
  - `index.ts` that exports all the relevant objects classes etc. files paths in the current folder and /or of the sub folders 
  - `types.ts` that exports all the relevant types, interfaces files path in the current folder and /or of the sub folders 

## React 

- For react components :

- Component props interface declaration: `export interface IMyComponentProps {... }` use `children: React.ReactNode` if required.
- Component declaration: `export const MyComponent = ({propsName1,propsName2}:IMyComponentProps): OutputType => { ... }`

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
- Never use React.FC!



## Design System

- Use Tailwindcss
- Use SCSS


## Dependencies 

- Do never add external third library into the `lib` without permission and explaining why it's needed.