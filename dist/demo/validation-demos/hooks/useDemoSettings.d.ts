import { IFormular } from '../../../core/formular-engine/formular-base/formular-base.types';
import { EventsType } from '../../../core/framework/events/events.types';
import { IExtendedInput } from '../../../core/input-engine/core/input-base/input-base.types';
import { IValidationOptions } from '../../../core/managers/validation-manager/validation-manager.types';
export declare const useDemoSettings: <T extends object>(instance: IExtendedInput | undefined, internalForm: IFormular<T> | null, defaultValidationOptions: IValidationOptions, ...defaultEvents: EventsType[]) => {
    submissionObject: T | undefined;
    setSubmissionObject: import('react').Dispatch<import('react').SetStateAction<T | undefined>>;
    validationOptions: IValidationOptions;
    triggerKeyWord: ("onFocus" | "onBlur" | "onChange" | "onSubmit" | "onLoad" | "onKeyDown" | "onKeyPress" | "onKeyUp" | "onClick" | "onSelect" | "intitial" | "onClear" | "onResetValidation" | "onGet" | "onValidate" | "onFormat" | "onOpen" | "onClose" | "onUiUpdate" | "onAutoTrackNotified" | "validateOnFormFirstSubmit" | "onEngineStateChanger" | "onDispose" | "onValueChange" | "onValidationChange" | "onBusyStateChange" | "onObserve")[];
    handleTriggerModeChange: (mode: EventsType[]) => void;
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void;
};
