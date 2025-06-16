# FORMULAR Configuration System - Consumer Guide

## Overview

The FORMULAR configuration system replaces the scattered convention-based approach with a centralized, IoC-based configuration service. This provides better maintainability, type safety, and flexibility for consumers.

## Migration Guide

### Before: Convention-Based Approach

```typescript
// Old way - multiple convention files
import { phoneValidationConvention } from './conventions/phone-validation'
import { inputConfigConvention } from './conventions/input-config'

const isValid = phoneValidationConvention.validate(value, locale)
const debounceMs = inputConfigConvention.getDebounceMs()
```

### After: IoC Configuration Services

```typescript
// New way - single configuration point
import { getGlobalServiceManager } from 'formular.dev.lib'
import {
    setupConfigurationServices,
    SValidationConfigService,
    SInputConfigService
} from 'formular.dev.lib'

// 1. Configure once at startup
const serviceManager = getGlobalServiceManager()
setupConfigurationServices(serviceManager, {
    validation: {
        patterns: {
            phone: {
                MY_LOCALE: /^my-phone-pattern$/
            }
        }
    },
    inputs: {
        debounceMs: 500
    }
})

// 2. Use throughout your application
export const MyService = function (this: IMyService, sm: IServiceManager) {
    this.sm = sm

    this.validatePhone = function (value: string, locale: string): boolean {
        const validationConfig = this.sm.resolve<IValidationConfigService>(SValidationConfigService)
        return validationConfig.validatePattern('phone', locale, value)
    }

    this.getDebounceMs = function (): number {
        const inputConfig = this.sm.resolve<IInputConfigService>(SInputConfigService)
        return inputConfig.getDebounceMs()
    }
}
```

## Integration with Your Existing Setup

Based on your current `setupManagers` function, here's how to integrate the configuration services:

### Update your setup-managers.ts file:

```typescript
import { setupConfigurationServices } from '@core/config'

export const setupManagers = function (sm: IServiceManager, userConfig?: PartialLibraryConfig) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    // 1. FIRST: Set up configuration services before other services
    setupConfigurationServices(sm, userConfig)

    // 2. Register the ServiceManager instance under its interface identifier
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })

    // 3. Register other services (they can now depend on configuration services)
    sm.registerClass(SFieldDescriptorService, FieldDescriptorService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    // ... rest of your existing setup
}
```

### Update your app-lifecycle-instances.ts:

```typescript
import { PartialLibraryConfig } from '@core/config'

export const AppLifecycleInstances = function (userConfig?: PartialLibraryConfig) {
    let globalServiceManager: IServiceManager | null = null

    const getGlobalServiceManager = function (): IServiceManager {
        globalServiceManager ??= new ServiceManager()
        return globalServiceManager
    }

    const resetServiceManager = function () {
        if (globalServiceManager) {
            globalServiceManager.dispose()
            globalServiceManager = null
        }
    }

    // Pass user configuration to setup
    setupManagers(getGlobalServiceManager(), userConfig)
    setupFormularManager(getGlobalServiceManager())
    // ... rest of your setup

    return {
        resetServiceManager: resetServiceManager,
        getGlobalServiceManager: getGlobalServiceManager
    }
}
```

## Consumer Usage Examples

### Example 1: Library Consumer Configuration

```typescript
// consumer-app/src/formular-config.ts
import { PartialLibraryConfig } from 'formular.dev.lib'

export const myFormularConfig: PartialLibraryConfig = {
    validation: {
        patterns: {
            phone: {
                US: /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                FR: /^(?:\+33|0)[1-9](?:\d{8})$/,
                fallback: /^[\d\s\-+()]{7,15}$/
            },
            custom: {
                'tax-id': {
                    US: /^\d{2}-\d{7}$/,
                    FR: /^FR\d{11}$/,
                    fallback: /^[A-Z0-9]{8,15}$/
                }
            }
        },
        fallbackBehavior: 'lenient'
    },
    inputs: {
        debounceMs: 400,
        defaultValidationTrigger: 'onChange',
        enableAccessibility: true
    },
    services: {
        logLevel: 'info',
        enablePerformanceMetrics: true
    }
}
```

```typescript
// consumer-app/src/main.ts
import { AppLifecycleInstances } from 'formular.dev.lib'
import { myFormularConfig } from './formular-config'

// Initialize FORMULAR with your configuration
const { getGlobalServiceManager } = AppLifecycleInstances(myFormularConfig)

// Now all FORMULAR services will use your configuration
const serviceManager = getGlobalServiceManager()
```

### Example 2: Using Configuration in Your Components

