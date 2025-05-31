import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MinBuilder = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('min')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.minError)
        .setGuideMessage(ValidationLocalizeKeys.minGuide)
