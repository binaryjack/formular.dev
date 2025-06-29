# Contributing Guidelines

# Values
- this projects strives to focus on veracity and acuracy about our intentions. So for each contributions wheter is human or IA, we should always try to cross check information and provide sources as possible.

## Copilot Role

- I need you to act as an expert in TypeScript / Javascript / HTML / CSS and any other tasks you will assist-
- I need you to be the most acurate possible.
- Do not embelish reality.
- let's focus on best practices.

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

#### Exception: Mock Exports for Testing
- **Exception**: The `__tests__/mocks` folder is exported from the main library index to allow consumers to use mock objects for their own testing.
- This exception enables external packages and applications to leverage the library's test mocks without requiring them to create their own mock implementations.
- Mock files in this folder should be comprehensive and represent realistic data structures for testing purposes. 

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

## Architectural Decisions & FAQ

### Q: Why prototype-based classes instead of modern `class` syntax?
**A:** This is a strategic decision for maximum compatibility and performance. Prototype-based classes:
- Are more reliable and don't rely on syntactic sugar abstractions
- Avoid potential performance overhead from transpilation and additional runtime checks
- Ensure consistency across the entire monorepo since all packages serve similar purposes
- Provide better compatibility across different JavaScript environments
- Result in smaller bundle sizes due to no class syntax transformation
- Give explicit control over the prototype chain without hidden behaviors

### Q: Why one interface per file? Isn't this excessive?
**A:** While it creates more files, this approach:
- Provides excellent organization and separation of concerns
- Makes interfaces easier to locate and maintain
- Enables more granular imports and explicit dependencies
- Works well with good folder structure
- Note: Modern bundlers handle tree-shaking well regardless, so this is primarily an organizational choice

### Q: Should tests really mirror the entire src/ structure under __tests__/?
**A:** This is under consideration. A "per topic" approach closer to the objects being tested might be more practical. The current rule may be refined based on project evolution.

### Q: Do we need index.ts AND types.ts in every folder?
**A:** We should establish thresholds based on folder complexity. Small folders with few exports might not need this separation.

**Proposed Threshold Rules:**
- Folders with 1-3 files: Use single `index.ts` for all exports
- Folders with 4+ files OR mixed types/implementations: Use both `index.ts` and `types.ts`
- Complex domains: Always separate for better organization

## Performance & Bundle Considerations

### Tree Shaking Optimization
- Keep interfaces, types, and enums in separate files to enable better tree shaking
- Use named exports exclusively (avoid default exports in library code)
- Minimize re-exports when possible

### Bundle Size Monitoring
- Regularly audit bundle sizes for the `lib` package
- Use tools like `webpack-bundle-analyzer` or Vite's built-in analysis
- Consider the impact of new dependencies on bundle size

## Code Quality & Formatting

### ESLint Configuration
- Follow the existing ESLint configuration in each package
- Ensure consistent code formatting across the monorepo
- Use TypeScript-specific ESLint rules

### Prettier Configuration
- Maintain consistent code formatting
- Configure for TypeScript, React, and SCSS files
- Integrate with VS Code for automatic formatting

## Git Workflow & Commit Guidelines

### Commit Message Format
Follow conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(lib): add new signal processing function`
- `fix(components): resolve button click handler issue`
- `docs(contributing): update architectural decisions`

### Branch Naming
- Feature branches: `feature/description-of-feature`
- Bug fixes: `fix/description-of-fix`
- Documentation: `docs/description-of-docs`

### Pull Request Guidelines
- Include clear description of changes
- Reference related issues
- Ensure all tests pass
- Update documentation if needed
- Follow the established coding style

## Version Management

### Semantic Versioning
- Follow semantic versioning (semver) for all packages
- Use PNPM workspace versioning for coordinated releases
- Document breaking changes in CHANGELOG.md

### Release Process
- Use conventional commits to generate changelogs
- Coordinate releases across workspace packages
- Tag releases appropriately

## Development Environment

### Required Tools
- Node.js (latest LTS)
- PNPM (latest stable)
- VS Code with recommended extensions
- TypeScript (latest stable)

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Vite

## Testing Strategy Refinement

### Test Organization Options
Given the concerns about mirroring structure, consider these approaches:

**Option 1: Topic-Based Testing (Recommended)**
```
src/__tests__/
  ├── core/           # Tests for core functionality
  ├── components/     # Tests for React components  
  ├── utilities/      # Tests for utility functions
  └── integration/    # Integration tests
```

**Option 2: Feature-Based Testing**
```
src/__tests__/
  ├── signal-processing/
  ├── data-validation/
  └── user-interface/
```

**Option 3: Hybrid Approach**
- Use topic-based for complex domains
- Use mirrored structure for simple utilities
- Use integration folder for cross-cutting tests

### Test Naming Conventions
- Unit tests: `feature-name.test.ts`
- Integration tests: `feature-integration.test.ts`
- Component tests: `component-name.test.tsx`

## Documentation Standards

### Code Documentation
- Use JSDoc comments for all public APIs
- Include examples in documentation
- Document complex algorithms and business logic

### README Requirements
Each package should have:
- Clear description of purpose
- Installation instructions
- Basic usage examples
- API documentation links

## Security Considerations

### Dependency Security
- Regularly audit dependencies with `pnpm audit`
- Keep dependencies up to date
- Justify any security exceptions

### Code Security
- Validate inputs at boundaries
- Use TypeScript strict mode
- Follow OWASP guidelines for web applications

---

**Note:** This document is living and should be updated as the project evolves and new patterns emerge.