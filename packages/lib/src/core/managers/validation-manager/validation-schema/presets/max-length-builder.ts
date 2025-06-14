import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MaxLengthBuilder = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('maxLength')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.maxLengthError)
        .setGuideMessage(ValidationLocalizeKeys.maxLengthGuide)
