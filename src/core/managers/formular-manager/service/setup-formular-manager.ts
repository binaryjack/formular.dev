import { SNotificationManager } from '@core/managers/notification-manager/notification-manager.types'
import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import { FormularManager } from '../formular-manager'
import { SFormularManager } from '../formular-manager.types'

export const setupFormularManager = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    sm.registerClass(SFormularManager, FormularManager, {
        lifetime: 'singleton',
        dependencies: [SServiceManager, SNotificationManager]
    })
}
