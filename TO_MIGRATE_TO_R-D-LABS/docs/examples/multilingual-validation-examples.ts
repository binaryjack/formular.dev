/**
 * Example: Using Multilingual Validation in formular.dev
 * 
 * This file demonstrates various ways to implement multilingual
 * validation messages in your applications.
 */

import {
    createCommonLocalizedValidators,
    createLocalizedFormValidators,
    GenericValidationBuilder,
    SupportedLocale,
    translateValidation,
    ValidationConstraintBuilder,
    ValidationLocalizeKeys,
    ValidationTranslationService,
    validationTranslationService,
    withLocalization
} from 'formular.dev'

// ============================================================
// EXAMPLE 1: Basic Translation Service Usage
// ============================================================

export function example1_basicTranslation() {
    console.log('=== Example 1: Basic Translation ===')

    // Create service with French locale
    const service = new ValidationTranslationService({ defaultLocale: 'fr' })

    // Translate validation messages
    const requiredMsg = service.translate(ValidationLocalizeKeys.requiredError)
    console.log('French required:', requiredMsg)
    // Output: "Ce champ est requis"

    const minMsg = service.translate(ValidationLocalizeKeys.minError, 10)
    console.log('French min(10):', minMsg)
    // Output: "La valeur doit être supérieure à 10"

    // Switch to Spanish
    service.setLocale('es')
    const emailMsg = service.translate(ValidationLocalizeKeys.emailError)
    console.log('Spanish email:', emailMsg)
    // Output: "El formato del email no es correcto"
}

// ============================================================
// EXAMPLE 2: Using Global Singleton
// ============================================================

export function example2_globalSingleton() {
    console.log('=== Example 2: Global Singleton ===')

    // Set global locale
    validationTranslationService.setLocale('de')

    // Use convenience function
    const msg1 = translateValidation(ValidationLocalizeKeys.passwordError)
    console.log('German password:', msg1)
    // Output: "Das Passwortformat ist nicht korrekt"

    // Get translation builder for efficiency
    const t = validationTranslationService.getTranslationBuilder('it')
    const msg2 = t(ValidationLocalizeKeys.requiredError)
    const msg3 = t(ValidationLocalizeKeys.maxLengthError, 100)
    console.log('Italian required:', msg2)
    console.log('Italian maxLength(100):', msg3)
}

// ============================================================
// EXAMPLE 3: Localized Validator Creation
// ============================================================

export function example3_localizedValidators() {
    console.log('=== Example 3: Localized Validators ===')

    // Create Portuguese validators for email field
    const validators = createCommonLocalizedValidators('email', { locale: 'pt' })

    const emailValidator = new GenericValidationBuilder().setConstraints([
        validators.required(),
        validators.minLength(5),
        validators.maxLength(150),
        validators.pattern(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            ValidationLocalizeKeys.emailError,
            ValidationLocalizeKeys.emailGuide
        )
    ])

    console.log('Email validator created with Portuguese messages')
    return emailValidator
}

// ============================================================
// EXAMPLE 4: Complete Form Validation
// ============================================================

export function example4_completeForm() {
    console.log('=== Example 4: Complete Form ===')

    const formValidators = createLocalizedFormValidators(
        { locale: 'fr' }, // French locale
        {
            // Email field validators
            email: (v) => [
                v.required(),
                v.minLength(5),
                v.pattern(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    ValidationLocalizeKeys.emailError,
                    ValidationLocalizeKeys.emailGuide
                )
            ],

            // Password field validators
            password: (v) => [v.required(), v.minLength(8), v.maxLength(128)],

            // Age field validators
            age: (v) => [v.required(), v.min(18), v.max(120)],

            // Username field validators
            username: (v) => [v.required(), v.minLength(3), v.maxLength(20)]
        }
    )

    console.log('Form validators created:', Object.keys(formValidators))
    // All validators have French error messages
    return formValidators
}

// ============================================================
// EXAMPLE 5: Wrapping Existing Validators
// ============================================================

export function example5_wrapExisting() {
    console.log('=== Example 5: Wrap Existing Validators ===')

    // Existing validator without localization
    const baseValidator = new ValidationConstraintBuilder<number>('min')
        .setConstraint(18)
        .setName('age')

    // Add German localization
    const germanValidator = withLocalization(
        baseValidator,
        ValidationLocalizeKeys.minError,
        ValidationLocalizeKeys.minGuide,
        { locale: 'de' },
        '18' // Dynamic data for |data| token
    )

    console.log('Existing validator wrapped with German messages')
    return germanValidator
}

// ============================================================
// EXAMPLE 6: Custom Translations
// ============================================================

