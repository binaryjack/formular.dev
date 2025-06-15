import { IMaskedBaseInput } from '../masked-base-input.types'

export const onKeyPress = function (this: IMaskedBaseInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key
    const currentValue = inputElement.value
    const cursorPos = inputElement.selectionStart ?? 0

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

    // Check if the key is valid for the current cursor position in the mask
    if (!isValidKeyForPosition(key, cursorPos, currentValue, this.mask)) {
        e.preventDefault()
    }
}

/**
 * Checks if a key is valid for the current cursor position based on the mask
 */
function isValidKeyForPosition(
    key: string,
    cursorPos: number,
    currentValue: string,
    mask: string
): boolean {
    // Find the next position in the mask that accepts input
    let maskPos = 0
    let valuePos = 0

    // Advance through the mask to find where this key would be inserted
    while (maskPos < mask.length && valuePos <= cursorPos) {
        if (mask[maskPos] === '#') {
            // This is a placeholder for numeric input
            if (valuePos === cursorPos) {
                // This is where the new character would go
                return /\d/.test(key)
            }
            valuePos++
        } else {
            // This is a separator character
            if (valuePos < currentValue.length && currentValue[valuePos] === mask[maskPos]) {
                valuePos++
            }
        }
        maskPos++
    }

    return false
}
