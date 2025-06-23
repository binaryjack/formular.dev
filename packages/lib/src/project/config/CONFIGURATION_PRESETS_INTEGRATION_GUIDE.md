# FORMULAR - Configuration Presets Integration Guide

This guide shows how to use all configuration presets (Validation, Input, Notification, Service, Conventions) aligned with the ValidationConfigPresets pattern you established.

## Overview

The Configuration Presets system provides:

-   ✅ **Unified access to all configuration areas** through a single factory
-   ✅ **Individual preset systems** for focused usage
-   ✅ **Cross-cutting profiles** that combine settings across areas
-   ✅ **Environment-specific configurations** for development, production, testing
-   ✅ **Accessibility and performance profiles** for specialized use cases
-   ✅ **Conventions migration** from hardcoded values to configurable presets
-   ✅ **Consistent API pattern** following the ValidationConfigPresets approach

## Quick Start

### 1. Setup All Configuration Presets

```typescript
import { setupValidationPatterns } from '@project/setup/setup-validation-patterns'
import { setupConfigurationServices } from '@core/config'
import { createConfigurationPresetFactory } from '@project/config/configuration-presets-factory'
import { ServiceManager } from '@core/managers/service-manager/service-manager'

const serviceManager = new ServiceManager()

// Setup configuration services (includes validation patterns)
setupConfigurationServices(serviceManager, {
    validation: {
        patterns: {
            phone: {
                COMPANY: /^COMP\d{8}$/,
                fallback: /^\d{10}$/
            }
        },
        fallbackBehavior: 'lenient'
    },
    inputs: {
        defaultValidationTrigger: 'onBlur',
        debounceMs: 300
    },
    notifications: {
        defaultDuration: 4000,
        position: 'top'
    },
    services: {
        logLevel: 'debug',
        enableDevelopmentValidation: true
    }
})

// Create unified configuration presets factory
const configPresets = createConfigurationPresetFactory(serviceManager)
```

### 2. Register in Your Application Setup

```typescript
import { setupManagers } from '@project/setup/setup-managers'

// This automatically calls setupValidationPatterns and other configuration services
setupManagers(serviceManager)

// The unified factory is now available
const configPresets = createConfigurationPresetFactory(serviceManager)
```

## Usage Patterns - Exactly As You Requested

### Pattern 1: Individual Configuration Area Usage

#### Validation Presets (Your Original Pattern)

```typescript
// Direct pattern access for ValidationConstraintBuilder
const usPhonePattern = configPresets.validation.phone.us
const swissPostalPattern = configPresets.validation.postal.ch
const strongPasswordPattern = configPresets.validation.passwordStrong

// Use with ValidationConstraintBuilder
const constraints = []
constraints.push(
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(usPhonePattern) // ← Direct preset usage!
        .setName('phoneNumber')
        .setErrorMessage(ValidationLocalizeKeys.phoneError)
        .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
)
```

#### Input Configuration Presets

```typescript
// Get input profiles
const realtimeConfig = configPresets.input.profiles.realTimeProfile()
const accessibilityConfig = configPresets.input.profiles.accessibilityProfile()
const standardConfig = configPresets.input.profiles.standardProfile()

// Use specific settings
const trigger = configPresets.input.triggers.realTime // 'onChange'
const debounce = configPresets.input.debounce.fast // 150ms
const errorDisplay = configPresets.input.errorDisplay.inline // 'inline'

// Create custom profile
const customInputConfig = configPresets.input.custom.createProfile({
    trigger: 'onBlur',
    debounce: 200,
    autoFocus: true,
    accessibility: true
})
```

#### Notification Configuration Presets

```typescript
// Get notification profiles
const errorNotification = configPresets.notification.profiles.errorProfile()
const successNotification = configPresets.notification.profiles.successProfile()
const accessibleNotification = configPresets.notification.profiles.accessibilityProfile()

// Use specific settings
const duration = configPresets.notification.duration.long // 7000ms
const position = configPresets.notification.position.center // 'center'
const maxConcurrent = configPresets.notification.maxConcurrent.few // 3

// Create custom notification
const customNotification = configPresets.notification.custom.createProfile({
    duration: 5000,
    position: 'top',
    sound: false,
    animation: true
})
```

