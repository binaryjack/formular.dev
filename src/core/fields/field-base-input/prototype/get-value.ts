import { FieldValuesTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../field-input-base-types'

/**
 * Retrieves the value of the field input using the associated value strategy.
 *
 * @remarks
 * This method utilizes the `valueStrategy` property of the field input to
 * obtain the current value. If no value strategy is defined, it will return `null`.
 *
 * @example
 * ```typescript
 * const value = fieldInput.get();
 * console.log(value); // Outputs the value retrieved by the value strategy or null
 * ```
 *
 * @returns The value of the field input as `FieldValuesTypes` or `null` if no value strategy is defined.
 */
export const getValue = function (this: IFieldInput) {
    return this._valueStrategy?.getValue() as FieldValuesTypes | null
    /** Let this comments below in order to debug when needed */
    // const output = this.valueStrategy?.getValue(this) as FieldValuesTypes | null
    // console.log(output)
    // return output
}
