// get-field.ts

import { IInput } from '@core/field-engine/core/input-base/input-base.types'
import { IFormy } from '../formy-base.types'

/**
 * Retrieves a field by its name from the Formy instance.
 * @param fieldName - The name of the field to retrieve.
 * @returns The field if found, otherwise undefined.
 */
export function getField(this: IFormy, fieldName: string) {
    return this.fields.find((field: IInput) => field.name === fieldName)
}
