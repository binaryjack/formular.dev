/**
 * Parses data object and populates form fields with values
 * Maps object keys to field names and updates field values
 */
import type { IFormular } from '../formular-base.types'

export function parse<T extends object>(this: IFormular<T>, data: T): void {
    if (!data || typeof data !== 'object') {
        return
    }

    Object.entries(data).forEach(([fieldName, value]) => {
        const field = this.getField(fieldName)
        if (field) {
            field.input.value = value
        }
    })
}
