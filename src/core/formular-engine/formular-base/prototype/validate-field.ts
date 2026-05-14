/**
 * Validates a specific field and updates its error state
 */
import type { IFormular } from '../formular-base.types'

export function validateField<T extends object>(this: IFormular<T>, fieldName: string): void {
    const field = this.getField(fieldName)
    if (!field) {
        return
    }

    // Validation logic would typically call the validation manager
    // This is a basic implementation that can be extended
    field.input.isValid = field.input.errors.length === 0
}
