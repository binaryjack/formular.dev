/**
 * Clears a specific field's value and validation errors
 */
import type { IFormular } from '../formular-base.types'

export function clearField<T extends object>(this: IFormular<T>, fieldName: string): void {
    const field = this.getField(fieldName)
    if (field) {
        field.value = null
        field.input.objectValue = null
        field.errors = []
        field.input.isDirty = false
        field.input.isPristine = true
    }
}
