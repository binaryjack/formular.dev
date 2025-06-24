export interface IEventTrigger {
    triggerDelay: number
}

export interface IEvents {
    onChange: IEventTrigger
    onClick: IEventTrigger
    onSelect: IEventTrigger
    onFocus: IEventTrigger
    onBlur: IEventTrigger
    onKeyDown: IEventTrigger
    onKeyUp: IEventTrigger
    onUiUpdate: IEventTrigger
    observables: IEventTrigger
}
