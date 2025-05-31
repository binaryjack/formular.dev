import { conventions } from '@components/context/conventions/conventions'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

export const maxValidationMock = (name: string, value: number) =>
    new ValidationConstraintBuilder<number>('max')
        .setConstraint(value)
        .setName(name)
        .setErrorMessage(
            `This field requires a value that must not be greater than ${conventions.tokens.validationDataToken1}!`
        )
        .setGuideMessage(
            `Please enter a value less than ${conventions.tokens.validationDataToken1}.`
        )
        .build()
