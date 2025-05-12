import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { ICheckBoxBaseInputProperties } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInputProperties } from '@core/input-engine/variants/click-base/click-base-input.types'
import {
    IDrawerBaseInput,
    IDrawerBaseInputProperties
} from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { IOptionBaseInputProperties } from '@core/input-engine/variants/option-based/option-base-input.types'
import { IRadioBaseInputProperties } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { ISelectBaseInputProperties } from '@core/input-engine/variants/select-base/select-base-input.types'
import { ITextBaseInput } from '@core/input-engine/variants/text-base/text-base-input.types'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IFieldStyleProperties,
    IStyleManager
} from '@core/managers/style-manager/style-manager.types'
import {
    ITrackingManager,
    TrackingType
} from '@core/managers/tracking-manager/tracker-manager.types'
import {
    IValidationManager,
    IValidationStrategyData
} from '@core/managers/validation-manager/validation-manager.types'
import {
    IValueManager,
    IValueManagerProperties
} from '@core/managers/value-manager/value-manager.types'
import { IInitilizationCheckResult } from './prototype/check-initialized'

/**
 * Should be the root base of a field's properties
 */
export interface IInputProperties extends IFieldDescriptor {
    [key: string]: any
    id: number
    name: string
    label: string

    enabled: boolean
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean

    value: FieldDataTypes
    originalValue: FieldDataTypes

    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Core methods */
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes

    setFocus: () => void
    clear: () => void
    enable: (enabled: boolean) => void

    hasChanges: (callback: () => void) => void
    handleValidation: <T extends IEvents>(event?: T, data?: IValidationStrategyData) => void

    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void

    /** Dependency accessors */
    domManager: IDomManager<HTMLInputElement>
    drawer: IDrawerBaseInput
    styleManager: IStyleManager
    notificationManager: INotificationManager
    trackingManager: ITrackingManager
    validationManager: IValidationManager
    vlaueManager: IValueManager
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IInput = IInputBase & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IInputBase extends IInputProperties, IInitializableDependency {
    new (descriptor: IFieldDescriptor): IInputBase

    /** initializer builders */
    initializeProperties: (descriptor: IFieldDescriptor) => void
    checkInitialized: () => IInitilizationCheckResult
    useDomManager: (DomManagerInstance?: IDomManager<HTMLInputElement>) => IInputBase
    useNotificationManager: (notifierInstance?: INotificationManager) => IInputBase
    useTrackingManager: (trackerInstance?: ITrackingManager) => IInputBase
    useValidationManager: (validationStrategyInstance?: IValidationManager) => IInputBase
    useValueManager: (valueStrategyInstance?: IValueManager) => IInputBase
    useDrawerManager: (drawerableInstance?: IDrawerBaseInput) => IInputBase
    useStyleManager: (stylerInstance?: IStyleManager) => IInputBase
}

export interface IExtendedInputBase extends IInitializableDependency {
    input: IInputBase
}

export interface IExtendedInput
    extends IFieldStyleProperties,
        IOptionBaseInputProperties,
        IDrawerBaseInputProperties,
        IClickBaseInputProperties,
        ICheckBoxBaseInputProperties,
        IRadioBaseInputProperties,
        ISelectBaseInputProperties,
        IValueManagerProperties,
        ITextBaseInput,
        IExtendedInputBase,
        IInitializableDependency {
    handleOnClear: any
    // getOptionByValue: (value: string) => IOptionItem | null
    // tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    // handleOnChanged: <T extends IEvents>(data?: T) => void
    // handleOnClick: <T extends IEvents>(data?: T) => void
    // getOptionById: (id: string) => IOptionItem | null
}
