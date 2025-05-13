// validate-all.ts

import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IFormular } from '../formular-base.types'

/**
 * Validates all fields in the Formy instance.
 */
export async function validateAll(this: IFormular) {
    return await new Promise((resolve) => {
        const results: IValidationResult[] = []
        for (const fld of this.fields) {
            if (!fld.input.shouldValidate) {
                continue
            }

            // results.push(...fld.))
        }
        this.isValid = results?.every((o) => o.state) ?? false
        resolve(!results)
    })

    // this.observers.trigger()
}