#### Service Configuration Presets

```typescript
// Get service profiles
const devConfig = configPresets.service.profiles.developmentProfile()
const prodConfig = configPresets.service.profiles.productionProfile()
const perfConfig = configPresets.service.profiles.performanceProfile()

// Environment detection
const autoConfig = configPresets.service.environment.autoDetectProfile()
const isDev = configPresets.service.environment.isDevelopment()

// Use specific settings
const logLevel = configPresets.service.logLevel.debug // 'debug'
const validation = configPresets.service.developmentValidation.enabled // true
```

#### Conventions Configuration Presets

```typescript
// Get trigger delay presets (replaces hardcoded conventions.ts values)
const normalDelay = configPresets.conventions.eventTriggers.normal // 500ms
const fastDelay = configPresets.conventions.eventTriggers.fast // 200ms
const uiDelay = configPresets.conventions.uiTriggers.normal // 200ms

// Get component dimension presets
const mediumDrawer = configPresets.conventions.components.drawer.medium // { height: '350px', width: '250px' }
const largeButton = configPresets.conventions.components.button.large // { width: '2.5em', height: '2.5em' }

// Get UI convention presets
const labelSuffix = configPresets.conventions.uiConventions.suffixes.labelId // '-label'
const validationToken = configPresets.conventions.uiConventions.tokens.validation.primary // '|data|'

// Get date formatting presets with locale support
const systemSeparator = configPresets.conventions.dataTypes.date.separators.system()
const usDateFormat = configPresets.conventions.dataTypes.date.formats.forLocale('us')
const euDateFormat = configPresets.conventions.dataTypes.date.formats.forLocale('eu')

// Get environment-specific convention profiles
const devConventions = configPresets.conventions.profiles.developmentProfile() // Slower triggers for debugging
const prodConventions = configPresets.conventions.profiles.productionProfile() // Faster triggers for performance
const a11yConventions = configPresets.conventions.profiles.accessibilityProfile() // Longer delays, larger components
```

### Pattern 2: Cross-Cutting Environment Profiles

```typescript
// Complete environment configurations
const developmentProfile = configPresets.profiles.developmentProfile()
const productionProfile = configPresets.profiles.productionProfile()
const accessibilityProfile = configPresets.profiles.accessibilityProfile()
const performanceProfile = configPresets.profiles.performanceProfile()
const testingProfile = configPresets.profiles.testingProfile()

// Auto-detect appropriate profile
const autoProfile = configPresets.utils.autoDetectProfile()
```

### Pattern 3: Validation and Status Checking

```typescript
// Check if all configuration services are available
const allServicesAvailable = configPresets.utils.validateServices()

// Get detailed status report
const statusReport = configPresets.utils.getStatusReport()
console.log('Configuration Status:', statusReport)
// {
//   validation: true,
//   input: true,
//   notification: true,
//   service: true,
//   allAvailable: true
// }
```

## Complete Integration Examples

### Example 1: Form with Comprehensive Configuration

```typescript
import { createConfigurationPresetFactory } from '@project/config/configuration-presets-factory'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'

// Setup
const configPresets = createConfigurationPresetFactory(serviceManager)

// Get profiles based on use case
const inputProfile = configPresets.input.profiles.standardProfile()
const notificationProfile = configPresets.notification.profiles.infoProfile()

// Create phone validation with presets
const phoneConstraint = new ValidationConstraintBuilder<RegExp>('pattern')
    .setConstraint(configPresets.validation.phone.us)
    .setName('phoneNumber')
    .setErrorMessage('Please enter a valid US phone number')
    .setGuideMessage('Format: (555) 123-4567')

// Create email validation with presets
const emailConstraint = new ValidationConstraintBuilder<RegExp>('pattern')
    .setConstraint(configPresets.validation.email)
    .setName('email')
    .setErrorMessage('Please enter a valid email address')

// Build complete validation
const validationBuilder = new GenericValidationBuilder()
    .addConstraint(phoneConstraint.build())
    .addConstraint(emailConstraint.build())

// Apply input configuration
const inputSettings = {
    validationTrigger: inputProfile.trigger,
    debounceMs: inputProfile.debounce,
    errorDisplay: inputProfile.errorDisplay,
    autoFocus: inputProfile.autoFocus,
    accessibility: inputProfile.accessibility
}

// Apply notification configuration
const notificationSettings = {
    duration: notificationProfile.duration,
    position: notificationProfile.position,
    maxConcurrent: notificationProfile.maxConcurrent,
    sound: notificationProfile.sound,
    animation: notificationProfile.animation
}
```

