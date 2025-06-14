import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'

/**
 * Sets the busy state of an input field
 */
export const setFieldBusyState = <T extends IEvents>(data: T, isBusy: boolean): void => {
    data?.fieldRef?.input?.setInputBusy(isBusy)
}

/**
 * Stores validation results and updates field validity state
 */
export const storeValidationResults = <T extends IEvents>(
    data: T,
    results: IValidationResult[]
): void => {
    if (!data?.fieldRef?.input) return

    // Keep the validation results for the field
    data.fieldRef.input.validationResults = results
    data.fieldRef.input.isValid = results.every((result) => result.state)
}

/**
 * Logs validation debug information
 */
export const logValidationDebug = <T extends IEvents>(data: T): void => {
    console.log(
        '----handleValidation',
        data?.fieldRef?.dependencyName,
        data?.fieldRef?.input?.value
    )
}
