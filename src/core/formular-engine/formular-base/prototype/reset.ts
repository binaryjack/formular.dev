/**
 * Resets form to its original state with default values
 */
import type { IFormular } from '../formular-base.types'

export function reset<T extends object>(this: IFormular<T>): void {
    this.fields.forEach((field) => {
        field.input.value = field.input.defaultValue
        field.input.objectValue = null
        field.input.errors = []
        field.input.isDirty = false
        field.input.isPristine = true
    })

    this.isDirty = false
    this.isValid = true
}
