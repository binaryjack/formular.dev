/**
 * Updates a specific field's value
 */
import type { IFormular } from '../formular-base.types'

export function updateField<T extends object>(
    this: IFormular<T>,
    fieldName: string,
    value: any
): void {
    const field = this.getField(fieldName)
    if (field) {
        field.input.value = value
        field.input.isDirty = true
        field.input.isPristine = false
        this.isDirty = true
    }
}
