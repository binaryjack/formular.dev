# FORMULAR Configuration System

The FORMULAR library provides a comprehensive configuration system built on top of our custom IoC container. This allows consumers to override default settings with their own configuration while maintaining type safety and performance.

## Quick Start

### Basic Setup

```typescript
import { getGlobalServiceManager } from 'formular.dev.lib'
import { setupConfigurationServices } from 'formular.dev.lib/config'

// Set up the configuration services
const serviceManager = getGlobalServiceManager()
setupConfigurationServices(serviceManager, {
    // Your custom configuration here
    validation: {
        patterns: {
            phone: {
                MY_COUNTRY: /^(\+60|0)[1-9]\d{7,8}$/
            }
        }
    },
    inputs: {
        debounceMs: 500
    }
})
```

### Using Configuration Services

```typescript
import {
    SValidationConfigService,
    SInputConfigService,
    IValidationConfigService,
    IInputConfigService
} from 'formular.dev.lib/config'

// In your component or service
export const MyComponent = function (sm: IServiceManager) {
    const validationConfig = sm.resolve<IValidationConfigService>(SValidationConfigService)
    const inputConfig = sm.resolve<IInputConfigService>(SInputConfigService)

    // Use configuration
    const debounceMs = inputConfig.getDebounceMs() // 500
    const isValid = validationConfig.validatePattern('phone', 'MY_COUNTRY', '+60123456789')
}
```

## Configuration Options

### Validation Configuration

```typescript
interface ValidationConfig {
    patterns: Record<string, ValidationPatternMap> & {
        phone: ValidationPatternMap
        postal: ValidationPatternMap
        ssn: ValidationPatternMap
        email?: ValidationPatternMap
        custom?: Record<string, ValidationPatternMap>
    }
    fallbackBehavior: 'strict' | 'lenient' | 'silent'
    enableStrictMode: boolean
}
```

**Example:**

```typescript
setupConfigurationServices(serviceManager, {
    validation: {
        patterns: {
            phone: {
                FR: /^(?:\+33|0)[1-9](?:\d{8})$/,
                DE: /^(\+49|0)[1-9]\d{10,11}$/,
                fallback: /^[\d\s\-+()]{7,15}$/
            },
            custom: {
                'vat-number': {
                    FR: /^FR\d{11}$/,
                    DE: /^DE\d{9}$/,
                    fallback: /^[A-Z]{2}\d{8,12}$/
                }
            }
        },
        fallbackBehavior: 'lenient',
        enableStrictMode: false
    }
})
```

### Input Configuration

```typescript
interface InputConfig {
    defaultValidationTrigger: 'onBlur' | 'onChange' | 'onSubmit'
    defaultErrorDisplay: 'inline' | 'tooltip' | 'summary'
    debounceMs: number
    autoFocus: boolean
    enableAccessibility: boolean
}
```

**Example:**

```typescript
setupConfigurationServices(serviceManager, {
    inputs: {
        defaultValidationTrigger: 'onChange',
        defaultErrorDisplay: 'tooltip',
        debounceMs: 300,
        autoFocus: true,
        enableAccessibility: true
    }
})
```

### Service Configuration

```typescript
interface ServiceConfig {
    enableDevelopmentValidation: boolean
    enableCircularDependencyDetection: boolean
    logLevel: 'error' | 'warn' | 'info' | 'debug'
    enablePerformanceMetrics: boolean
}
```

**Example:**

```typescript
setupConfigurationServices(serviceManager, {
    services: {
        enableDevelopmentValidation: true,
        enableCircularDependencyDetection: true,
        logLevel: 'debug',
        enablePerformanceMetrics: true
    }
})
```

### Notification Configuration

```typescript
interface NotificationConfig {
    defaultDuration: number
    maxConcurrent: number
    position: 'top' | 'bottom' | 'center'
    enableSound: boolean
    enableAnimation: boolean
}
```

**Example:**

