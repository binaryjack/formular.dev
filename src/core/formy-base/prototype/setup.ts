import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormy } from '../formy-base.types'

export const setup = function (this: IFormy, autoTracker?: INotificationManager) {
    this.autoTracker = autoTracker
}
