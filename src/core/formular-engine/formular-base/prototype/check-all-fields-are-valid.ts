// validate-all.ts

import { IFormular } from '../formular-base.types'

/**
 * Validates all fields in the Formy instance.
 */
export async function checkAllFieldsAreValid<T extends object>(
    this: IFormular<T>
): Promise<boolean> {
    const results = await new Promise<boolean>((resolve) => {
        const results: boolean[] = []
        for (const fld of this.fields) {
            results.push(fld.input.isValid)
        }
        this.isValid = results?.every((o) => o) ?? false
        resolve(this.isValid)
    })
    return results
    // this.observers.trigger()
}
