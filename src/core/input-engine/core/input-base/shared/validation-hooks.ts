import { IEvents } from '@core/framework/events/events.types'

/**
 * Runs custom onAfterValidation hook if available
 */
export const runAfterValidationHook = <T extends IEvents>(data: T): void => {
    data?.fieldRef?.input?.onAfterValidation?.()
}

/**
 * Handles validation errors by logging them
 */
export const handleValidationError = <T extends IEvents>(
    data: T,
    context: { name: string },
    functionName: string,
    error: any
): void => {
    data?.fieldRef?.input.message('critical', context.name, `${functionName} ${error}`)
}
