# FORMULAR - Enhanced Validation Pattern System

This document explains the new validation pattern system that integrates `ValidationConfigService` with validators for better flexibility and configurability.

## Overview

The enhanced validation pattern system replaces hardcoded patterns in validators with a configurable system that:

-   ✅ Uses `ValidationConfigService` for centralized pattern management
-   ✅ Supports runtime pattern configuration and updates
-   ✅ Maintains backward compatibility with existing validators
-   ✅ Provides fallback mechanisms for robustness
-   ✅ Supports country-specific and multi-locale validation
-   ✅ Enables easy pattern customization by consumers

## Quick Start

### 1. Setup Validation Patterns

```typescript
import { setupValidationPatterns } from '@project/setup/setup-validation-patterns'
import { ServiceManager } from '@core/managers/service-manager/service-manager'

const serviceManager = new ServiceManager()

// Setup with default patterns
setupValidationPatterns(serviceManager)

// Or setup with custom patterns
setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            phone: {
                CUSTOM: /^CUSTOM\d{10}$/,
                US: /^\+1\d{10}$/,
                fallback: /^\d{10}$/
            },
            email: {
                CORPORATE: /^[a-zA-Z0-9._%+-]+@company\.com$/,
                fallback: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            }
        },
        fallbackBehavior: 'lenient',
        enableStrictMode: false
    }
})
```

### 2. Use Enhanced Validators

```typescript
import { createPhoneValidatorWithPatterns } from '@project/examples/enhanced-phone-validator-example'

// Create validator factory
const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)

// Create validators for different locales
const usPhoneValidator = phoneValidators.us('phoneNumber')
const swissPhoneValidator = phoneValidators.ch('phoneNumber')
const customPhoneValidator = phoneValidators.forLocale('phoneNumber', 'CUSTOM')

// Get supported locales
const supportedLocales = phoneValidators.getSupportedLocales()
console.log('Supported locales:', supportedLocales)

// Validate directly
const isValidUS = phoneValidators.validate('+1234567890', 'US')
const isValidCH = phoneValidators.validate('+41 44 123 45 67', 'CH')
```

### 3. Use Pattern Service Directly

```typescript
import {
    IValidationPatternService,
    SValidationPatternService
} from '@project/setup/setup-validation-patterns'

const patternService = serviceManager.resolve<IValidationPatternService>(SValidationPatternService)

// Get patterns
const phonePattern = patternService.getPattern('phone', 'US')
const emailPattern = patternService.getPattern('email')

// Validate with patterns
const isValidPhone = patternService.validateWithPattern('phone', '+1234567890', 'US')
const isValidEmail = patternService.validateWithPattern('email', 'user@example.com')

// Get supported locales
const phoneLocales = patternService.getSupportedLocales('phone')
```

## Configuration Options

### Pattern Types

The system supports these pattern types:

| Type             | Description                     | Locales Supported                              |
| ---------------- | ------------------------------- | ---------------------------------------------- |
| `phone`          | Phone number patterns           | US, CA, UK, DE, FR, CH, IT, ES, AT, NL, BE, LU |
| `postal`         | Postal code patterns            | US, CA, UK, DE, FR, CH, IT, ES, AT, NL, BE, LU |
| `ssn`            | Social Security Number patterns | US, CA, UK, DE, FR, CH, IT, ES, AT, NL, BE, LU |
| `email`          | Email address patterns          | Generic fallback                               |
| `firstName`      | First name patterns             | Generic fallback                               |
| `lastName`       | Last name patterns              | Generic fallback                               |
| `fullName`       | Full name patterns              | Generic fallback                               |
| `passwordStrong` | Strong password patterns        | Generic fallback                               |
| `passwordMedium` | Medium password patterns        | Generic fallback                               |
| `url`            | URL patterns                    | Generic fallback                               |
| `creditCard`     | Credit card patterns            | Generic fallback                               |
| `currency`       | Currency patterns               | Generic fallback                               |
| `age`            | Age patterns                    | Generic fallback                               |
| `username`       | Username patterns               | Generic fallback                               |
| `time`           | Time patterns                   | Generic fallback                               |
| `date`           | Date patterns                   | Generic fallback                               |
| `numeric`        | Numeric patterns                | Generic fallback                               |

### Fallback Behavior

Configure how the system handles missing patterns:

```typescript
setupValidationPatterns(serviceManager, {
    validation: {
        fallbackBehavior: 'lenient', // 'strict' | 'lenient' | 'silent'
        enableStrictMode: false
    }
})
```

-   **`lenient`**: Returns `true` when no pattern is found (default)
-   **`strict`**: Throws an error when no pattern is found
-   **`silent`**: Returns `false` when no pattern is found

