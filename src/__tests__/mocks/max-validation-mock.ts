import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const maxValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('max')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(`This field requires a value that must not be greater than |data1|!`)
        .setGuideMessage(`Please enter a value less than |data1|.`)
