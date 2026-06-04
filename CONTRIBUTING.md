# Contributing Guidelines

Thank you for contributing to formular.dev. Please adhere to these guidelines to ensure code quality, consistency, and alignment with the framework's architecture.

---

## Core Values

* **Accuracy and Veracity**: Every contribution must be verified and accurate. Always cross-check technical specifications and provide documentation/tests for changes.
* **Modern Standards**: Focus on clean code, type safety, and modern performance standards while respecting the internal architecture patterns.

---

## Project Structure and Environment

* **Language**: All source code must be written in TypeScript.
* **Package Manager**: Use `pnpm` exclusively.
* **Build System**: Build targets use Vite.js. Do not use Webpack.
* **Styling**: Tailwind CSS and SCSS are approved for styling components.

---

## Documentation and Summaries

* **AI/Copilot Summaries**: Place any generated assistant notes, summaries, or audit logs into the `copilot-summaries` directory.
* **General Documentation**: Store additional framework guides or feature documents in the `docs` folder.

---

## Coding Standards

### File Naming Conventions

* All file names must use kebab-case (for example: `validation-manager.ts`, `field-descriptor.ts`).

### Interface Design

* Declare exactly one interface per file.
* Prefix interface names with `I` (for example: `IFormularManager`).
* Place interfaces in the nearest `interfaces` folder, or create a directory matching the component domain.
* Interface files must be named using the pattern: `i-[interface-name].ts` (for example: `i-formular-manager.ts`).
* Exception: React component prop interfaces (e.g., `IMyComponentProps`) should remain in the same file as the component declaration.

### Enum Design

* Declare exactly one enum per file.
* Suffix enum names with `Enum` (for example: `ValidationTypeEnum`).
* Place enums in an `enums` directory.
* Enum files must be named using the pattern: `[enum-name].enum.ts` (for example: `validation-type.enum.ts`).

### Type Design

* Declare exactly one custom type per file.
* Suffix custom type names with `Type` (for example: `FormStateValueType`).
* Place types in a `types` directory.
* Type files must be named using the pattern: `[type-name].type.ts` (for example: `form-state-value.type.ts`).

### Enums, Types, and Arrays Matching Pattern

For matched domain types, declare a structured enum, extract the type, and export a frozen array:

```typescript
// enums/status-type.enum.ts
export enum StatusTypeEnum {
    active = 'active',
    inactive = 'inactive',
    pending = 'pending'
}

// types/status-type.type.ts
import { StatusTypeEnum } from '../enums/status-type.enum';
export type StatusType = keyof typeof StatusTypeEnum;

// types/status-type.array.ts
import { StatusTypeEnum } from '../enums/status-type.enum';
export const StatusTypeArray: string[] = Object.values(StatusTypeEnum);
```

### Folder Exports

For library folders, maintain clean entry points:
* Folders with 1 to 3 files: Use a single `index.ts` to export all relevant types and class definitions.
* Folders with 4 or more files or mixed concerns: Separate exports into `index.ts` (for implementations and modules) and `types.ts` (for interface and type definitions).

---

## Class and Prototype Design

To maximize tree-shaking, optimize execution speeds, and reduce production bundle sizes, standard library classes must be built using explicit prototypes instead of ES6 class syntax sugar.

### Rules for Product Code Classes

1. **Instantiation**: Declare the class constructor as a standard function typing `this`:
   ```typescript
   export const ConfigurationManager = function (this: IConfigurationManager, serviceManager: IServiceManager) {
       this._serviceManager = serviceManager;
   };
   ```
2. **Prototype Assignment**: Declare each prototype method in an individual file under a `prototype` subfolder. Use kebab-case for the file names:
   * File: `prototype/initialize.ts`
   * Content:
     ```typescript
     export const initialize = function (this: IConfigurationManager, options: IConfigurationOptions): void {
         // Method implementation
     };
     ```
3. **Class Assembly**: Import the prototype functions and assign them to the prototype using `Object.assign` in the main class definition file:
   ```typescript
   import { initialize } from './prototype/initialize';
   import type { IConfigurationManager } from './interfaces/i-configuration-manager';

   // Constructor
   export const ConfigurationManager = function (this: IConfigurationManager) {
       // ...
   } as unknown as {
       new (): IConfigurationManager;
       prototype: IConfigurationManager;
   };

   // Assembly
   Object.assign(ConfigurationManager.prototype, {
       initialize
   });
   ```

*Note*: Standard ES6 class syntax sugar is acceptable inside test suites (`__tests__/`) and mock utilities, but is strictly prohibited in final library runtime code.

---

## React Component Conventions

If implementing React-specific components or wrappers:
* Do not use `React.FC` or `React.FunctionComponent`.
* Define components with explicit props and return types:
  ```typescript
  export interface IInputFieldProps {
      readonly name: string;
      readonly label?: string;
  }

  export const InputField = ({ name, label }: IInputFieldProps): JSX.Element => {
      // Implementation
  };
  ```

---

## Testing Guidelines

* **Placement**: Place all test files under the main `src/__tests__/` directory. Mirror the exact folder structure of `src/`. Do not place test files beside source files.
* **Naming**: Use kebab-case for test files, clearly naming the feature under test (for example: `validation-manager.test.ts`).
* **Practices**:
  * Build tests incrementally, starting with small assertions.
  * Use the pre-existing mock builders located in `src/__tests__/mocks/` to construct dependencies.
  * Ensure the test suite compiles and runs cleanly before pushing changes.

---

## Git Workflow and Commits

We follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

* **Types**: `feat` (new features), `fix` (bug fixes), `docs` (documentation updates), `style` (formatting/whitespace), `refactor` (code restructuring), `test` (test updates), `chore` (maintenance/build tasks).
* **Scopes**: Include the target package or component (for example: `docs(readme): add setup guide`).
* **Branches**:
  * Features: `feature/description`
  * Fixes: `fix/description`
  * Documentation: `docs/description`
