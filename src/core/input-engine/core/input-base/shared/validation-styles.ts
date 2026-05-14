import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { aria } from '../../accessibility/arias'

/**
 * Updates style manager with validation states
 */
export const updateValidationStyles = <T extends IEvents>(
    data: T,
    results: IValidationResult[]
): void => {
    if (!data?.fieldRef?.input?.styleManager) return

    const isValid = results.every((result) => result.state)
    const hasErrors = results.some((result) => !result.state)

    data.fieldRef.input.styleManager.update('valid', isValid)
    data.fieldRef.input.styleManager.update('errors', hasErrors)
}

/**
 * Updates ARIA attributes for accessibility
 */
export const updateAriaAttributes = <T extends IEvents>(data: T, isValid: boolean): void => {
    if (!data?.fieldRef?.input?.domManager || !data?.fieldRef?.input?.id) return

    data.fieldRef.input.domManager.dmUpdateAria(
        data.fieldRef.input.id.toString(),
        aria('invalid', isValid ? 'false' : 'true')
    )
}
