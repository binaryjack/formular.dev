import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../fieldInput.types'

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
