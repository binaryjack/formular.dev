import { IEvents } from '../../events/events.types';
export interface ILatestCall {
    data?: IEvents;
    timeoutId?: number | NodeJS.Timeout;
}
export declare const latestCalls: Map<"onFocus" | "onBlur" | "onChange" | "onSubmit" | "onLoad" | "onKeyDown" | "onKeyPress" | "onKeyUp" | "onClick" | "onSelect" | "intitial" | "onClear" | "onResetValidation" | "onGet" | "onValidate" | "onFormat" | "onOpen" | "onClose" | "onUiUpdate" | "onAutoTrackNotified" | "validateOnFormFirstSubmit" | "onEngineStateChanger" | "onDispose" | "onValueChange" | "onValidationChange" | "onBusyStateChange" | "onObserve", ILatestCall>;
