# FORMULAR - ValidationConfigPresets Integration Guide

This guide shows exactly how to use the new ValidationConfigPresets system with ValidationManager and ValidationConstraintBuilder, as requested.

## Overview

The ValidationConfigPresets system provides:

-   ✅ **Direct access to preset patterns** for ValidationConstraintBuilder
-   ✅ **Integration with ValidationConfigService** for runtime configuration
-   ✅ **Country-specific patterns** for international applications
-   ✅ **Backward compatibility** with existing validators
-   ✅ **Easy consumer usage** through factory functions

## Setup

### 1. Initialize Validation Patterns

```typescript
import { setupValidationPatterns } from '@project/setup/setup-validation-patterns'
import { ServiceManager } from '@core/managers/service-manager/service-manager'

const serviceManager = new ServiceManager()

// Setup with default patterns
setupValidationPatterns(serviceManager)

// Or with custom patterns
setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            phone: {
                CUSTOM: /^CUSTOM\d{10}$/,
                US: /^\+1\d{10}$/,
                fallback: /^\d{10}$/
            },
            currency: {
                EUR: /^\d+([,.]\d{3})*([,.]\d{2})?€?$/,
                USD: /^\$?\d+([,.]\d{3})*([,.]\d{2})?$/,
                fallback: /^\d+([,.]\d+)*([,.]\d{1,2})?$/
            }
        },
        fallbackBehavior: 'lenient'
    }
})
```

### 2. Register in Your Setup

```typescript
import { setupManagers } from '@project/setup/setup-managers'

// This automatically calls setupValidationPatterns
setupManagers(serviceManager)
```

## Consumer Usage - Exactly As You Requested

### Pattern 1: Direct Pattern Access

```typescript
import { createValidationPresetFactory } from '@project/examples/validation-presets-usage-examples'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

// Create the factory
const validationPresets = createValidationPresetFactory(serviceManager)

// Get patterns for direct use
const usPhonePattern = validationPresets.phone.us()
const chPostalPattern = validationPresets.postal.ch()
const currencyPattern = validationPresets.currency()

// Use directly with ValidationConstraintBuilder
const constraints = []

constraints.push(
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(usPhonePattern) // ← Direct preset usage!
        .setName('phoneNumber')
        .setErrorMessage(ValidationLocalizeKeys.phoneError)
        .setGuideMessage(ValidationLocalizeKeys.phoneGuide)
)

constraints.push(
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(chPostalPattern) // ← Direct preset usage!
        .setName('postalCode')
        .setErrorMessage(ValidationLocalizeKeys.postalCodeError)
        .setGuideMessage(ValidationLocalizeKeys.postalCodeGuide)
)
```

### Pattern 2: Factory Function Usage

```typescript
import { createPhoneValidatorWithPatterns } from '@project/examples/validation-presets-usage-examples'

// Create phone validator factory
const phoneValidators = createPhoneValidatorWithPatterns(serviceManager)

// Create validators for different countries
const usPhoneValidator = phoneValidators.us('phoneNumber')
const chPhoneValidator = phoneValidators.ch('phoneNumber')
const customPhoneValidator = phoneValidators.forCountry('phoneNumber', 'CUSTOM')

// Use with ValidationManager
const validationManager = serviceManager.resolve(SValidationManager)
validationManager.setValidation(usPhoneValidator.build())
```

### Pattern 3: Enhanced Validator Functions

```typescript
import { currencyValidatorWithPresets } from '@core/managers/validation-manager/validation-schema/validators/currency-validator'

// Use enhanced validator that automatically uses presets
const currencyValidator = currencyValidatorWithPresets('amount', serviceManager, true)

// Build and use with ValidationManager
const validationManager = serviceManager.resolve(SValidationManager)
validationManager.setValidation(currencyValidator.build())
```

## Complete Integration Example

Here's a complete example showing how consumers would use this in practice:

```typescript
import { ServiceManager } from '@core/managers/service-manager/service-manager'
import { setupValidationPatterns } from '@project/setup/setup-validation-patterns'
import { createValidationPresetFactory } from '@project/examples/validation-presets-usage-examples'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '@core/managers/validation-manager/validation-schema/validation.localize.keys'

// 1. Setup
const serviceManager = new ServiceManager()

setupValidationPatterns(serviceManager, {
    validation: {
        patterns: {
            phone: {
                COMPANY: /^COMP\d{8}$/,
                fallback: /^\d{10}$/
            },
            email: {
                CORPORATE: /^[a-zA-Z0-9._%+-]+@company\.com$/,
                fallback: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            }
        }
    }
})

// 2. Create preset factory
const validationPresets = createValidationPresetFactory(serviceManager)

// 3. Build validator using presets
const buildEmployeeValidator = (name: string) => {
    const constraints = []

    // Required field
    constraints.push(
        new ValidationConstraintBuilder<boolean>('required')
            .setConstraint(true)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.emailError)
            .setGuideMessage(ValidationLocalizeKeys.emailGuide)
    )

    // Use corporate email pattern preset
    const corporateEmailPattern = validationPresets.custom('email', 'CORPORATE')
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(corporateEmailPattern) // ← Preset pattern usage!
            .setName(name)
            .setErrorMessage('Must be a company email address')
            .setGuideMessage('Enter your @company.com email address')
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// 4. Create phone validator
const buildPhoneValidator = (name: string) => {
    const constraints = []

    // Use company phone pattern preset
    const companyPhonePattern = validationPresets.custom('phone', 'COMPANY')
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(companyPhonePattern) // ← Preset pattern usage!
            .setName(name)
            .setErrorMessage('Must be a company phone number')
            .setGuideMessage('Enter phone number in COMP12345678 format')
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// 5. Use the validators
const emailValidator = buildEmployeeValidator('email')
const phoneValidator = buildPhoneValidator('phone')

// 6. Apply to ValidationManager
const validationManager = serviceManager.resolve(SValidationManager)
validationManager.setValidation(emailValidator.build())
```

