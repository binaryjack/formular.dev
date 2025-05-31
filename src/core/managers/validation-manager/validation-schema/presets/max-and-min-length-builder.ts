import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MaxAndMinLengthBuilder = (name: string, maxValue: number, minLength: number) =>
    new GenericValidationBuilder().setConstraints([
        new ValidationConstraintBuilder<number>('max')
            .setConstraint(maxValue)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.maxError)
            .setGuideMessage(ValidationLocalizeKeys.maxGuide),
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(minLength)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.minLengthError)
            .setGuideMessage(ValidationLocalizeKeys.minLengthGuide)
    ])
