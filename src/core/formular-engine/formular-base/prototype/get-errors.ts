/**
 * Gets all validation errors from all form fields
 */
import type { IFieldError } from '@core/framework/models/errors/i-field-error'
import type { IFormular } from '../formular-base.types'

export function getErrors<T extends object>(this: IFormular<T>): Record<string, IFieldError[]> {
    const errors: Record<string, any[]> = {}

    this.fields.forEach((field) => {
        if (field.input.errors && field.input.errors.length > 0) {
            errors[field.input.name] = field.input.errors
        }
    })

    return errors
}