```typescript
setupConfigurationServices(serviceManager, {
    notifications: {
        defaultDuration: 3000,
        maxConcurrent: 5,
        position: 'bottom',
        enableSound: true,
        enableAnimation: true
    }
})
```

## Advanced Usage

### Runtime Configuration Updates

```typescript
import { SConfigurationService, IConfigurationService } from 'formular.dev.lib/config'

const configService = serviceManager.resolve<IConfigurationService>(SConfigurationService)

// Update configuration at runtime
configService.updateConfig({
    inputs: {
        debounceMs: 600
    }
})

// Reset to defaults
configService.resetToDefaults()
```

### Environment-Specific Configuration

```typescript
const isDevelopment = process.env.NODE_ENV === 'development'

setupConfigurationServices(serviceManager, {
    services: {
        enableDevelopmentValidation: isDevelopment,
        logLevel: isDevelopment ? 'debug' : 'error',
        enablePerformanceMetrics: isDevelopment
    },
    validation: {
        enableStrictMode: !isDevelopment
    }
})
```

### Custom Validation Patterns

```typescript
// Add your own validation patterns
setupConfigurationServices(serviceManager, {
    validation: {
        patterns: {
            custom: {
                'credit-card': {
                    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                    mastercard: /^5[1-5][0-9]{14}$/,
                    amex: /^3[47][0-9]{13}$/,
                    fallback: /^[0-9]{13,19}$/
                },
                'license-plate': {
                    US: /^[A-Z]{1,3}\s?[0-9]{1,4}$/,
                    EU: /^[A-Z]{1,3}-[0-9]{1,4}$/,
                    fallback: /^[A-Z0-9\s-]{3,10}$/
                }
            }
        }
    }
})

// Use in your validation service
const validationConfig = sm.resolve<IValidationConfigService>(SValidationConfigService)
const isValidCard = validationConfig.validatePattern('credit-card', 'visa', '4111111111111111')
```

## Service Interfaces

### IValidationConfigService

```typescript
interface IValidationConfigService {
    getPatterns(): ValidationConfig['patterns']
    getFallbackBehavior(): FallbackBehavior
    isStrictModeEnabled(): boolean
    validatePattern(type: string, locale: string, value: string): boolean
    getPatternForLocale(type: string, locale: string): RegExp | undefined
    getSupportedLocales(type: string): string[]
}
```

### IInputConfigService

```typescript
interface IInputConfigService {
    getDefaultTrigger(): ValidationTrigger
    getErrorDisplay(): ErrorDisplayMode
    getDebounceMs(): number
    isAutoFocusEnabled(): boolean
    isAccessibilityEnabled(): boolean
}
```

### IConfigurationService

```typescript
interface IConfigurationService {
    getValidationConfig(): ValidationConfig
    getInputConfig(): InputConfig
    getServiceConfig(): ServiceConfig
    getNotificationConfig(): NotificationConfig
    getFullConfig(): LibraryConfig
    updateConfig(config: PartialLibraryConfig): void
    resetToDefaults(): void
}
```

## Best Practices

1. **Set up configuration early**: Call `setupConfigurationServices` before resolving any other services
2. **Use partial configuration**: Only override what you need to change
3. **Environment-specific configs**: Use different configurations for development/production
4. **Type safety**: Import and use the TypeScript interfaces for better IDE support
5. **Validation fallbacks**: Always provide fallback patterns for better UX
6. **Scoped services**: Use the specialized services (`IValidationConfigService`, etc.) instead of the main service when you only need specific configuration

## Migration from Conventions

If you're migrating from the old convention-based system:

1. Remove convention files from your codebase
2. Extract configuration values into the new configuration objects
3. Replace direct convention imports with IoC service resolution
4. Update tests to use the new configuration services

**Before:**

```typescript
import { phoneValidationConvention } from './conventions/phone-validation'
const isValid = phoneValidationConvention.validate(value, locale)
```

**After:**

```typescript
const validationConfig = sm.resolve<IValidationConfigService>(SValidationConfigService)
const isValid = validationConfig.validatePattern('phone', locale, value)
```
