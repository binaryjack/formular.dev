import { ValidationConstraintBuilder } from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'

/** base required date validator between min and max dates */
export const minMaxDatesBuilder = (name: string, minDate: number, maxDate: number) =>
    new GenericValidationBuilder().setConstraints([
        new ValidationConstraintBuilder<number>('min')
            .setConstraint(minDate)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.dateError)
            .setGuideMessage(ValidationLocalizeKeys.dateGuide),
        new ValidationConstraintBuilder<number>('max')
            .setConstraint(maxDate)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.dateError)
            .setGuideMessage(ValidationLocalizeKeys.dateGuide)
    ])
