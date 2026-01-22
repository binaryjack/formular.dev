import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const hasValidationOptions = (input: IInputBase): boolean => {
    if (!input) return false

    if (!input.validationOptions) {
        input.message(
            'info',
            hasValidationOptions.name,
            `${input.name} has no validationOptions defined`
        )
        return false
    }

    if (Object.keys(input.validationOptions).length === 0) {
        input.message(
            'info',
            hasValidationOptions.name,
            `${input.name} has defined validationOptions but no validation strategies found`
        )

        return false
    }

    return true
}
