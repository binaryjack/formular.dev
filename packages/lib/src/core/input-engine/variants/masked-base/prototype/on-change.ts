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
    // DEBUG: Add console log to verify this code is running
    console.log('🔍 DEBUG: onChange called in masked-base input', {
        target: e.target,
        mask: this.mask
    })

    const inputElement = e.target as HTMLInputElement
    const rawValue = inputElement.value.replace(/\D/g, '') // Remove non-numeric characters
    const formattedValue = processMaskedValue(this.mask, rawValue)

    // this.input.cursorPosition = inputElement.selectionStart ?? 0
    // console.log('onChange this.input.cursorPosition ', this.input.cursorPosition)
    if (formattedValue === undefined || formattedValue === '') {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, null)
    } else {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, formattedValue)
    }

    if (onChangedHandle) onChangedHandle(this as unknown as IExtendedInput)
}
