// get-data.ts

import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IFormular } from '../formular-base.types'

/**
 * Retrieves the data from the Formy instance.
 * @returns A record containing field values.
 */
export function getData(this: IFormular) {
    const output: Record<string, InputDataTypes> = {}
    for (const f of this.fields) {
        const value = f.input.valueManager.getValue()
        if (!value || value === null) continue
        output[f.input.name] = value
    }
    return output
}
