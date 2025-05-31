import { conventions } from '@components/context/conventions/conventions'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const minLengthValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('minLength')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(
            `This field requires a value with a length of at least ${conventions.tokens.validationDataToken1} characters!`
        )
        .setGuideMessage(
            `Please enter a value with more than ${conventions.tokens.validationDataToken1} characters.`
        )
        .build()
