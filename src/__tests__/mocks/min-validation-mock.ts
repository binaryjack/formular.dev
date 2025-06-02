import { conventions } from '@components/context/conventions/conventions'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const minValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('min')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(
            `This field requires a value that must not be less than ${conventions.tokens.validationDataToken1}!`
        )
        .setGuideMessage(
            `Please enter a value greater than ${conventions.tokens.validationDataToken1}.`
        )
