import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { getValidationPresets } from '@project/validation/validation-config-presets'
import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { currencyPattern } from '../validation.regex.patterns'

// Original validator (kept for backward compatibility)
export const currencyValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.currencyError)
                .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
        )
    }

    // Currency pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(currencyPattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    // Max length for currency
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}

/**
 * Enhanced currency validator that uses ValidationConfigPresets
 * This is the new pattern that integrates with your configuration system
 */
export const currencyValidatorWithPresets = (
    name: string,
    serviceManager: IServiceManager,
    required: boolean = true
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.currencyError)
                .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
        )
    }

    // Get pattern from ValidationConfigPresets
    let currencyPattern: RegExp
    try {
        const presets = getValidationPresets(serviceManager)
        currencyPattern = presets.currency
    } catch (error: any) {
        console.warn(
            'ValidationConfigPresets not available, using fallback pattern:',
            error.message
        )
        // Fallback to hardcoded pattern
        currencyPattern = /^\d+([,.]\d+)*([,.]\d{1,2})?$/
    }

    // Currency pattern validation using preset
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(currencyPattern) // ← Using preset pattern!
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    // Max length for currency
    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(20)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.currencyError)
            .setGuideMessage(ValidationLocalizeKeys.currencyGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