export function example6_customTranslations() {
    console.log('=== Example 6: Custom Translations ===')

    const service = new ValidationTranslationService({ defaultLocale: 'en' })

    // Override built-in English messages
    service.addCustomTranslation('en', {
        locale: 'en',
        validations: [
            {
                key: 'VALIDATION.EMAIL.ERROR',
                value: 'Oops! That email address looks invalid 🤔'
            },
            {
                key: 'VALIDATION.REQUIRED.ERROR',
                value: 'Hey! This field cannot be empty ⚠️'
            }
        ]
    })

    const customMsg1 = service.translate(ValidationLocalizeKeys.emailError)
    const customMsg2 = service.translate(ValidationLocalizeKeys.requiredError)

    console.log('Custom email:', customMsg1)
    console.log('Custom required:', customMsg2)
}

// ============================================================
// EXAMPLE 7: Adding New Locale
// ============================================================

export function example7_newLocale() {
    console.log('=== Example 7: Add New Locale ===')

    const service = new ValidationTranslationService()

    // Add Japanese translations
    service.addCustomTranslation('ja' as SupportedLocale, {
        locale: 'ja',
        validations: [
            {
                key: 'VALIDATION.EMAIL.ERROR',
                value: 'メールアドレスの形式が正しくありません'
            },
            {
                key: 'VALIDATION.REQUIRED.ERROR',
                value: 'この項目は必須です'
            },
            {
                key: 'VALIDATION.MIN.ERROR',
                value: '値は|data|より大きくなければなりません'
            }
        ]
    })

    service.setLocale('ja' as SupportedLocale)
    const japaneseMsg = service.translate(ValidationLocalizeKeys.emailError)
    console.log('Japanese email:', japaneseMsg)
}

// ============================================================
// EXAMPLE 8: React Integration
// ============================================================

export function example8_reactHook() {
    console.log('=== Example 8: React Hook Pattern ===')

    // This shows the pattern - actual implementation requires React
    const reactHookPattern = `
    import { useMemo } from 'react';
    import { 
      ValidationTranslationService,
      createCommonLocalizedValidators 
    } from 'formular.dev';

    export function useValidationMessages(locale: string) {
      const service = useMemo(
        () => new ValidationTranslationService({ defaultLocale: locale }),
        [locale]
      );

      const createValidators = useMemo(
        () => (fieldName: string) => 
          createCommonLocalizedValidators(fieldName, { locale }),
        [locale]
      );

      return { service, createValidators };
    }

    // In component:
    function MyForm() {
      const { locale } = useI18n();
      const { createValidators } = useValidationMessages(locale);
      
      const emailValidators = createValidators('email');
      // Use emailValidators.required(), etc.
    }
  `

    console.log('React Hook Pattern:', reactHookPattern)
}

// ============================================================
// EXAMPLE 9: Runtime Locale Switching
// ============================================================

export function example9_runtimeSwitch() {
    console.log('=== Example 9: Runtime Locale Switch ===')

    // Simulate user changing language preference
    const userLocale = 'fr' // From user preferences

    // Update global service
    validationTranslationService.setLocale(userLocale)

    // All subsequent translations use new locale
    const msg = translateValidation(ValidationLocalizeKeys.requiredError)
    console.log(`Message in ${userLocale}:`, msg)

    // Switch again
    validationTranslationService.setLocale('es')
    const msg2 = translateValidation(ValidationLocalizeKeys.requiredError)
    console.log('Message in es:', msg2)
}

// ============================================================
// EXAMPLE 10: Batch Translation
// ============================================================

export function example10_batchTranslation() {
    console.log('=== Example 10: Batch Translation ===')

    const service = new ValidationTranslationService({ defaultLocale: 'de' })

    // Translate multiple keys at once
    const keys = [
        ValidationLocalizeKeys.emailError,
        ValidationLocalizeKeys.passwordError,
        ValidationLocalizeKeys.requiredError,
        ValidationLocalizeKeys.minLengthError
    ]

    const translations = service.translateBatch(keys)

    console.log('Batch translations:')
    translations.forEach((message, key) => {
        console.log(`  ${key}: ${message}`)
    })
}

// ============================================================
// Run All Examples
// ============================================================

export function runAllExamples() {
    example1_basicTranslation()
    console.log('\n')

    example2_globalSingleton()
    console.log('\n')

    example3_localizedValidators()
    console.log('\n')

    example4_completeForm()
    console.log('\n')

    example5_wrapExisting()
    console.log('\n')

    example6_customTranslations()
    console.log('\n')

    example7_newLocale()
    console.log('\n')

    example8_reactHook()
    console.log('\n')

    example9_runtimeSwitch()
    console.log('\n')

    example10_batchTranslation()
}

// Uncomment to run examples:
// runAllExamples();
