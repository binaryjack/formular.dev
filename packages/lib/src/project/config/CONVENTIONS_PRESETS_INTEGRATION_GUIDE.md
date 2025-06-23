# FORMULAR - Conventions Configuration Presets Integration Guide

This guide shows how to use ConventionsConfigPresets to replace hardcoded values from `conventions.ts` with configurable presets following the ValidationConfigPresets pattern.

## Overview

The ConventionsConfigPresets system provides:

-   ✅ **Configurable trigger delays** instead of hardcoded 500ms/200ms values
-   ✅ **Environment-specific conventions** for development, production, accessibility
-   ✅ **Component dimension presets** for different use cases
-   ✅ **Data type formatting** with locale support
-   ✅ **UI convention standards** (suffixes, tokens, form creation rules)
-   ✅ **Backwards compatibility** through migration helpers
-   ✅ **Consistent API pattern** following ValidationConfigPresets approach

## Setup

### 1. Register ConventionsConfigPresets

The conventions presets are automatically registered when you setup the unified configuration system:

```typescript
import { setupConfigurationServices } from '@core/config'
import { createConfigurationPresetFactory } from '@project/config/configuration-presets-factory'

const serviceManager = new ServiceManager()

// Setup all configuration services (includes conventions)
setupConfigurationServices(serviceManager, {
    // Your other configuration...
})

// Get unified configuration presets
const configPresets = createConfigurationPresetFactory(serviceManager)

// Access conventions presets
const conventionsPresets = configPresets.conventions
```

### 2. Alternative: Direct Access

```typescript
import { getConventionsConfigPresets } from '@project/config/conventions-config-presets'

const conventionsPresets = getConventionsConfigPresets(serviceManager)
```

## Migration from conventions.ts

### Before: Hardcoded Values

```typescript
// OLD: conventions.ts
export const conventions = {
    validations: {
        triggerDelay: 500 // Hardcoded
    },
    events: {
        onChange: { triggerDelay: 500 }, // Hardcoded
        onUiUpdate: { triggerDelay: 200 } // Hardcoded
    },
    components: {
        drawer: {
            height: '350px', // Hardcoded
            width: '250px' // Hardcoded
        }
    }
}

// Usage
const delay = conventions.events.onChange.triggerDelay
const drawerHeight = conventions.components.drawer.height
```

### After: Configurable Presets

```typescript
// NEW: Using ConventionsConfigPresets
const configPresets = createConfigurationPresetFactory(serviceManager)

// Configurable with multiple options
const delay = configPresets.conventions.eventTriggers.default() // 500ms (same as before)
const fastDelay = configPresets.conventions.eventTriggers.fast // 200ms
const slowDelay = configPresets.conventions.eventTriggers.slow // 1000ms

// Component dimensions with size options
const mediumDrawer = configPresets.conventions.components.drawer.default() // { height: '350px', width: '250px' }
const largeDrawer = configPresets.conventions.components.drawer.large // { height: '500px', width: '400px' }
const smallDrawer = configPresets.conventions.components.drawer.small // { height: '250px', width: '200px' }
```

## Usage Patterns - Exactly As You Requested

### Pattern 1: Direct Preset Access

```typescript
const configPresets = createConfigurationPresetFactory(serviceManager)

// Event trigger delays
const normalDelay = configPresets.conventions.eventTriggers.normal // 500ms
const fastDelay = configPresets.conventions.eventTriggers.fast // 200ms
const uiDelay = configPresets.conventions.uiTriggers.normal // 200ms

// Component dimensions
const drawerMedium = configPresets.conventions.components.drawer.medium
const buttonSmall = configPresets.conventions.components.button.small

// Data type formatting
const systemSeparator = configPresets.conventions.dataTypes.date.separators.system()
const displayFormat = configPresets.conventions.dataTypes.date.formats.display()
const usFormat = configPresets.conventions.dataTypes.date.formats.forLocale('us')

// UI conventions
const labelSuffix = configPresets.conventions.uiConventions.suffixes.labelId // '-label'
const validationToken = configPresets.conventions.uiConventions.tokens.validation.primary // '|data|'
```

### Pattern 2: Environment-Specific Profiles

```typescript
const configPresets = createConfigurationPresetFactory(serviceManager)

// Get environment-appropriate conventions
const developmentConventions = configPresets.conventions.profiles.developmentProfile()
const productionConventions = configPresets.conventions.profiles.productionProfile()
const accessibilityConventions = configPresets.conventions.profiles.accessibilityProfile()
const performanceConventions = configPresets.conventions.profiles.performanceProfile()

// Use profile-specific settings
const eventDelay = developmentConventions.eventTriggers // 1000ms for debugging
const drawerSize = accessibilityConventions.components.drawer // Large size for accessibility
```

### Pattern 3: Custom Configuration

```typescript
const configPresets = createConfigurationPresetFactory(serviceManager)

// Create custom convention profile
const customConventions = configPresets.conventions.custom.createProfile({
    eventTriggers: 750, // Custom delay
    uiTriggers: 150, // Custom UI delay
    drawerSize: 'large', // Use large drawer
    buttonSize: 'medium', // Use medium buttons
    enforceConfigurationCheck: false // Disable strict checks
})

console.log('Custom conventions:', customConventions)
// {
//   eventTriggers: 750,
//   uiTriggers: 150,
//   formularCreation: { enforceConfigurationCheck: false },
//   components: {
//     drawer: { height: '500px', width: '400px' },
//     button: { width: '1.8em', height: '1.8em' }
//   }
// }
```

