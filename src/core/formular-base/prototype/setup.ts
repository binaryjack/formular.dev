import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormular } from '../formular-base.types'

export const setup = function (this: IFormular, autoTracker?: INotificationManager) {
    this.autoTracker = autoTracker
}
