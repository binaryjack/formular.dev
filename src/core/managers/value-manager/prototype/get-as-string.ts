import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

/**
 * Converts the current field input value to a string representation.
 *
 * @this IFieldInput - The context object that this function is bound to.
 * @returns {string | null} The value of the field input as a string, or `null` if the value is not a string.
 */
export const getAsString = function (this: IValueManager, field: IExtendedInput): string | null {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(this.input.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.input.type} `)
        return null
    }
    const valueOut = this.getValue(field)
    try {
        switch (field.input.type) {
            case 'number':
                return String(valueOut as string) as string | null
            case 'select':
            case 'radio':
            case 'checkbox':
                return valueOut ? '1' : ('0' as string | null)
            case 'date':
            case 'time':
                return JSON.stringify(valueOut) as string | null
            default:
                return valueOut as string | null
        }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.input.type} in field: ${this.input.name} `, e)
        return null
    }
}
