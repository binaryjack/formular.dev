import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MinLengthBuilder = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('minLength')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.minLengthError)
        .setGuideMessage(ValidationLocalizeKeys.minLengthGuide)
