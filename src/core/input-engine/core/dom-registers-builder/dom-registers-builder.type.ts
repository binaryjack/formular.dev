import { EventsType } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { IExtendedInput } from '../input-base/input-base.types'

export type EventTypeSignature = (e: Event) => void
export type KeyEventTypeSignature = (e: KeyboardEvent) => void
export type Events = EventTypeSignature | KeyEventTypeSignature

export interface ICustomHandler {
    eventType: EventsType
    handler: EventTypeSignature | KeyEventTypeSignature
}

export interface IDomRegisterBuilder {
    new (context: IExtendedInput): IDomRegisterBuilder
    element: Partial<HTMLInputElement>
    context: IExtendedInput
    eventsHandlers: Record<EventsType, Events[]>
    onChange: (e: Event) => void
    onBlur: (e: Event) => void
    onFocus: (e: Event) => void
    onClick: (e: Event) => void
    onClear: (e: Event) => void
    onKeyPress: (e: KeyboardEvent) => void
    onKeyUp: (e: KeyboardEvent) => void
    onClickOption: (e: Event) => void

    registerEvents: (...customHandlers: ICustomHandler[]) => IDomRegisterBuilder
    registerEvent: (eventType: EventsType, handler?: Events) => IDomRegisterBuilder
    registerChange: (custom?: (e: Event) => void) => IDomRegisterBuilder
    registerBlur: (custom?: (e: Event) => void) => IDomRegisterBuilder
    registerFocus: (custom?: (e: Event) => void) => IDomRegisterBuilder
    registerClick: (custom?: (e: Event) => void) => IDomRegisterBuilder
    registerKeyPress: (custom?: (e: KeyboardEvent) => void) => IDomRegisterBuilder
    registerKeyUp: (custom?: (e: KeyboardEvent) => void) => IDomRegisterBuilder
    registerClickOption: (optionId: string) => IDomRegisterBuilder
    registerAria: (...arias: IAria[]) => IDomRegisterBuilder
    assembleEventsHandlers: () => any
    build: () => any
    buildOption: (option: IOptionItem) => any
    buildLabel: (option: IOptionItem) => any
}
