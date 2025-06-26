import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field-schema-types'
import { ICheckBoxBaseInputProperties } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInputProperties } from '@core/input-engine/variants/click-base/click-base-input.types'
import {
    IDrawerBaseInput,
    IDrawerBaseInputProperties
} from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import {
    IOptionBaseInput,
    IOptionBaseInputProperties
} from '@core/input-engine/variants/option-based/option-base-input.types'
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
    IValidationResult
} from '@core/managers/validation-manager/validation-manager.types'
import {
    IValueManager,
    IValueManagerProperties
} from '@core/managers/value-manager/value-manager.types'
import { IServiceManager } from '@core/types'

import { ICulture } from '@core/managers'
import { IInitilizationCheckResult } from './prototype/check-initialized'

export const SInputBase = Symbol.for('IInputBase')

/** This will probably need to be refactored as soon as I have the proof thats the configuration approach is correct */
export interface IServiceInjectableProperties {
    serviceManager: IServiceManager
    // Configured Delays
    inputDelay: number
    onValidateDelay: number
    onUiUpdateDelay: number
    observablesDelay: number
    // Configured Suffixes
    labelId: string
    describedById: string
    // Configured Date
    culture: ICulture

    onClickDelay: number
    onChangeDelay: number
}

/**
 * Should be the root base of a field's properties
 */
export interface IInputProperties extends IFieldDescriptor, IServiceInjectableProperties {
    [key: string]: any
    id: number
    name: string
    label: string

    enabled: boolean

    isBusy: boolean

    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    formular?: IFormular<any>
    value: InputDataTypes
    originalValue: InputDataTypes
    validationResults: IValidationResult[]

    // Manages the cursor position for masked inputs.
    cursorPosition: number | null
    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Core methods */
    setValue: (value: InputDataTypes) => void
    getValue: () => InputDataTypes

    setFocus: () => void
    clear: () => void
    enable: (enabled: boolean) => void

    hasChanges: (callback: () => void) => void

    handleValidation: <T extends IEvents | unknown>(data: T) => void
    handleValidationAsync: <T extends IEvents | unknown>(data: T) => Promise<IValidationResult[]>
    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
    handleOnKeyPress: <T extends IEvents>(data?: T) => void
    handleOnKeyUp: <T extends IEvents>(data?: T) => void
    refreshUi: (ref?: IInputBase | IExtendedInput) => void
    onBeforeValidation?: () => boolean
    onAfterValidation?: () => void
    setInputBusy: (isBusy: boolean) => void

    /** Dependency accessors */
    domManager: IDomManager<HTMLInputElement>
    drawer: IDrawerBaseInput
    styleManager: IStyleManager
    notificationManager: INotificationManager
    trackingManager: ITrackingManager
    validationManager: IValidationManager
    valueManager: IValueManager
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IInput = IInputBase & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IInputBase extends IInputProperties, IInitializableDependency {
    new (
        serviceManager: IServiceManager,
        descriptor: IFieldDescriptor | null,
        domManagerInstance: IDomManager<HTMLInputElement> | null,
        notifierInstance: INotificationManager | null,
        trackerInstance: ITrackingManager | null,
        validationManagerInstance: IValidationManager | null,
        valueManagerInstance: IValueManager | null,
        drawerBase: IDrawerBaseInput | null,
        styleManager: IStyleManager | null
    ): IInputBase

    /** initializer builders */
    initializeProperties: (descriptor: IFieldDescriptor) => void
    checkInitialized: () => IInitilizationCheckResult
    useDomManager: (domManagerInstance: IDomManager<HTMLInputElement>) => IInputBase
    useNotificationManager: (notifierInstance?: INotificationManager) => IInputBase
    useTrackingManager: (trackerInstance: ITrackingManager) => IInputBase
    useValidationManager: (validationStrategyInstance: IValidationManager) => IInputBase
    useValueManager: (valueStrategyInstance: IValueManager) => IInputBase
    useDrawerManager: (drawerBase: IDrawerBaseInput) => IInputBase
    useStyleManager: (styleManager: IStyleManager) => IInputBase
}

export const InputResolver = (field: IExtendedInput | IInputBase): IInputBase => {
    if (field.dependencyName === 'InputBase') {
        return field as IInputBase
    } else {
        return field.input as IInputBase
    }
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
        IOptionBaseInput,
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
