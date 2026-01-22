import { IMaskedBaseInput } from '../masked-base-input.types'

export const onKeyPress = function (this: IMaskedBaseInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key
    const currentValue = inputElement.value
    const cursorPos = inputElement.selectionStart ?? 0

    console.log('🔑 onKeyPress', { key, cursorPos, currentValue, mask: this.mask })

    // Store cursor position for later use
    this.input.cursorPosition = cursorPos

    // Allow control keys (backspace, delete, arrow keys, etc.)
    if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        [
            'Backspace',
            'Delete',
            'Tab',
            'Enter',
            'Escape',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End'
        ].includes(key)
    ) {
        return
    }

    // Only allow numeric input for our masks
    if (!/\d/.test(key)) {
        e.preventDefault()
        return
    }

    // Check if we can accept this digit at the current position
    if (!canAcceptDigitAtPosition(cursorPos, currentValue, this.mask)) {
        e.preventDefault()
    }
}

/**
 * Checks if a digit can be accepted at the current cursor position
 */
function canAcceptDigitAtPosition(cursorPos: number, currentValue: string, mask: string): boolean {
    // Count how many digits we currently have
    const currentDigits = currentValue.replace(/\D/g, '')

    // Count how many digit positions the mask allows
    const maxDigits = mask.split('').filter((char) => char === '#').length

    // If we're already at the maximum number of digits, reject
    if (currentDigits.length >= maxDigits) {
        return false
    }

    // Find the next available digit position in the mask after cursor
    let maskPos = 0
    let valuePos = 0

    // Map cursor position to mask structure
    while (valuePos < cursorPos && maskPos < mask.length) {
        if (mask[maskPos] === '#') {
            // This is a digit position
            if (valuePos < currentValue.length && /\d/.test(currentValue[valuePos])) {
                valuePos++
            }
            maskPos++
        } else {
            // This is a separator
            if (valuePos < currentValue.length && currentValue[valuePos] === mask[maskPos]) {
                valuePos++
            }
            maskPos++
        }
    }

    // Find the next digit position in the mask
    while (maskPos < mask.length) {
        if (mask[maskPos] === '#') {
            // Found a digit position - we can accept the input
            return true
        }
        maskPos++
    }

    // No more digit positions available
    return false
}
