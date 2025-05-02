import { IDommable } from '@core/dommable/dommable.types'
import { IFieldStateStyle } from '@core/fields/field-state-style/field-state-style.types'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { ITracker, TrackingType } from '@core/tracker/tracker.types'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../field-input-base-types'

export interface IAccessors {
    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Dependency accessors */
    dom(): IDommable<HTMLInputElement> | undefined
    notifier: () => INotifiableEntity | undefined
    style: () => IFieldStateStyle | undefined
    track: () => ITracker | undefined
    validationStrategy: () => IValidationStrategy | undefined
    valueStrategy: () => IValueStrategy | undefined

    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
}

export const Accessors = (field: IFieldInput): IAccessors => {
    return {
        dom: domAccessor(field),
        notifier: notifierAccessor(field),
        style: styleAccessor(field),
        track: trackAccessor(field),
        validationStrategy: validationStrategyAccessor(field),
        valueStrategy: valueStrategyAccessor(field),
        setValue: setValueAccessor(field),
        getValue: getValueAccessor(field),
        message: messageAccessor(field)
    }
}

export const domAccessor = (field: IFieldInput) => (): IDommable<HTMLInputElement> | undefined => {
    if (!field._dom) {
        field.message('critical', field.name, '_dom must be initialized')
        return undefined
    }
    return field._dom
}
export const notifierAccessor = (field: IFieldInput) => (): INotifiableEntity | undefined => {
    if (!field._notifier) {
        field.message('critical', field.name, '_notifier must be initialized')
        return undefined
    }
    return field._notifier
}
export const styleAccessor = (field: IFieldInput) => (): IFieldStateStyle | undefined => {
    if (!field._style) {
        field.message('critical', field.name, '_style must be initialized')
        return undefined
    }
    return field._style
}
export const trackAccessor = (field: IFieldInput) => (): ITracker | undefined => {
    if (!field._tracker) {
        field.message('critical', field.name, '_tracker must be initialized')
        return undefined
    }
    return field._tracker
}
export const validationStrategyAccessor =
    (field: IFieldInput) => (): IValidationStrategy | undefined => {
        if (!field._validation) {
            field.message('critical', field.name, '_validation must be initialized')
            return undefined
        }
        return field._validation
    }
export const valueStrategyAccessor = (field: IFieldInput) => (): IValueStrategy | undefined => {
    if (!field?._value) {
        field.message('critical', field.name, '_value must be initialized')
        return undefined
    }
    return field._value
}

export const setValueAccessor = (field: IFieldInput) => (value: IFValueTypes) => {
    field.valueStrategy()?.setValue(value)
}
export const getValueAccessor = (field: IFieldInput) => (): IFValueTypes => {
    return field.valueStrategy()?.getValue() ?? null
}

export const messageAccessor =
    (field: IFieldInput) => (type: TrackingType, source: string, message: string) => {
        preExceptionHandler(field._tracker, type, source, message)
    }
