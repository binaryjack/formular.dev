import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { newEvent } from '../../events/events.types'
import { IValueStrategy } from '../value-strategy.types'

export const setValue = function (
    this: IValueStrategy,
    value: Omit<IFValueTypes, 'object' | 'INDate' | 'DateObject'> | null
) {
    if (this.field.type === 'checkbox') {
        if (this.field._clickable) this.field._clickable.checked = value as boolean
        this.field.dmSetChecked(this.field.id.toString(), value as boolean)
        this.field.value = value
    } else if (this.field.type === 'radio') {
        const radioItem = this.field._optionable?.tryGetOptionByIdOrValue(
            value as string,
            value as string
        )
        if (!radioItem) {
            this.field.internalWarning(
                'IFieldInput.setValue',
                `Unable to find the option for this field:  type: ${this.field.type}, name: ${this.name} option Id or Value: ${value as string}`
            )
            return
        }
        this.field.value = radioItem.value
        if (this.field._optionable) this.field._optionable.selectedOptionId = radioItem.sequenceId
        this.field.dmSetChecked(radioItem.id, value as boolean)
    } else if (this.field.type === 'select') {
        const optionById = this.field._optionable?.tryGetOptionBySequenceIdThenIdOrValue(
            value as number,
            value as string,
            value as string
        )
        if (!optionById) {
            this.field.internalWarning(
                'IFieldInput.setValue',
                `Unable to find the option for this field:  type: ${this.field.type}, name: ${this.name} option Id or Value: ${value as string}`
            )
            return
        }
        this.field.value = optionById.id
        if (this.field._optionable) this.field._optionable.selectedOptionId = optionById.sequenceId
        this.field.dmSetValue(this.field.id.toString(), this.field.value as string)
    } else {
        this.field.value = value
        this.field.dmSetValue(this.field.id.toString(), this.field.value as string)
    }

    this.field._style?.fieldStateStyle.update(
        'dirty',
        this.field.originalValue !== this.field.value
    )

    this.field._notifier?.notify(
        'onChange',
        newEvent(this.name, setValue.name, 'onChange', `field.${setValue.name}`)
    )

    // this.observers.trigger()
}
