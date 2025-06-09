import { conventions } from '@components/context/conventions/conventions'
import { DateObject } from '@components/date-picker/core/date-object.object'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager, OutputPurposeType } from '../value-manager.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(
    this: IValueManager,
    field: IExtendedInput,
    purpose?: OutputPurposeType
): unknown | null {
    const purposeType = purpose ?? 'all'

    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(field.input.type))
    // console.log('getValue', field.input.type, strategy)
    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${field.input.type} `)
        return
    }
    try {
        const value = strategy.getter(field)

        switch (field.input.type) {
            case 'select':
                return (value as unknown as IOptionItem)?.value

            case 'date':
                if (purposeType === 'validation') {
                    const dte = new DateObject()
                    if (!dte || value === null || value === undefined) {
                        return null
                    }
                    dte?.setFromString?.(value as string, conventions.dataTypes.date.formatDisplay)
                    return dte?.toDate?.().getTime()
                }
                return value
            // return (value as unknown as IOptionItem)?.sequenceId
            case 'radio':
            default:
                return value
        }
    } catch (e) {
        console.error(
            `PARSING ERROR FOR TYPE ${field.input.type} in field: ${field.input.name} `,
            e
        )
    }
}
