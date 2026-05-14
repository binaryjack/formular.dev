/**
 * Clears all form field values and resets validation state
 */
import type { IFormular } from '../formular-base.types'

export function clear<T extends object>(this: IFormular<T>): void {
    this.fields.forEach((field) => {
        field.input.value = null
        field.input.objectValue = null
        field.input.errors = []
        field.input.isDirty = false
        field.input.isPristine = true
    })

    this.isDirty = false
    this.isValid = true
}
