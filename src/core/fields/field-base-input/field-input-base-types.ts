import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'

import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@dependency/schema/field-schema/field.schema.types'

import { IDommable } from '@core/dommable/dommable.types'

import { ITracker, ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IEvents } from '../../events/events.types'
import { IParserStrategy, IValueStrategy } from '../../value-strategy/value-strategy.types'
import { IDrawerBaseInput } from '../drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '../field-state-style/field-state-style.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase &
    Omit<IFieldDescriptor, 'validationOptions' | 'options'> &
    IDommable<HTMLInputElement> &
    INotifiableEntity &
    ITracker &
    IValidationStrategy &
    IValueStrategy

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor): IFieldInput
    originalValue: IFValueTypes
    enabled: boolean
    _drawerable?: IDrawerBaseInput
    _style?: IFieldStateStyle

    initializeEvents: () => void
    initializeFieldProperties: (descriptor: IFieldDescriptor) => void

    initializeDommable: () => void
    initializeTracking: (providers?: ITrackingOutputProvider[]) => void
    initializeValueStrategy: (providers?: ITrackingOutputProvider[]) => void
    initializeValidationStrategy: (...parsers: IParserStrategy<any>[]) => void
    initializeStyle: () => void

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

    /** To remove */
    setValue: (value: IFValueTypes) => void
    getValue: () => IFValueTypes
}
