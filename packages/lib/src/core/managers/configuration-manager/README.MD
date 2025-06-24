# Configuration Manager

The Configuration Manager is responsible for managing application configurations. It provides a centralized way to load, store, and retrieve configuration data following the prototype pattern as specified in the project guidelines.

## Features

-   **Configuration Storage**: Store multiple configurations with unique names
-   **Active Configuration**: Set and switch between configurations
-   **Configuration Search**: Find specific configuration values using path navigation
-   **JSON Loading**: Load configurations from JSON files (implementation depends on runtime environment)
-   **Schema Validation**: Validate configurations against JSON schemas
-   **Default Configuration**: Predefined default configuration for quick setup

## Schema System

This directory contains JSON schemas and TypeScript validation utilities for the Formular configuration system.

### Schemas (`/schemas`)

-   `configuration.schema.json` - Main configuration schema that references all other schemas
-   `culture.schema.json` - Culture and localization settings
-   `command.schema.json` - Command rendering configuration
-   `event-trigger.schema.json` - Event trigger settings
-   `form-behavior.schema.json` - Form behavior configuration
-   `rendering.schema.json` - Component rendering settings
-   `replacement-token.schema.json` - Token replacement for localization
-   `suffix.schema.json` - Suffix configurations
-   `validation-pattern.schema.json` - Validation pattern settings
-   `validation-method-strategy.schema.json` - Custom validation strategy configuration

### Configuration Files

-   `default-configuration.json` - Pre-defined default configuration following the schema
-   `configuration-validator.ts` - TypeScript validator utility
-   `configuration-example.ts` - Example usage of schemas and validator

## Schema Usage

### Basic Validation

```typescript
import { ConfigurationValidator, IConfiguration } from './index'

// Create validator instance
const validator = new (ConfigurationValidator as any)()

// Get default configuration
const defaultConfig: IConfiguration = validator.getDefaultConfiguration()

// Validate custom configuration
const result = validator.validate(myConfig)
if (!result.isValid) {
    console.error('Validation errors:', result.errors)
}
```

### Merging with Defaults

```typescript
// Validate and merge with defaults
const customConfig: Partial<IConfiguration> = {
    name: 'my-config',
    targetEnvironment: 'production'
}

const result = validator.validateWithDefaults(customConfig)
if (result.isValid) {
    // Use result.config which contains merged configuration
    console.log('Merged config:', result.config)
}
```

## Schema Features

### JSON Schema Validation

-   **Type Safety**: Ensures all properties have correct types
-   **Required Fields**: Validates that all required properties are present
-   **Enum Validation**: Validates event types against predefined enums
-   **Format Validation**: Validates regex patterns and other formats
-   **Nested Validation**: Validates complex nested objects and arrays

### Default Configuration

The default configuration includes:

-   **Multi-language support**: English (US), French (FR), German (DE)
-   **Common validation patterns**: Email, phone numbers, postal codes
-   **Standard form behaviors**: onBlur and onSubmit validation triggers
-   **Responsive component sizes**: Standard web form dimensions
-   **Accessibility features**: Required field indicators and help text
-   **Configuration Printing**: Display all configurations in a table format for debugging

## Basic Usage

```typescript
import { ConfigurationManager } from '@core/managers/configuration-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

// Create an instance
const serviceManager: IServiceManager = // ... your service manager
const configManager = new ConfigurationManager(serviceManager)

// Set a configuration
const myConfig: IConfiguration = {
    name: 'development',
    targetEnvironment: 'dev',
    // ... other configuration properties
}

configManager.setConfiguration('development', myConfig)

// Use/activate a configuration
configManager.useConfiguration('development')

// Search for specific configuration values
const validationPattern = configManager.getConfigByName<IValidationPattern>(
    'behavior', 'validations', 'patterns', 'email'
)

// Print all configurations for debugging
configManager.printConfiguration()
```

## API Reference

### Methods

#### `setConfiguration(name: string, config: IConfiguration): void`

Adds or updates a configuration in the collection.

#### `useConfiguration(name: string): IConfiguration | undefined`

Sets the specified configuration as active and returns it. Returns `undefined` if not found.

#### `getConfigByName<T>(...names: string[]): T | undefined`

Searches for a configuration value using a path. The search follows these rules:

-   Navigates through the configuration using the provided path elements
-   The last element is treated as the name of the target configuration item
-   If the container is an array, searches using `find(o => o.name === lastElement)`
-   If the container is an object, searches using `Object.keys(container).find(key => container[key][lastElement] === true)`

#### `loadJson(path: string): Promise<void>`

Loads a configuration from a JSON file asynchronously. **Supports both Node.js and browser environments**:

-   **Node.js**: Uses `fs/promises.readFile` with dynamic imports to avoid bundling issues
-   **Browser**: Uses the `fetch` API to load configuration files
-   Automatically validates the loaded configuration has required properties (`name`, `targetEnvironment`)
-   Automatically calls `setConfiguration` with the loaded data

#### `printConfiguration(): void`

Displays all configurations in a console table format showing:

-   Configuration name
-   Target environment
-   Active status
-   JSON preview

## Architecture

The ConfigurationManager follows the prototype pattern:

-   Main class: `ConfigurationManager`
-   Prototype methods are in separate files under `prototype/` folder
-   Each method is implemented following the function prototype pattern as specified in CONTRIBUTING.md

## Files Structure

```
configuration-manager/
├── configuration-manager.ts     # Main class
├── interfaces/
│   ├── i-configuration-manager.ts
│   ├── i-configuration.ts
│   └── ... other interfaces
├── prototype/
│   ├── get-config-by-name.ts
│   ├── set-configuration.ts
│   ├── use-configuration.ts
│   ├── load-json.ts
│   └── print-configuration.ts
├── types/
│   └── search-config.type.ts
└── README.MD
```

## Testing

Tests are located in `src/__tests__/core/managers/configuration-manager/` and follow the project's testing conventions.

To run tests:

```bash
pnpm test
```
