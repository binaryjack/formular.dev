import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../fieldInput.types'

/**
 * Sets the value of the field input and updates its state, notifies observers,
 * and synchronizes the internal HTML element's value if applicable.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param value - The new value to set for the field input. It excludes types
 *                'object', 'INDate', and 'DateObject' from `FieldValuesTypes`,
 *                or can be `null`.
 *
 * @remarks
 * - Updates the `value` property of the field input.
 * - Updates the `dirty` state of the field based on whether the new value differs
 *   from the original value.
 * - Notifies observers of the 'changed' and 'validate' events with the appropriate
 *   field state.
 * - Triggers all registered observers.
 * - If the internal HTML element reference exists, synchronizes its value with
 *   the new field value.
 */
export const setValue = function (
    this: IFieldInput,
    value: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null
) {
    this.value = value

    this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

    this.notify('changed', {
        fieldName: this.name,
        fieldState: 'onChange'
    })

    this.notify('validate', {
        fieldName: this.name,
        fieldState: 'reset'
    })

    this.observers.trigger()

    if (!this.internalHTMLElementRef?.current) {
        return
    }
    this.internalHTMLElementRef.current.value = this.value as string
}
