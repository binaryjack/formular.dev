import { TNotifierMethod } from '../../notifiable-entity/notifications.types'

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

    onFormat = 'onFormat',

    onOpen = 'onOpen',

    onClose = 'onClose',

    onUiUpdate = 'onUiUpdate',

    onAutoTrackNotified = 'onAutoTrackNotified',

    onFormFirstSubmit = 'onFormFirstSubmit',

    onEngineStateChanger = 'onEngineStateChanger',

    onDispose = 'onDispose'
}

export const emptyInitializeMethod: TNotifierMethod<unknown> = () => {}

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
}

const _toFlags = function (
    fieldName: string,
    emitterName: string,
    types: EventsType[],
    action: string,
    target?: string
) {
    return `${fieldName}.${emitterName}:[${types.join(',')}].[${action}]${target ? ' => [' + target + ']' : ''}`
}

export const newEvent = (
    fieldName: string,
    emitterName: string,
    type: EventsType,
    action: string,
    target?: string
): IEvents => {
    return {
        fieldName,
        emitterName,
        action,
        types: [type],
        target,
        toFlags: () => _toFlags(fieldName, emitterName, [type], action, target)
    }
}

export const defaultExtendsEventObject: IEvents = {
    action: '',
    emitterName: '',
    fieldName: '',
    types: ['intitial'],
    toFlags: () => _toFlags('', '', ['intitial'], '')
}
