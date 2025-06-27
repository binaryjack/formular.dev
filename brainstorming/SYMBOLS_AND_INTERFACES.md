# Symbol and Interface Exports

This document describes the centralized export system for symbols and interfaces in the formular.dev.lib library.

## Overview

The library now provides two centralized export files for better organization and discoverability:

-   **`symbols.ts`**: Exports all dependency injection symbols
-   **`interfaces.ts`**: Exports all TypeScript interfaces

## What Was Done

### 1. Symbol Standardization

-   Changed `SConfigurationManager` from `Symbol('IConfigurationManager')` to `Symbol.for('IConfigurationManager')` to match the pattern used by other symbols
-   Ensured all symbols use the `Symbol.for()` pattern for consistency

### 2. Centralized Symbol Exports

Created `src/symbols.ts` with organized exports:

```typescript
// Core Managers
export { SConfigurationManager } from './core/managers/configuration-manager/interfaces/i-configuration-manager'
export { SFormularManager } from './core/managers/formular-manager/formular-manager.types'
// ... and 30+ other symbols
```

### 3. Centralized Interface Exports

Created `src/interfaces.ts` with comprehensive type exports:

```typescript
// Core Managers
export type { IConfigurationManager } from './core/managers/configuration-manager/interfaces/i-configuration-manager'
export type { IFormularManager } from './core/managers/formular-manager/formular-manager.types'
// ... and 100+ other interfaces
```

### 4. Updated Main Index

Updated `src/index.ts` to include both new export files:

```typescript
export * from './symbols'
export * from './interfaces'
```

## Usage

### Importing Symbols

```typescript
import { SConfigurationManager, SFormularManager } from 'formular.dev.lib'
```

### Importing Interfaces

```typescript
import type { IConfigurationManager, IFormularManager } from 'formular.dev.lib'
```

### Combined Usage

```typescript
import { SConfigurationManager } from 'formular.dev.lib'
import type { IConfigurationManager } from 'formular.dev.lib'

const configManager = serviceManager.getService<IConfigurationManager>(SConfigurationManager)
```

## Benefits

1. **Single Source of Truth**: All symbols and interfaces are centrally managed
2. **Better Organization**: Clear categorization by functionality
3. **Improved Discoverability**: Easy to find what's available
4. **Type Safety**: Comprehensive TypeScript support
5. **Documentation**: Extensive inline documentation and usage examples
6. **Consistency**: Standardized export patterns across the library

## Categories

### Symbols (`symbols.ts`)

-   Core Managers (Configuration, Formular, Value, Validation, etc.)
-   Input Engine (Text, Select, Radio, Numeric, etc.)
-   Factories & Services
-   Project Services
-   Providers & Descriptors

### Interfaces (`interfaces.ts`)

-   Core Managers
-   Input Engine
-   Validation System
-   Configuration
-   Service Management
-   Framework Core
-   Utilities

## Migration

Existing code will continue to work as the original export paths are maintained. However, it's recommended to gradually migrate to the centralized exports for better maintainability.

## Testing

All exports have been tested to ensure:

-   No TypeScript compilation errors
-   Proper symbol resolution
-   Interface type checking
-   React component compatibility
