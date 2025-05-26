import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { onClick } from '../../variants/click-base/events/on-click'
import { AriaHelper } from '../accessibility/arias'
import { onBlur } from '../input-base/events/on-blur'
import { onChange } from '../input-base/events/on-changed'
import { onFocus } from '../input-base/events/on-focus'

import { EventsType } from '@core/framework/events/events.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { onClickOption } from '@core/input-engine/variants/click-base/events/on-click-option'
import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'

import { onKeyPress } from '../input-base/events/on-key-press'
import { onKeyUp } from '../input-base/events/on-key-up'
import { IExtendedInput } from '../input-base/input-base.types'

export type EventTypeSignature = (e: Event) => void
export type KeyEventTypeSignature = (e: KeyboardEvent) => void
export type Events = EventTypeSignature | KeyEventTypeSignature

export interface ICustomHandler {
    eventType: EventsType
    handler: EventTypeSignature | KeyEventTypeSignature
}

export const customEvent = (
    eventType: EventsType,
    handler: EventTypeSignature | KeyEventTypeSignature
): ICustomHandler => {
    return {
        eventType,
        handler
    }
}

export interface IDomRegisterBuilder {
    new (context: IExtendedInput): IDomRegisterBuilder
    element: Partial<HTMLInputElement>
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

export const DomRegisterBuilder = function (this: IDomRegisterBuilder, context: IExtendedInput) {
    this.eventsHandlers = {} as Record<EventsType, Events[]>
    this.element = {} as Partial<HTMLInputElement>

    this.registerEvents = function (
        this: IDomRegisterBuilder,
        ...customHandlers: ICustomHandler[]
    ) {
        customHandlers.forEach((customHandler) => {
            this.registerEvent(customHandler.eventType, customHandler.handler)
        })
        return this
    }

    this.registerEvent = function (
        this: IDomRegisterBuilder,
        eventType: EventsType,
        handler?: Events
    ) {
        if (!this.eventsHandlers[eventType]) {
            this.eventsHandlers[eventType] = []
        }
        if (handler) {
            this.eventsHandlers[eventType].push(handler)
        }
        // this.eventsBinding = { ...this.eventsBinding, [eventType]: handler }
        return this
    }

    this.registerChange = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
        custom && this.registerEvent('onChange', (e: Event) => custom(e))
        onChange && this.registerEvent('onChange', (e: Event) => onChange(context, e))
        return this
    }

    this.registerKeyPress = function (
        this: IDomRegisterBuilder,
        custom?: (e: KeyboardEvent) => void
    ) {
        custom && this.registerEvent('onKeyPress', (e: KeyboardEvent) => custom(e))
        onKeyPress && this.registerEvent('onKeyPress', (e: KeyboardEvent) => onKeyPress(context, e))
        return this
    }

    this.registerKeyUp = function (this: IDomRegisterBuilder, custom?: (e: KeyboardEvent) => void) {
        custom && this.registerEvent('onKeyUp', (e: KeyboardEvent) => custom(e))
        onKeyUp && this.registerEvent('onKeyUp', (e: KeyboardEvent) => onKeyUp(context, e))
        return this
    }

    this.assembleEventsHandlers = function (this: IDomRegisterBuilder) {
        const mergedHandlers: Partial<any> = {}

        for (const [eventType, handlers] of Object.entries(this.eventsHandlers)) {
            // Merge all handlers for the event type into a single function
            mergedHandlers[eventType] = (e: Event) => {
                handlers.forEach((handler) => {
                    if (eventType === 'onKeyPress') {
                        ;(handler as KeyEventTypeSignature)(e as KeyboardEvent)
                    } else {
                        ;(handler as EventTypeSignature)(e)
                    }
                })
            }
        }

        return mergedHandlers
    }

    this.registerBlur = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
        custom && this.registerEvent('onBlur', (e: Event) => custom(e))
        onBlur && this.registerEvent('onBlur', (e: Event) => onBlur(context, e))
        return this
    }
    this.registerFocus = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
        custom && this.registerEvent('onFocus', (e: Event) => custom(e))
        onFocus && this.registerEvent('onFocus', (e: Event) => onFocus(context, e))
        return this
    }
    this.registerClick = function (this: IDomRegisterBuilder, custom?: (e: Event) => void) {
        custom && this.registerEvent('onClick', (e: Event) => custom(e))
        onClick && this.registerEvent('onClick', (e: Event) => onClick(context, e))
        return this
    }
    this.registerClickOption = function (this: IDomRegisterBuilder, optionId: string) {
        this.onClickOption = (e: Event) => onClickOption(context, optionId, e)
        // this.eventsBinding = { ...this.eventsBinding, onClick: this.onClickOption }
        return this
    }
    this.registerAria = function (this: IDomRegisterBuilder, ...arias: IAria[]) {
        const ah = new AriaHelper()
        ah.addMany(...(arias ?? []))
        ah.apply(context.input)
        return this
    }
    this.build = function (this: IDomRegisterBuilder): any {
        let hasMask = false
        if (context.dependencyName === 'MaskedBaseInput') {
            hasMask = !!(context as unknown as IMaskedBaseInput)?.mask
        }
        const eleEvts = this.assembleEventsHandlers()
        return {
            id: `${context.input.id}`,
            /** I need hack date input */
            type: hasMask ? 'text' : context.input.type,
            className: 'base-input',
            title: context.input.label ?? '',
            ...eleEvts
        }
    }
    this.buildOption = function (this: IDomRegisterBuilder, option: IOptionItem): any {
        const eleEvts = this.assembleEventsHandlers()
        return {
            id: `option-${option.id}`,
            type: context.input.type,
            title: option.text ?? '',
            ...eleEvts
        }
    }
    this.buildLabel = function (this: IDomRegisterBuilder, option: IOptionItem): any {
        const eleEvts = this.assembleEventsHandlers()
        return {
            id: `label-${option.id}`,
            type: 'label',
            title: option.text ?? '',
            ...eleEvts
        }
    }
} as any as IDomRegisterBuilder
