// get-field.ts

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormular } from '../formular-base.types'

/**
 * Retrieves a field by its name from the Formy instance.
 * @param fieldName - The name of the field to retrieve.
 * @returns The field if found, otherwise undefined.
 */
export function getField<T extends object>(this: IFormular<T>, fieldName: string) {
    return this.fields.find((field: IExtendedInput) => field.input.name === fieldName)
}