## Complete Integration Examples

### Example 1: Form Field Component with Convention Presets

```typescript
import { createConfigurationPresetFactory } from '@project/config/configuration-presets-factory'

const FormFieldComponent = function (serviceManager: IServiceManager, fieldName: string) {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    // Get environment-appropriate conventions
    const conventions = configPresets.conventions.profiles.developmentProfile()

    // Apply convention-based settings
    const fieldId = fieldName
    const labelId = fieldId + configPresets.conventions.uiConventions.suffixes.labelId // 'fieldName-label'
    const describedById = fieldId + configPresets.conventions.uiConventions.suffixes.describedById // 'fieldName-describedby'

    // Use environment-specific trigger delays
    const validationTriggerDelay = conventions.eventTriggers // 1000ms in development
    const uiUpdateDelay = conventions.uiTriggers // 200ms in development

    // Apply component dimensions
    const drawerConfig = conventions.components.drawer // Large drawer for development

    return {
        fieldId,
        labelId,
        describedById,
        validationTriggerDelay,
        uiUpdateDelay,
        drawerConfig
    }
}
```

### Example 2: Date Input with Locale-Aware Formatting

```typescript
const DateInputComponent = function (serviceManager: IServiceManager, locale: string = 'system') {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    // Get locale-specific date formatting
    const dateFormat =
        locale === 'system'
            ? configPresets.conventions.dataTypes.date.formats.display()
            : configPresets.conventions.dataTypes.date.formats.forLocale(locale)

    const dateSeparator =
        locale === 'system'
            ? configPresets.conventions.dataTypes.date.separators.system()
            : configPresets.conventions.dataTypes.date.separators.dash

    // Use conventions for validation tokens
    const validationToken = configPresets.conventions.uiConventions.tokens.validation.primary
    const placeholderToken =
        configPresets.conventions.uiConventions.tokens.custom('date-placeholder')

    return {
        format: dateFormat,
        separator: dateSeparator,
        validationToken, // '|data|'
        placeholderToken // '|date-placeholder|'
    }
}
```

### Example 3: Performance-Optimized Component

```typescript
const PerformanceOptimizedComponent = function (serviceManager: IServiceManager) {
    const configPresets = createConfigurationPresetFactory(serviceManager)

    // Use performance-optimized conventions
    const perfConventions = configPresets.conventions.profiles.performanceProfile()

    // Minimal delays for maximum performance
    const eventDelay = perfConventions.eventTriggers // 0ms
    const uiDelay = perfConventions.uiTriggers // 0ms
    const observableDelay = perfConventions.observableTriggers // 0ms

    // Smaller components for performance
    const drawerSize = perfConventions.components.drawer // Small: 250px x 200px
    const buttonSize = perfConventions.components.button // Small: 1.2em x 1.2em

    // Lenient configuration checks
    const configCheck = perfConventions.formularCreation.enforceConfigurationCheck // false

    return {
        delays: { eventDelay, uiDelay, observableDelay },
        components: { drawerSize, buttonSize },
        configCheck
    }
}
```

## Backwards Compatibility

For gradual migration, use the migration helper:

```typescript
import { createLegacyConventionsFromPresets } from '@project/config/conventions-migration-helper'

// Create legacy-compatible conventions object powered by presets
const legacyConventions = createLegacyConventionsFromPresets(serviceManager)

// Use exactly like the old conventions.ts
const delay = legacyConventions.events.onChange.triggerDelay
const drawerHeight = legacyConventions.components.drawer.height

// This maintains 100% API compatibility while using the new preset system internally
```

## Benefits of This Approach

### 1. Environment Awareness

-   **Development**: Slower triggers (1000ms) for debugging, larger components
-   **Production**: Faster triggers (200ms) for performance, optimized components
-   **Accessibility**: Longer delays (1000ms), larger components for better UX
-   **Performance**: Immediate triggers (0ms), minimal components for speed

### 2. Flexibility

-   Individual preset access: `configPresets.conventions.eventTriggers.fast`
-   Profile-based access: `configPresets.conventions.profiles.productionProfile()`
-   Custom configurations: `configPresets.conventions.custom.createProfile(...)`

### 3. Type Safety and Consistency

-   Full TypeScript support with IntelliSense
-   Consistent API pattern across all configuration areas
-   Runtime validation and error handling

### 4. Locale and Internationalization

-   Locale-aware date formatting: `formats.forLocale('us')`
-   System-aware separators: `separators.system()`
-   Custom token generation: `tokens.custom('my-token')`

## Migration Path

1. **Immediate**: Use `createConfigurationPresetFactory()` for new components
2. **Gradual**: Use `createLegacyConventionsFromPresets()` for existing code
3. **Complete**: Replace all convention imports with preset access
4. **Optimize**: Adopt environment-specific profiles for better UX/performance

This approach extends your ValidationConfigPresets pattern to conventions, providing a unified, environment-aware, and flexible convention system that maintains full backwards compatibility while enabling powerful new configuration capabilities.
