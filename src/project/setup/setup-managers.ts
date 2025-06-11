import { InputFactory, SInputFactory } from '@core/factories/input-factory/input-factory'
import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { NotificationManager } from '@core/managers/notification-manager/notification-manager'
import {
    SAutoTrackerNotificationManager,
    SNotificationManager
} from '@core/managers/notification-manager/notification-manager.types'
import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import { StyleManager } from '@core/managers/style-manager/style-manager'
import { SStyleManager } from '@core/managers/style-manager/style-manager.types'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { STrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { SValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { ValueManager } from '@core/managers/value-manager/value-manager'
import { SValueManager } from '@core/managers/value-manager/value-manager.types'
import { ConfigProvider, SConfigProvider } from '@project/provider/configuration/config-provider'
import {
    FieldDescriptorService,
    SFieldDescriptorService
} from '../services/field-descriptor-service'
import {
    STrackingStrategyService,
    TrackingStrategyService
} from '../services/tracking-strategy-service'
import {
    SValidationStrategyService,
    ValidationStrategyService
} from '../services/validation-strategy-service'
import {
    SValidationTriggerService,
    ValidationTriggerService
} from '../services/validation-trigger-service'
import { SValueStrategyService, ValueStrategyService } from '../services/value-strategy-service'

export const setupManagers = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    // First register the ServiceManager instance under its interface identifier
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })

    sm.registerClass(SFieldDescriptorService, FieldDescriptorService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(STrackingStrategyService, TrackingStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SValidationTriggerService, ValidationTriggerService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SValueStrategyService, ValueStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SValidationStrategyService, ValidationStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SInputFactory, InputFactory, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.register(SAutoTrackerNotificationManager, () => new NotificationManager(), {
        lifetime: 'singleton'
    })

    sm.registerClass(SNotificationManager, NotificationManager, {
        lifetime: 'singleton',
        dependencies: [SAutoTrackerNotificationManager]
    })

    sm.register(SDomManager, () => new DomManager(), { lifetime: 'singleton' })
    sm.register(STrackingManager, () => new TrackingManager(), {
        lifetime: 'singleton'
    })
    sm.register(SStyleManager, () => new StyleManager(), { lifetime: 'singleton' })
    sm.register(SValidationManager, () => new ValidationManager(), { lifetime: 'singleton' })
    sm.register(SValueManager, () => new ValueManager(), { lifetime: 'singleton' })

    sm.registerClass(SConfigProvider, ConfigProvider, {
        lifetime: 'singleton',
        dependencies: [
            SValidationTriggerService,
            SValidationStrategyService,
            SValueStrategyService,
            STrackingStrategyService
        ]
    })
}
