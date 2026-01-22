// validate-all.ts

import { IFormular } from '../formular-base.types'

/**
 * Validates all fields in the Formular instance.
 *
 * @returns Promise that resolves to true if all fields are valid, false otherwise
 */
export async function checkAllFieldsAreValid<T extends object>(
    this: IFormular<T>
): Promise<boolean> {
    const result = await new Promise<boolean>((resolve) => {
        const validationResults: boolean[] = []

        for (const fld of this.fields) {
            validationResults.push(fld.input.isValid)
        }

        // Update form validity based on all field results
        this.isValid =
            validationResults.length > 0 ? validationResults.every((isValid) => isValid) : false

        resolve(this.isValid)
    })

    return result
    // this.observers?.trigger()
}
