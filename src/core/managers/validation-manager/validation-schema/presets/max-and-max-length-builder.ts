import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MaxAndMaxLengthBuilder = (name: string, maxValue: number, maxLength: number) =>
    new GenericValidationBuilder().setConstraints([
        new ValidationConstraintBuilder<number>('max')
            .setConstraint(maxValue)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.maxError)
            .setGuideMessage(ValidationLocalizeKeys.maxGuide),
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(maxLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.maxLengthError)
            .setGuideMessage(ValidationLocalizeKeys.maxLengthGuide)
    ])
