import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const minLengthValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('minLength')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(
            `This field requires a value with a length of at least |data1| characters!`
        )
        .setGuideMessage(`Please enter a value with more than |data1| characters.`)
