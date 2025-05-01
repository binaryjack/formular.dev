import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { ITextInput } from '../text-base-input.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: ITextInput): IFValueTypes {
    const strategy = this?.valueStrategies.find((s) => s.concernedTypes.includes(this.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${this.type} `)
        return null
    }
    try {
        /** Factory */
        switch (strategy.fieldValueProperty) {
            // case 'id':
            //     return strategy.method(this.id as FieldValuesTypes)
            // case 'selectedOptionId':
            //     return strategy.method(this._optionable?.selectedOptionId as FieldValuesTypes)
            case 'value':
            default:
                return strategy.method(this.value as IFValueTypes) as IFValueTypes
        }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.type} in field: ${this.name} `, e)
        return null
    }
}
