// get-data.ts

import { FieldValuesTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFormy } from '../formy-base.types'

/**
 * Retrieves the data from the Formy instance.
 * @returns A record containing field values.
 */
export function getData(this: IFormy) {
    const output: Record<string, FieldValuesTypes> = {}
    for (const f of this.fields) {
        const value = f.getValue()
        if (!value || value === null) continue
        output[f.name] = value
    }
    return output
}
