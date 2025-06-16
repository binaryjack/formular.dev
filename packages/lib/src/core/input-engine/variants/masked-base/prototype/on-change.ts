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
    const inputValue = inputElement.value

    console.log('📍 Before processing', { oldValue, oldCursorPos, inputValue })

    // Count digits before cursor position in the current input
    const digitsBeforeCursor = inputValue.slice(0, oldCursorPos).replace(/\D/g, '').length

    const rawValue = inputValue.replace(/\D/g, '') // Remove non-numeric characters
    const formattedValue = processMaskedValue(this.mask, rawValue)
    console.log('🔄 After processing', { rawValue, formattedValue, digitsBeforeCursor })

    if (formattedValue === undefined || formattedValue === '') {
        this.input.valueManager.setValue(this as unknown as IExtendedInput, null)
        inputElement.value = ''
    } else {
        // For masked inputs, only update the display value
        inputElement.value = formattedValue

        // Store the raw formatted value in a custom property
        ;(this as any)._maskedValue = formattedValue

        // Calculate new cursor position based on digit count
        const newCursorPos = findPositionAfterNthDigit(formattedValue, digitsBeforeCursor)

        console.log('🎯 Cursor positioning', {
            digitsBeforeCursor,
            newCursorPos,
            formattedValue
        })

        requestAnimationFrame(() => {
            inputElement.setSelectionRange(newCursorPos, newCursorPos)
        })
    }

    if (onChangedHandle) onChangedHandle(this as unknown as IExtendedInput)
}

/**
 * Finds the position after the nth digit in a formatted string
 */
function findPositionAfterNthDigit(formattedValue: string, digitCount: number): number {
    if (digitCount === 0) return 0

    let foundDigits = 0
    for (let i = 0; i < formattedValue.length; i++) {
        if (/\d/.test(formattedValue[i])) {
            foundDigits++
            if (foundDigits === digitCount) {
                return i + 1
            }
        }
    }

    // If we didn't find enough digits, return the end
    return formattedValue.length
}

// ...existing code...
