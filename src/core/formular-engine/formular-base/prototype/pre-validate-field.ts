/**
 * Pre-validates a specific field before user interaction completes
 * Useful for inline validation during typing
 */
import type { IFormular } from '../formular-base.types'

export function preValidateField<T extends object>(this: IFormular<T>, fieldName: string): boolean {
    const field = this.getField(fieldName)
    if (!field) {
        return false
    }

    // Pre-validation logic - can be extended
    return field.input.isValid
}
