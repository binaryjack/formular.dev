import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _setupNotificationExtensions method for FormularElement
 * Setup notification manager extensions for web components
 */
export const _setupNotificationExtensions = function(this: IFormularElementInstance): void {
    if (!this._notificationManager?.extend) return

    const eventExtension = {
        dispatchCustomEvent: function(this: any, eventName: string, detail: any) {
            this.lastEvent = { eventName, detail }
        },
        emitWebComponentEvent: function(this: any, element: HTMLElement, eventName: string, detail: any) {
            const event = new CustomEvent(eventName, { detail, bubbles: true, cancelable: true })
            element.dispatchEvent(event)
        }
    }

    this._notificationManager.extend('webComponents', eventExtension)
}
