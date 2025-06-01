import { IExtendedInput, IInputBase } from '@core/input-engine/core/input-base/input-base.types'

export interface IBaseEventsHanlders {
    handleOnChanged: <T extends IEvents>(data?: T) => void
}

export interface IOptionBaseEventsHanlders {
    handleOnSelected: <T extends IEvents>(data?: T) => void
}

export interface IClickBaseEventsHanlders {
    handleOnClicked: <T extends IEvents>(data?: T) => void
}

export enum EventsEnum {
    intitial = 'intitial',
    /** will validate on field blur (lost focus) */
    onBlur = 'onBlur',
    /** will validate on field value is changed */
    onChange = 'onChange',
    /** will validate on form submit */
    onSubmit = 'onSubmit',
    /** will validate on field got focus */
    onFocus = 'onFocus',
    /** will validate on field load */
    onLoad = 'onLoad',

    onClick = 'onClick',

    onClear = 'onClear',

    onResetValidation = 'onResetValidation',

    onGet = 'onGet',

    onValidate = 'onValidate',

    onSelect = 'onSelect',

    onKeyPress = 'onKeyPress',

    onKeyDown = 'onKeyDown',

    onKeyUp = 'onKeyUp',

    onFormat = 'onFormat',

    onOpen = 'onOpen',

    onClose = 'onClose',

    onUiUpdate = 'onUiUpdate',

    onAutoTrackNotified = 'onAutoTrackNotified',

    validateOnFormFirstSubmit = 'validateOnFormFirstSubmit',

    onEngineStateChanger = 'onEngineStateChanger',

    onDispose = 'onDispose',

    onValueChange = 'onValueChange',

    onValidationChange = 'onValidationChange',

    onBusyStateChange = 'onBusyStateChange'
}

/** if no rule is applied the the field is never validated */
export type EventsType = keyof typeof EventsEnum

/**emitterName MUST be unique */
export interface IEvents {
    fieldName: string
    /** MUST be unique */
    emitterName: string
    types: EventsType[]
    action: string
    toFlags: () => string
    target?: string
    fieldRef?: IExtendedInput | IInputBase
}
