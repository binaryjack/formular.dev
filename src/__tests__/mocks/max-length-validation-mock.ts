import { conventions } from '@components/context/conventions/conventions'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const maxLengthValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('maxLength')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(
            `This field requires a value with a length of at most ${conventions.tokens.validationDataToken1} characters!`
        )
        .setGuideMessage(
            `Please enter a value with less than ${conventions.tokens.validationDataToken1} characters.`
        )
