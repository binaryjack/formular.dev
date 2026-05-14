import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

export const RequiredBuilder = (name: string, value: boolean) =>
    new ValidationConstraintBuilder<boolean>('required')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(ValidationLocalizeKeys.requiredError)
        .setGuideMessage(ValidationLocalizeKeys.requiredGuide)
