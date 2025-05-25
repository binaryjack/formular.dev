import { newEvent } from '@core/framework/events/new-event'
import { onChangedHandle } from '@core/input-engine/core/input-base/events/on-changed-handle'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { processMaskedValue } from '../core/process-masked-value'
import { IMaskedBaseInput } from '../masked-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const onChange = function (this: IMaskedBaseInput, e: Event) {
    const inputElement = e.target as HTMLInputElement
    const rawValue = inputElement.value.replace(/\D/g, '') // Remove non-numeric characters
    const formattedValue = processMaskedValue(this.mask, rawValue)

    this.input.cursorPosition = inputElement.selectionStart ?? 0

    if (formattedValue === undefined || formattedValue === '') {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, null)
    } else {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, formattedValue)
    }
    this.input?.notificationManager?.notify(
        'onUiUpdate',
        newEvent(
            this.input.name,
            onChange.name,
            'onUiUpdate',
            `field.option.label.${onChange.name}`,
            this.input.name,
            this as unknown as IExtendedInput
        )
    )
    if (onChangedHandle) onChangedHandle(this as unknown as IExtendedInput)
}
