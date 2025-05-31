import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MinAndMaxLengthBuilder = (name: string, minValue: number, maxLength: number) =>
    new GenericValidationBuilder().setConstraints([
        new ValidationConstraintBuilder<number>('min')
            .setConstraint(minValue)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.minError)
            .setGuideMessage(ValidationLocalizeKeys.minGuide),
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(maxLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.maxLengthError)
            .setGuideMessage(ValidationLocalizeKeys.maxLengthGuide)
    ])