### Custom Patterns

Add your own validation patterns:

```typescript
setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            custom: {
                'product-code': {
                    STANDARD: /^STD-\d{6}$/,
                    PREMIUM: /^PRM-[A-Z]{3}-\d{4}$/,
                    fallback: /^[A-Z0-9-]{8,12}$/
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
```

## Migration Guide

### From Hardcoded Validators

**Before (hardcoded pattern):**

```typescript
export const phoneValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    // Hardcoded pattern
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(
                /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
            )
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
```

**After (configurable pattern):**

```typescript
export const enhancedPhoneValidator = (
    name: string,
    required: boolean = true,
    locale?: string,
    serviceManager?: IServiceManager
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    // Get pattern from service or fallback
    let phonePattern: RegExp
    if (serviceManager) {
        try {
            const patternService =
                serviceManager.resolve<IValidationPatternService>(SValidationPatternService)
            phonePattern = patternService.getPattern('phone', locale)
        } catch (error: any) {
            console.warn(
                'ValidationPatternService not available, using fallback pattern:',
                error.message
            )
            phonePattern =
                /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
        }
    } else {
        phonePattern =
            /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    }

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(phonePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.phoneError)
            .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
```

### Updating Existing Projects

1. **Add setup call** in your initialization:

    ```typescript
    import { setupValidationPatterns } from '@project/setup/setup-validation-patterns'

    // In your app initialization
    setupValidationPatterns(serviceManager)
    ```

2. **Update validator usage** to pass service manager:

    ```typescript
    // Before
    const validator = phoneValidator('phone', true)

    // After
    const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)
    const validator = phoneValidators.us('phone', true)
    ```

3. **Migrate custom patterns** to configuration:
    ```typescript
    // Move hardcoded patterns to configuration
    setupValidationPatterns(serviceManager, {
        validation: {
            patterns: {
                phone: {
                    MY_CUSTOM: /^MY_PATTERN$/,
                    fallback: /^DEFAULT_PATTERN$/
                }
            }
        }
    })
    ```

## Benefits

### For Library Maintainers

-   **Centralized Pattern Management**: All patterns in one configurable place
-   **Easier Testing**: Mock patterns easily for testing
-   **Runtime Updates**: Change patterns without recompiling
-   **Better Organization**: Patterns separated from validator logic

### For Library Consumers

-   **Customizable Validation**: Override patterns for specific needs
-   **Multi-locale Support**: Easy country-specific validation
-   **Backward Compatibility**: Existing code continues to work
-   **Runtime Configuration**: Adjust validation based on environment

## Examples

### Business Application

```typescript
// Setup for Swiss business application
setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            phone: {
                CH: /^(\+41[-.\s]?)?\(?\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/,
                fallback: /^[\d+\-().\s]{7,20}$/
            },
            postal: {
                CH: /^\d{4}$/,
                fallback: /^\d{4,5}$/
            }
        }
    }
})

const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)
const swissPhoneValidator = phoneValidators.ch('customerPhone')
```

### International Application

```typescript
// Setup for international application
setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            phone: {
                US: /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                DE: /^(\+49[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{6,8}$/,
                FR: /^(\+33[-.\s]?)?\(?\d{1,2}\)?[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}$/,
                fallback: /^[\d+\-().\s]{7,20}$/
            }
        }
    }
})

// Use different validators based on user's country
const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)
const userCountry = getCurrentUserCountry() // Your logic
const phoneValidator = phoneValidators.forLocale('phone', userCountry)
```

## Best Practices

1. **Always setup patterns early** in your application lifecycle
2. **Use factory functions** for creating validators with service manager integration
3. **Provide fallbacks** for robustness
4. **Test with different locales** to ensure patterns work correctly
5. **Document custom patterns** for team members
6. **Use TypeScript types** for pattern type safety

## Troubleshooting

### Common Issues

**ValidationConfigService not found**

```
Solution: Ensure setupValidationPatterns() is called before using validators
```

**Pattern not found for locale**

```
Solution: Check if the locale is supported or add a fallback pattern
```

**Service registration errors**

```
Solution: Verify service manager is properly initialized and passed to validators
```

## Integration with Existing Systems

The new pattern system is designed to work alongside existing validators. You can:

1. **Gradually migrate** validators to use the new system
2. **Mix old and new** validators in the same application
3. **Keep backward compatibility** by providing fallback patterns
4. **Extend existing patterns** with new locales or custom patterns

This system provides a solid foundation for flexible, maintainable, and configurable validation patterns while maintaining the robust architecture of the FORMULAR library.
