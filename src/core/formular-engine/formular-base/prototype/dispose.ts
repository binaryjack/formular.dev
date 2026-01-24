/**
 * Disposes all fields, clears references, and prepares for garbage collection
 */
import type { IFormular } from '../formular-base.types'

export function dispose<T extends object>(this: IFormular<T>): void {
    // Clean up all fields
    this.fields.forEach((field) => {
        field.input.value = null
        field.input.objectValue = null
        field.input.errors = []
        field.input.guides = []
    })

    // Clear arrays
    this.fields = []
    this.originFields = []

    // Reset state
    this.isValid = false
    this.isDirty = false
}