```typescript
// React component example
import React from 'react'
import { useServiceManager } from './hooks/useServiceManager' // Your hook
import { SValidationConfigService, IValidationConfigService } from 'formular.dev.lib'

export const PhoneInput = ({ locale = 'US' }: { locale?: string }) => {
    const serviceManager = useServiceManager()
    const [value, setValue] = React.useState('')
    const [isValid, setIsValid] = React.useState(false)

    const validatePhone = React.useCallback(
        (phoneValue: string) => {
            const validationConfig =
                serviceManager.resolve<IValidationConfigService>(SValidationConfigService)
            return validationConfig.validatePattern('phone', locale, phoneValue)
        },
        [serviceManager, locale]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        setIsValid(validatePhone(newValue))
    }

    return (
        <div>
            <input
                type="tel"
                value={value}
                onChange={handleChange}
                className={isValid ? 'valid' : 'invalid'}
                placeholder={`Enter ${locale} phone number`}
            />
            {!isValid && value && <span className="error">Invalid phone number for {locale}</span>}
        </div>
    )
}
```

### Example 3: Environment-Specific Configuration

```typescript
// config/development.ts
export const developmentConfig: PartialLibraryConfig = {
    services: {
        enableDevelopmentValidation: true,
        enableCircularDependencyDetection: true,
        logLevel: 'debug',
        enablePerformanceMetrics: true
    },
    validation: {
        enableStrictMode: false // More lenient in development
    }
}

// config/production.ts
export const productionConfig: PartialLibraryConfig = {
    services: {
        enableDevelopmentValidation: false,
        enableCircularDependencyDetection: false,
        logLevel: 'error',
        enablePerformanceMetrics: false
    },
    validation: {
        enableStrictMode: true // Strict in production
    }
}

// main.ts
import { developmentConfig } from './config/development'
import { productionConfig } from './config/production'

const config = process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig
const { getGlobalServiceManager } = AppLifecycleInstances(config)
```

### Example 4: Runtime Configuration Updates

```typescript
// admin-panel/configuration-manager.ts
import { SConfigurationService, IConfigurationService } from 'formular.dev.lib'

export const ConfigurationManager = function (this: IConfigurationManager, sm: IServiceManager) {
    this.sm = sm

    this.updateValidationPatterns = function (newPatterns: Record<string, ValidationPatternMap>) {
        const configService = this.sm.resolve<IConfigurationService>(SConfigurationService)
        configService.updateConfig({
            validation: {
                patterns: newPatterns
            }
        })
    }

    this.updateInputSettings = function (inputConfig: Partial<InputConfig>) {
        const configService = this.sm.resolve<IConfigurationService>(SConfigurationService)
        configService.updateConfig({
            inputs: inputConfig
        })
    }

    this.resetToDefaults = function () {
        const configService = this.sm.resolve<IConfigurationService>(SConfigurationService)
        configService.resetToDefaults()
    }
}
```

## Testing with Configuration

```typescript
// test-utils/mock-configuration.ts
import { ServiceManagerMockBuilder } from '../__tests__/core/managers/service-manager-mock-builder'
import { SConfigurationService, IConfigurationService } from 'formular.dev.lib'

export const createMockConfigurationService = (overrides: Partial<LibraryConfig> = {}) => {
    const mockConfig: IConfigurationService = {
        getValidationConfig: () => ({
            patterns: {
                phone: { TEST: /^TEST\d{6}$/, fallback: /^\d+$/ },
                postal: { fallback: /^\d+$/ },
                ssn: { fallback: /^\d+$/ }
            },
            fallbackBehavior: 'lenient',
            enableStrictMode: false,
            ...overrides.validation
        }),
        getInputConfig: () => ({
            defaultValidationTrigger: 'onBlur',
            defaultErrorDisplay: 'inline',
            debounceMs: 300,
            autoFocus: false,
            enableAccessibility: true,
            ...overrides.inputs
        })
        // ... other methods
    }

    return new ServiceManagerMockBuilder().withMock(SConfigurationService, mockConfig).build()
}

// your-component.test.ts
describe('YourComponent', () => {
    it('should validate phone numbers correctly', () => {
        const mockSM = createMockConfigurationService({
            validation: {
                patterns: {
                    phone: { US: /^\d{10}$/, fallback: /^\d+$/ }
                }
            }
        })

        // Test your component with mocked configuration
    })
})
```

## Benefits of This Approach

1. **Single Configuration Point**: All settings in one place instead of scattered conventions
2. **Type Safety**: Full TypeScript support with interfaces and validation
3. **Runtime Updates**: Configuration can be changed without restart
4. **Environment Aware**: Different settings for dev/staging/production
5. **IoC Integration**: Proper dependency injection following your architecture
6. **Testable**: Easy to mock and test with different configurations
7. **Backwards Compatible**: Can be introduced gradually
8. **Performance**: Lazy loading and singleton services for efficiency

## Migration Checklist

-   [ ] Remove old convention files
-   [ ] Update `setupManagers` to include `setupConfigurationServices`
-   [ ] Update `AppLifecycleInstances` to accept user configuration
-   [ ] Replace convention imports with configuration service resolution
-   [ ] Update tests to use mock configuration services
-   [ ] Create your application-specific configuration object
-   [ ] Test all validation patterns work correctly
-   [ ] Update documentation for your team

This new system gives you a much more maintainable and flexible configuration architecture while preserving all the functionality of your existing conventions!
