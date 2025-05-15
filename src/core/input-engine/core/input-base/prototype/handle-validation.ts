import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IExtendedInput } from '../input-base.types'

/**
 * Handles the validation process for a field input.
 *
 * @param this - The current instance of the field input implementing the `IFieldInput` interface.
 * @param origin - Optional parameter representing the origin of the validation, which is cast to `IValidationOrigin`.
 *
 * @remarks
 * This function invokes the `validate` method on the current instance, passing a `validator` and the
 * optional `validationOrigin` derived from the `origin` parameter.
 */
export const handleValidation = function <T extends IEvents>(this: IExtendedInput, data?: T) {
    console.log(
        '----handleValidation---',
        data?.fieldRef?.input?.name,
        data?.fieldRef?.input?.value
    )
    if (data?.fieldRef?.input?.name === undefined || data?.fieldRef?.input?.value === undefined) {
        return
    }

    let results: IValidationResult[] = []
    console.log('----handleValidation', data?.fieldRef?.name, data?.fieldRef?.input?.value)

    if (!data?.fieldRef?.input?.validationManager) {
        console.warn('handleValidation', this)
        return
    }

    if (!data?.fieldRef?.input.validationManager) {
        data?.fieldRef?.input.message(
            'critical',
            this.name,
            `${handleValidation.name} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy ant the initializazion of the field. process ended`
        )
        return
    }

    results = data?.fieldRef?.input.validationManager.validate(data?.fieldRef) ?? []

    // keep the validation results for the field
    data.fieldRef.input.validationResults = results

    data?.fieldRef?.input.styleManager?.update(
        'valid',
        results.every((result) => result.state)
    )
    data.fieldRef?.input.styleManager?.update(
        'errors',
        results.some((result) => !result.state)
    )

    return results
}