### Example 2: Environment-Specific Application Setup

```typescript
import { createConfigurationPresetFactory } from '@project/config/configuration-presets-factory'
import { setupConfigurationServices } from '@core/config'

const serviceManager = new ServiceManager()

// Create the presets factory
const configPresets = createConfigurationPresetFactory(serviceManager)

// Auto-detect environment and apply appropriate configuration
const profile = configPresets.utils.autoDetectProfile()

// Setup configuration services with environment-specific settings
setupConfigurationServices(serviceManager, {
    validation: {
        fallbackBehavior: profile.validation ? 'strict' : 'lenient'
    },
    inputs: {
        defaultValidationTrigger: profile.input.trigger,
        debounceMs: profile.input.debounce,
        defaultErrorDisplay: profile.input.errorDisplay
    },
    notifications: {
        defaultDuration: profile.notification.duration,
        position: profile.notification.position,
        maxConcurrent: profile.notification.maxConcurrent
    },
    services: {
        logLevel: profile.service.logLevel,
        enableDevelopmentValidation: profile.service.developmentValidation,
        enablePerformanceMetrics: profile.service.performanceMetrics
    }
})

console.log('Applied configuration profile:', {
    environment: configPresets.service.environment.isDevelopment() ? 'development' : 'production',
    profile: profile
})
```

### Example 3: Accessibility-Enhanced Configuration

```typescript
const configPresets = createConfigurationPresetFactory(serviceManager)

// Get accessibility-enhanced profiles
const accessibilityProfile = configPresets.profiles.accessibilityProfile()

// Apply accessibility settings
const accessibilitySettings = {
    // Input settings optimized for accessibility
    input: {
        trigger: accessibilityProfile.input.trigger, // 'onBlur'
        errorDisplay: accessibilityProfile.input.errorDisplay, // 'inline'
        autoFocus: accessibilityProfile.input.autoFocus, // true
        accessibility: accessibilityProfile.input.accessibility // true
    },

    // Notification settings for accessibility
    notification: {
        duration: accessibilityProfile.notification.duration, // 0 (persistent)
        position: accessibilityProfile.notification.position, // 'center'
        maxConcurrent: accessibilityProfile.notification.maxConcurrent, // 1
        sound: accessibilityProfile.notification.sound, // true
        animation: accessibilityProfile.notification.animation // false
    },

    // Service settings for enhanced debugging
    service: {
        logLevel: accessibilityProfile.service.logLevel, // 'debug'
        developmentValidation: accessibilityProfile.service.developmentValidation, // true
        performanceMetrics: accessibilityProfile.service.performanceMetrics // true
    }
}

console.log('Accessibility configuration applied:', accessibilitySettings)
```

## Benefits of This Approach

### 1. Consistency

All configuration areas follow the same preset pattern you established with ValidationConfigPresets.

### 2. Flexibility

-   Individual area access: `configPresets.validation.phone.us`
-   Profile-based access: `configPresets.input.profiles.realTimeProfile()`
-   Cross-cutting profiles: `configPresets.profiles.developmentProfile()`

### 3. Environment Awareness

-   Auto-detection: `configPresets.utils.autoDetectProfile()`
-   Manual selection: `configPresets.service.profiles.productionProfile()`

### 4. Validation and Monitoring

-   Service availability: `configPresets.utils.validateServices()`
-   Status reporting: `configPresets.utils.getStatusReport()`

### 5. Type Safety

All presets maintain full TypeScript type safety and IntelliSense support.

## Migration Path

1. **Immediate**: Use `createConfigurationPresetFactory()` for new code
2. **Gradual**: Replace individual configuration service calls with preset equivalents
3. **Complete**: Adopt cross-cutting profiles for environment-specific configurations

This approach extends your ValidationConfigPresets pattern across all configuration areas, providing a unified, consistent, and powerful configuration system.
