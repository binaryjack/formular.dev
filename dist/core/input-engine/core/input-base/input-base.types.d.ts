import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { InputDataTypes } from '../../../framework/common/common.input.data.types';
import { IEvents } from '../../../framework/events/events.types';
import { IFieldDescriptor } from '../../../framework/schema/descriptor/field.descriptor';
import { IEntityScheme } from '../../../framework/schema/field-schema/field.schema.types';
import { ICheckBoxBaseInputProperties } from '../../variants/check-box-base/check-box-base-input.types';
import { IClickBaseInputProperties } from '../../variants/click-base/click-base-input.types';
import { IDrawerBaseInput, IDrawerBaseInputProperties } from '../../variants/drawer-base/drawer-base-input.types';
import { IOptionBaseInput, IOptionBaseInputProperties } from '../../variants/option-based/option-base-input.types';
import { IRadioBaseInputProperties } from '../../variants/radio-base/radio-base-input.types';
import { ISelectBaseInputProperties } from '../../variants/select-base/select-base-input.types';
import { ITextBaseInput } from '../../variants/text-base/text-base-input.types';
import { IDomManager } from '../../../managers/dom-manager/dom-manager.types';
import { IInitializableDependency } from '../../../managers/initialization-manager/initialization-manager.types';
import { INotificationManager } from '../../../managers/notification-manager/notification-manager-base.types';
import { IFieldStyleProperties, IStyleManager } from '../../../managers/style-manager/style-manager.types';
import { ITrackingManager, TrackingType } from '../../../managers/tracking-manager/tracker-manager.types';
import { IValidationManager, IValidationResult } from '../../../managers/validation-manager/validation-manager.types';
import { IValueManager, IValueManagerProperties } from '../../../managers/value-manager/value-manager.types';
import { IInitilizationCheckResult } from './prototype/check-initialized';
export declare const SInputBase: unique symbol;
/**
 * Should be the root base of a field's properties
 */
export interface IInputProperties extends IFieldDescriptor {
    [key: string]: any;
    id: number;
    name: string;
    label: string;
    enabled: boolean;
    isBusy: boolean;
    isValid: boolean;
    isDirty: boolean;
    isPristine: boolean;
    isFocus: boolean;
    formular?: IFormular<any>;
    value: InputDataTypes;
    originalValue: InputDataTypes;
    validationResults: IValidationResult[];
    cursorPosition: number | null;
    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void;
    /** Core methods */
    setValue: (value: InputDataTypes) => void;
    getValue: () => InputDataTypes;
    setFocus: () => void;
    clear: () => void;
    enable: (enabled: boolean) => void;
    hasChanges: (callback: () => void) => void;
    handleValidation: <T extends IEvents | unknown>(data: T) => void;
    handleValidationAsync: <T extends IEvents | unknown>(data: T) => Promise<IValidationResult[]>;
    handleOnBlur: <T extends IEvents>(data?: T) => void;
    handleOnFocus: <T extends IEvents>(data?: T) => void;
    handleOnClear: <T extends IEvents>(data?: T) => void;
    handleOnKeyPress: <T extends IEvents>(data?: T) => void;
    handleOnKeyUp: <T extends IEvents>(data?: T) => void;
    refreshUi: (ref?: IInputBase | IExtendedInput) => void;
    onBeforeValidation?: () => boolean;
    onAfterValidation?: () => void;
    setInputBusy: (isBusy: boolean) => void;
    /** Dependency accessors */
    domManager: IDomManager<HTMLInputElement>;
    drawer: IDrawerBaseInput;
    styleManager: IStyleManager;
    notificationManager: INotificationManager;
    trackingManager: ITrackingManager;
    validationManager: IValidationManager;
    valueManager: IValueManager;
}
export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor;
/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IInput = IInputBase & Omit<IFieldDescriptor, 'validationOptions' | 'options'>;
export interface IInputBase extends IInputProperties, IInitializableDependency {
    new (descriptor: IFieldDescriptor | null, domManagerInstance: IDomManager<HTMLInputElement> | null, notifierInstance: INotificationManager | null, trackerInstance: ITrackingManager | null, validationManagerInstance: IValidationManager | null, valueManagerInstance: IValueManager | null, drawerBase: IDrawerBaseInput | null, styleManager: IStyleManager | null): IInputBase;
    /** initializer builders */
    initializeProperties: (descriptor: IFieldDescriptor) => void;
    checkInitialized: () => IInitilizationCheckResult;
    useDomManager: (domManagerInstance: IDomManager<HTMLInputElement>) => IInputBase;
    useNotificationManager: (notifierInstance?: INotificationManager) => IInputBase;
    useTrackingManager: (trackerInstance: ITrackingManager) => IInputBase;
    useValidationManager: (validationStrategyInstance: IValidationManager) => IInputBase;
    useValueManager: (valueStrategyInstance: IValueManager) => IInputBase;
    useDrawerManager: (drawerBase: IDrawerBaseInput) => IInputBase;
    useStyleManager: (styleManager: IStyleManager) => IInputBase;
}
export declare const InputResolver: (field: IExtendedInput | IInputBase) => IInputBase;
export interface IExtendedInputBase extends IInitializableDependency {
    input: IInputBase;
}
export interface IExtendedInput extends IFieldStyleProperties, IOptionBaseInputProperties, IDrawerBaseInputProperties, IClickBaseInputProperties, ICheckBoxBaseInputProperties, IRadioBaseInputProperties, ISelectBaseInputProperties, IValueManagerProperties, IOptionBaseInput, ITextBaseInput, IExtendedInputBase, IInitializableDependency {
    handleOnClear: any;
}
