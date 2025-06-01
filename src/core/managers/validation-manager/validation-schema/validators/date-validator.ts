import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { dateIso8601Pattern } from '../validation.regex.patterns'

export const dateValidator = (
    name: string,
    required: boolean = true,
    minDate?: Date,
    maxDate?: Date
) => {
    const constraints: IValidationConstraintBuilder<any>[] = []

    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.dateError)
                .setGuideMessage(ValidationLocalizeKeys.dateGuide)
        )
    }

    // Date pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(dateIso8601Pattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.dateError)
            .setGuideMessage(ValidationLocalizeKeys.dateGuide)
    )

    // Min date validation
    if (minDate) {
        constraints.push(
            new ValidationConstraintBuilder<number>('min')
                .setConstraint(minDate.getTime())
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.dateError)
                .setGuideMessage(ValidationLocalizeKeys.dateGuide)
        )
    }

    // Max date validation
    if (maxDate) {
        constraints.push(
            new ValidationConstraintBuilder<number>('max')
                .setConstraint(maxDate.getTime())
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.dateError)
                .setGuideMessage(ValidationLocalizeKeys.dateGuide)
        )
    }

    return new GenericValidationBuilder().setConstraints(constraints)
}
