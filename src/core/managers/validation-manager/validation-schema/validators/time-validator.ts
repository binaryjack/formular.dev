import {
    IValidationConstraintBuilder,
    ValidationConstraintBuilder
} from '../../constraint-builder/validation-constraint-builder'
import { GenericValidationBuilder } from '../../generic-validation-builder/generic-validation-builder'
import { ValidationLocalizeKeys } from '../validation.localize.keys'
import { timePattern } from '../validation.regex.patterns'

export const timeValidator = (name: string, required: boolean = true) => {
    const constraints: IValidationConstraintBuilder<any>[] = []
    if (required) {
        constraints.push(
            new ValidationConstraintBuilder<boolean>('required')
                .setConstraint(true)
                .setName(name)
                .setErrorMessage(ValidationLocalizeKeys.timeError)
                .setGuideMessage(ValidationLocalizeKeys.timeGuide)
        )
    }

    // Time pattern validation
    constraints.push(
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(timePattern)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.timeError)
            .setGuideMessage(ValidationLocalizeKeys.timeGuide)
    )

    // Length validation for time format (HH:MM or HH:MM:SS)
    constraints.push(
        new ValidationConstraintBuilder<number>('minLength')
            .setConstraint(5)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.timeError)
            .setGuideMessage(ValidationLocalizeKeys.timeGuide)
    )

    constraints.push(
        new ValidationConstraintBuilder<number>('maxLength')
            .setConstraint(8)
            .setName(name)
            .setErrorMessage(ValidationLocalizeKeys.timeError)
            .setGuideMessage(ValidationLocalizeKeys.timeGuide)
    )

    return new GenericValidationBuilder().setConstraints(constraints)
}
