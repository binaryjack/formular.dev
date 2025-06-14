import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

/** base required name validator between 3 and 50 length*/
export const minMaxNameBuilder = (name: string) =>
    new GenericValidationBuilder().setConstraints([
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(3)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.nameError)
            .setGuideMessage(ValidationLocalizeKeys.nameGuide),
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(50)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.nameError)
            .setGuideMessage(ValidationLocalizeKeys.nameGuide)
    ])