## Country-Specific Usage

```typescript
// Swiss business application
const validationPresets = createValidationPresetFactory(serviceManager)

// Swiss-specific patterns
const swissPhonePattern = validationPresets.phone.ch()
const swissPostalPattern = validationPresets.postal.ch()
const swissAhvPattern = validationPresets.ssn.ch() // AHV number

// Build Swiss phone validator
const buildSwissPhoneValidator = (name: string) => {
    const constraints = []

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(swissPhonePattern) // ← Swiss phone preset!
            .setName(name)
            .setErrorMessage('Invalid Swiss phone number')
            .setGuideMessage('Enter Swiss phone number (e.g., +41 44 123 45 67)')
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// Build Swiss postal code validator
const buildSwissPostalValidator = (name: string) => {
    const constraints = []

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(swissPostalPattern) // ← Swiss postal preset!
            .setName(name)
            .setErrorMessage('Invalid Swiss postal code')
            .setGuideMessage('Enter 4-digit Swiss postal code (e.g., 8001)')
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
```

## Multi-Country Support

```typescript
// European application supporting multiple countries
const validationPresets = createValidationPresetFactory(serviceManager)

const buildInternationalPhoneValidator = (name: string, country: string) => {
    const constraints = []

    // Get pattern for specific country
    const phonePattern = validationPresets.phone.forCountry(country)

    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(phonePattern) // ← Dynamic country preset!
            .setName(name)
            .setErrorMessage(`Invalid ${country} phone number`)
            .setGuideMessage(`Enter valid ${country} phone number`)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

// Usage for different countries
const germanPhoneValidator = buildInternationalPhoneValidator('phone', 'DE')
const frenchPhoneValidator = buildInternationalPhoneValidator('phone', 'FR')
const italianPhoneValidator = buildInternationalPhoneValidator('phone', 'IT')
```

## Runtime Pattern Updates

```typescript
import { IValidationConfigService, SValidationConfigService } from '@core/config'

// Update patterns at runtime
const configService = serviceManager.resolve<IValidationConfigService>(SValidationConfigService)

// Add new custom pattern
configService.updateConfig({
    validation: {
        patterns: {
            'product-code': {
                PREMIUM: /^PRM-[A-Z]{3}-\d{4}$/,
                STANDARD: /^STD-\d{6}$/,
                fallback: /^[A-Z0-9-]{6,12}$/
            }
        }
    }
})

// Use the new pattern immediately
const validationPresets = createValidationPresetFactory(serviceManager)
const premiumProductPattern = validationPresets.custom('product-code', 'PREMIUM')

const productCodeValidator = new ValidationConstraintBuilder<RegExp>('pattern')
    .setConstraint(premiumProductPattern) // ← New runtime pattern!
    .setName('productCode')
    .setErrorMessage('Invalid premium product code')
    .setGuideMessage('Enter premium product code (e.g., PRM-ABC-1234)')
```

## Best Practices

### 1. Always Setup First

```typescript
// ✅ Correct order
setupValidationPatterns(serviceManager, customConfig)
const presets = createValidationPresetFactory(serviceManager)

// ❌ Wrong order - will fail
const presets = createValidationPresetFactory(serviceManager)
setupValidationPatterns(serviceManager, customConfig)
```

### 2. Use Fallback Patterns

```typescript
// ✅ Robust pattern handling
const getPatternSafely = (presets, type, locale) => {
    try {
        return presets[type].forCountry(locale)
    } catch (error) {
        console.warn(`Pattern ${type}:${locale} not found, using generic`)
        return presets[type].generic
    }
}
```

### 3. Cache Factory Instances

```typescript
// ✅ Cache the factory for performance
class ValidationService {
    private presets = createValidationPresetFactory(this.serviceManager)

    buildPhoneValidator(country: string) {
        const pattern = this.presets.phone.forCountry(country)
        // ... build validator
    }
}
```

### 4. Type Safety

```typescript
// ✅ Use TypeScript for validation
const buildTypedValidator = <T extends RegExp>(pattern: T, name: string, errorMessage: string) => {
    return new ValidationConstraintBuilder<T>('pattern')
        .setConstraint(pattern)
        .setName(name)
        .setErrorMessage(errorMessage)
}
```

## Integration with ValidationManager

```typescript
import { IValidationManager, SValidationManager } from '@core/managers/validation-manager'

// Complete integration example
const setupFieldValidation = (serviceManager: IServiceManager) => {
    const validationPresets = createValidationPresetFactory(serviceManager)
    const validationManager = serviceManager.resolve<IValidationManager>(SValidationManager)

    // Build email validator with preset
    const emailPattern = validationPresets.email()
    const emailConstraints = [
        new ValidationConstraintBuilder<boolean>('required')
            .setConstraint(true)
            .setName('email')
            .setErrorMessage('Email is required'),
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(emailPattern) // ← Preset usage!
            .setName('email')
            .setErrorMessage('Invalid email format')
    ]

    const emailValidator = new GenericValidationBuilder().setConstraints(emailConstraints).build()

    // Apply to ValidationManager
    validationManager.setValidation(emailValidator)

    return validationManager
}
```

This system provides exactly what you requested - easy access to preconfigured patterns through ValidationConfigService that can be used directly with ValidationConstraintBuilder while maintaining full integration with the existing ValidationManager system.
