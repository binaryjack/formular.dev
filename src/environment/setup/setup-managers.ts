import { InputFactory } from '@core/factories/input-factory/input-factory'
import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { SAutoTrackerNotificationManager } from '@core/managers/notification-manager/notification-manager.types'
import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import {
    STrackingManager,
    STrackingOutputProvider
} from '@core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { SValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { ValueManager } from '@core/managers/value-manager/value-manager'
import { SValueManager } from '@core/managers/value-manager/value-manager.types'
import { ConfigProvider } from '../provider/configuration/config-provider'
import { FieldDescriptorService } from '../services/field-descriptor-service'
import { TrackingStrategyService } from '../services/tracking-strategy-service'
import { ValidationStrategyService } from '../services/validation-strategy-service'
import { ValidationTriggerService } from '../services/validation-trigger-service'
import { ValueStrategyService } from '../services/value-strategy-service'

export const setupManagers = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    // First register the ServiceManager instance under its interface identifier
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })

    sm.registerClass(ConfigProvider, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(FieldDescriptorService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(TrackingStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(ValidationTriggerService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(ValueStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(ValidationStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(InputFactory, { lifetime: 'singleton', dependencies: [SServiceManager] })

    sm.register(SAutoTrackerNotificationManager, () => new TrackingManager(), {
        lifetime: 'singleton'
    })
    sm.register(STrackingManager, () => new TrackingManager(), {
        lifetime: 'singleton',
        dependencies: [SAutoTrackerNotificationManager]
    })
    sm.register(SDomManager, () => new DomManager(), { lifetime: 'singleton' })
    sm.register(STrackingManager, () => new TrackingManager(), {
        lifetime: 'singleton',
        dependencies: [STrackingOutputProvider]
    })

    sm.register(SValidationManager, () => new ValidationManager(), { lifetime: 'singleton' })
    sm.register(SValueManager, () => new ValueManager(), { lifetime: 'singleton' })
}
