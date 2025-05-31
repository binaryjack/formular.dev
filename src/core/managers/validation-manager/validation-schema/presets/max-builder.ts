import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const MaxBuilder = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('max')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.maxError)
        .setGuideMessage(ValidationLocalizeKeys.maxGuide)
