import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const PatternBuilder = (name: string, value: RegExp) =>
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.patternError)
        .setGuideMessage(ValidationLocalizeKeys.patternGuide)
