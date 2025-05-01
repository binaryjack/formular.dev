import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { ICheckBoxInput } from '../check-box-base-input.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: ICheckBoxInput): unknown | null {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(this.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${this.type} `)
        return
    }
    try {
        /** Factory */
        switch (strategy.fieldValueProperty) {
            case 'id':
                return strategy.method(this.id as IFValueTypes)
            case 'value':
            default:
                return strategy.method(this.value as IFValueTypes)
        }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.type} in field: ${this.name} `, e)
    }
}
