import { IEvents } from '@core/framework/events/events.types'
import { IExtendedInput } from '../input-base.types'

/**
 * Checks if validation should be interrupted by custom onBeforeValidation hook
 */
export const shouldInterruptByBeforeValidation = <T extends IEvents>(
    data: T,
    functionName: string
): boolean => {
    if (
        data?.fieldRef?.input?.onBeforeValidation &&
        !data?.fieldRef?.input?.onBeforeValidation?.()
    ) {
        data?.fieldRef?.input.message(
            'info',
            functionName,
            `${functionName} validation was interrupted by custom onBeforeValidation`
        )
        return true
    }
    return false
}

/**
 * Checks if validation should be interrupted by formular validateOnFirstSubmit setting
 */
export const shouldInterruptByFirstSubmitRule = <T extends IEvents>(
    data: T,
    functionName: string
): boolean => {
    if (data?.fieldRef?.input?.formular?.validateOnFirstSubmit) {
        data?.fieldRef?.input.message(
            'info',
            functionName,
            `${functionName} validation was interrupted by the formular validationOnFirstSubmit property`
        )
        return true
    }
    return false
}

/**
 * Checks if required field data is missing
 */
export const isRequiredDataMissing = <T extends IEvents>(data: T): boolean => {
    return data?.fieldRef?.input?.name === undefined || data?.fieldRef?.input?.value === undefined
}

/**
 * Checks if validation manager is available
 */
export const hasValidationManager = <T extends IEvents>(
    data: T,
    context: IExtendedInput,
    functionName: string
): boolean => {
    if (!data?.fieldRef?.input?.validationManager) {
        console.warn('handleValidation', context)
        return false
    }

    if (!data?.fieldRef?.input.validationManager) {
        data?.fieldRef?.input.message(
            'critical',
            context.name,
            `${functionName} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy at the initialization of the field. process ended`
        )
        return false
    }
    return true
}
