import { onChangedHandle } from '@core/input-engine/core/input-base/events/on-changed-handle'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { processMaskedValue } from '../core/process-masked-value'
import { IMaskedBaseInput } from '../masked-base-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IMaskedBaseInput - The context of the field input instance.
 * @param e - The change event from the input element.
 *
 * Processes the input value and applies the mask formatting.
 */
export const onChange = function (this: IMaskedBaseInput, e: Event) {
    console.log('🔥 onChange called', { event: e, mask: this.mask })
    const inputElement = e.target as HTMLInputElement
    const oldValue =
        (this.input.valueManager.getValue(this as unknown as IExtendedInput) as string) || ''
    const oldCursorPos = inputElement.selectionStart ?? 0
    console.log('📍 Before processing', { oldValue, oldCursorPos, inputValue: inputElement.value })

    const rawValue = inputElement.value.replace(/\D/g, '') // Remove non-numeric characters
    const formattedValue = processMaskedValue(this.mask, rawValue)
    console.log('🔄 After processing', { rawValue, formattedValue })

    if (formattedValue === undefined || formattedValue === '') {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, null)
        inputElement.value = ''
    } else {
        // For masked inputs, only update the display value
        // Don't use valueManager.setValue to avoid date parsing issues
        inputElement.value = formattedValue

        // Store the raw formatted value in a custom property to avoid value manager processing
        ;(this as any)._maskedValue = formattedValue

        // Calculate and set new cursor position
        const newCursorPos = calculateNewCursorPosition(
            oldValue,
            formattedValue,
            oldCursorPos,
            this.mask
        )
        requestAnimationFrame(() => {
            inputElement.setSelectionRange(newCursorPos, newCursorPos)
        })
    }

    if (onChangedHandle) onChangedHandle(this as unknown as IExtendedInput)
}

/**
 * Calculates the new cursor position after formatting
 */
function calculateNewCursorPosition(
    oldValue: string,
    newValue: string,
    oldCursorPos: number,
    mask: string
): number {
    // If the new value is shorter or same length, keep relative position
    if (newValue.length <= oldValue.length) {
        return Math.min(oldCursorPos, newValue.length)
    }

    // If new value is longer (separator was added), adjust cursor position
    let newPos = oldCursorPos
    let separatorsAdded = 0

    // Count how many separators were added before the cursor position
    for (let i = 0; i < Math.min(newPos, newValue.length); i++) {
        if (i < mask.length && mask[i] !== '#' && newValue[i] === mask[i]) {
            // This is a separator that wasn't in the old value at this position
            if (i >= oldValue.length || oldValue[i] !== mask[i]) {
                separatorsAdded++
            }
        }
    }

    return Math.min(newPos + separatorsAdded, newValue.length)
}
