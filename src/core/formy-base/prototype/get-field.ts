// get-field.ts

import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { IFormy } from '../formy-base.types'

/**
 * Retrieves a field by its name from the Formy instance.
 * @param fieldName - The name of the field to retrieve.
 * @returns The field if found, otherwise undefined.
 */
export function getField(this: IFormy, fieldName: string) {
    return this.fields.find((field: IFieldInput) => field.name === fieldName)
}
