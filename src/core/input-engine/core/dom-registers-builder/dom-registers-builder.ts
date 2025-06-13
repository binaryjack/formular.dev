import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput } from '../input-base/input-base.types'

import type { Events, ICustomHandler, IDomRegisterBuilder } from './dom-registers-builder.type'
import { assembleEventsHandlers } from './prototype/assemble-events-handlers'
import { build } from './prototype/build'
import { buildLabel } from './prototype/build-label'
import { buildOption } from './prototype/build-option'
import { registerAria } from './prototype/register-aria'
import { registerBlur } from './prototype/register-blur'
import { registerChange } from './prototype/register-change'
import { registerClick } from './prototype/register-click'
import { registerClickOption } from './prototype/register-click-option'
import { registerEvent } from './prototype/register-event'
import { registerEvents } from './prototype/register-events'
import { registerFocus } from './prototype/register-focus'
import { registerKeyPress } from './prototype/register-key-press'
import { registerKeyUp } from './prototype/register-key-up'

/**
 * Creates a custom event handler object.
 * @param eventType The type of event
 * @param handler The event handler function
 * @returns ICustomHandler object
 * @throws {TypeError} If eventType or handler is not provided or invalid
 */
export const customEvent = (eventType: EventsType, handler: Events): ICustomHandler => {
    if (!eventType) {
        throw new TypeError('customEvent: eventType is required')
    }
    if (typeof handler !== 'function') {
        throw new TypeError('customEvent: handler must be a function')
    }
    return {
        eventType,
        handler
    }
}

/**
 * DomRegisterBuilder constructor for registering DOM event handlers and element context.
 * @constructor
 * @param {IExtendedInput} context - The input context for the builder.
 * @returns {IDomRegisterBuilder}
 * @throws {TypeError} If context is not provided or invalid
 */
export const DomRegisterBuilder = function (this: IDomRegisterBuilder, context: IExtendedInput) {
    if (!context || typeof context !== 'object') {
        throw new TypeError('DomRegisterBuilder: context must be a valid object')
    }
    this.eventsHandlers = {} as Record<string, Events[]>
    this.element = {} as Partial<HTMLInputElement>
    this.context = context
} as any as IDomRegisterBuilder

Object.assign(DomRegisterBuilder.prototype, {
    assembleEventsHandlers,
    buildLabel,
    buildOption,
    build,
    registerAria,
    registerBlur,
    registerChange,
    registerClick,
    registerClickOption,
    registerEvent,
    registerEvents,
    registerFocus,
    registerKeyPress,
    registerKeyUp
})
