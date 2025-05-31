import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const patternValidationMock = (name: string, value: RegExp) =>
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(`This field requires a value matching the specified pattern!`)
        .setGuideMessage(`Please enter a value that matches the specified pattern.`)
        .build()
