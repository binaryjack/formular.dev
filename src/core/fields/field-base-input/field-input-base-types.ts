import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { FieldValuesTypes } from '@dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@dependency/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { ITracker, ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidator } from '@core/validation-strategy/validation-strategy.types'
import { IEvents } from '../../events/events.types'
import { IValueStrategy } from '../../value-strategy/value-strategy.types'
import { IDrawerBaseInput } from '../drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '../field-state-style/field-state-style.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase &
    IFieldDescriptor &
    IDommable<HTMLInputElement> &
    IValueStrategy &
    INotifiableEntity &
    ITracker

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor): IFieldInput
    originalValue: FieldValuesTypes | null
    enabled: boolean
    _valueStrategy?: IValueStrategy
    _notifier?: INotifiableEntity
    _drawerable?: IDrawerBaseInput
    _style?: IFieldStateStyle
    _validator?: IValidator

    initializeEvents: () => void
    initializeFieldProperties: (descriptor: IFieldDescriptor) => void

    hasChanges: (callback: () => void) => void
    setFocus: () => void
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    focus: () => void

    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
    handleValidation: <T extends IEvents>(event?: T) => void

    setValue: (value: Omit<FieldValuesTypes, 'object' | 'INDate' | 'DateObject'> | null) => void
    getValue: () => FieldValuesTypes | null

    initializeTracking: (providers?: ITrackingOutputProvider[]) => void
    initializeValueStrategy: (providers?: ITrackingOutputProvider[]) => void
}
