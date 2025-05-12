// get-field.ts

import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormular } from '../formular-base.types'

/**
 * Retrieves a field by its name from the Formy instance.
 * @param fieldName - The name of the field to retrieve.
 * @returns The field if found, otherwise undefined.
 */
export function getField(this: IFormular, fieldName: string) {
    return this.fields.find((field: IInput) => field.name === fieldName)
}
