import { INotificationManager } from '../notification-manager-base.types'

export function trigger(this: INotificationManager) {
    // Trigger field-specific channel using field ID from input
    const channelId = (this as any).input?.id
    this.observers.trigger(channelId ? String(channelId) : undefined)
    //*this.notifiers.notifyAll()
}
