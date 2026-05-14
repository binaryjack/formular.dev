import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const requiredDataValidationMock = (name: string, value: boolean) =>
    new ValidationConstraintBuilder<boolean>('required')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(`This field is required and cannot be empty!`)
        .setGuideMessage(`Please provide a value for this field.`)
