import { ConfigurationManager } from '@core/managers/configuration-manager'
import {
    IConfigurationManager,
    SConfigurationManager
} from '@core/managers/configuration-manager/interfaces/i-configuration-manager'

import { DomManager } from '../../core/managers/dom-manager/dom-manager'
import { SDomManager } from '../../core/managers/dom-manager/dom-manager.types'
import { NotificationManager } from '../../core/managers/notification-manager/notification-manager'
import {
    SAutoTrackerNotificationManager,
    SNotificationManager
} from '../../core/managers/notification-manager/notification-manager.types'
import {
    IServiceManager,
    SServiceManager
} from '../../core/managers/service-manager/service-manager.types'
import { StyleManager } from '../../core/managers/style-manager/style-manager'
import { SStyleManager } from '../../core/managers/style-manager/style-manager.types'
import { TrackingManager } from '../../core/managers/tracking-manager/tracker-manager'
import { STrackingManager } from '../../core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '../../core/managers/validation-manager/validation-manager'
import { SValidationManager } from '../../core/managers/validation-manager/validation-manager.types'
import { ValueManager } from '../../core/managers/value-manager/value-manager'
import { SValueManager } from '../../core/managers/value-manager/value-manager.types'
import {
    InputConfigProvider,
    SInputConfigProvider
} from '../providers/configuration/input-configuration/input-config-provider'
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
import { setupBaseInputClasses } from './setup-base-input-classes'
import { setupBaseFieldsConfiguration } from './setup-base-input-configurations'

// TODO: Re-enable after updating setup-validation-patterns to use new configuration manager
// import { setupValidationPatterns } from './setup-validation-patterns'

export const setupManagers = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    } // Setup validation patterns first (this includes configuration services)
    // TODO: Re-enable after updating setup-validation-patterns to use new configuration manager
    // setupValidationPatterns(sm)

    // ========================================
    // PHASE 1: CORE INFRASTRUCTURE SERVICES
    // ========================================

    // First register the ServiceManager instance under its interface identifier
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })

    // Configuration Manager - Foundation for all other services
    sm.registerClass(SConfigurationManager, ConfigurationManager, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    // Initialize the configuration manager with the default configuration
    const configManager = sm.resolve<IConfigurationManager>(SConfigurationManager)
    const defaultConfig = configManager.getDefaultConfiguration()
    configManager.setConfiguration('default', defaultConfig)
    configManager.useConfiguration('default')

    // ========================================
    // PHASE 2: CORE MANAGERS (Dependencies: Configuration)
    // ========================================

    // Core Managers - depend on configuration
    sm.register(SDomManager, () => new DomManager(), {
        lifetime: 'singleton'
    })

    sm.register(SStyleManager, () => new StyleManager(), {
        lifetime: 'singleton'
    })

    sm.register(SValidationManager, () => new ValidationManager(), {
        lifetime: 'singleton'
    })

    sm.register(SValueManager, () => new ValueManager(), {
        lifetime: 'singleton'
    })

    sm.register(STrackingManager, () => new TrackingManager(), {
        lifetime: 'singleton'
    })

    // Notification Managers - Auto-tracker first, then dependent manager
    sm.register(SAutoTrackerNotificationManager, () => new NotificationManager(), {
        lifetime: 'singleton'
    })

    sm.registerClass(SNotificationManager, NotificationManager, {
        lifetime: 'singleton',
        dependencies: [SAutoTrackerNotificationManager]
    })

    // ========================================
    // PHASE 3: STRATEGY SERVICES (Dependencies: Core Managers + Configuration)
    // ========================================

    // Field Descriptor Service - depends on service manager
    sm.registerClass(SFieldDescriptorService, FieldDescriptorService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    // Strategy Services - depend on service manager and their respective managers
    sm.registerClass(SValidationTriggerService, ValidationTriggerService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SValidationStrategyService, ValidationStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager, SValidationManager]
    })

    sm.registerClass(SValueStrategyService, ValueStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager, SValueManager]
    })

    sm.registerClass(STrackingStrategyService, TrackingStrategyService, {
        lifetime: 'singleton',
        dependencies: [SServiceManager, STrackingManager]
    })

    // ========================================
    // PHASE 4: INPUT CONFIGURATION PROVIDER (Dependencies: All Strategy Services)
    // ========================================

    // Input Configuration Provider - depends on all strategy services
    sm.registerClass(SInputConfigProvider, InputConfigProvider, {
        lifetime: 'singleton',
        dependencies: [
            SValidationTriggerService,
            SValidationStrategyService,
            SValueStrategyService,
            STrackingStrategyService
        ]
    })

    // ========================================
    // PHASE 5: INPUT ENGINE SETUP (Dependencies: All Core Managers)
    // ========================================

    // Setup input base classes - this registers all the input engine components
    // Note: This should be called by ServiceManagerFactory when includeInputEngine is true
    // But we include it here to ensure input base classes are available for
    // any service manager that calls setupManagers directly
    try {
        setupBaseInputClasses(sm)
    } catch (error) {
        // Gracefully handle if input base classes setup fails
        // This allows setupManagers to work even if input engine is not available
        console.warn('Failed to setup base input classes:', error)
    }

    // ========================================
    // PHASE 6: BASE FIELD CONFIGURATIONS (Dependencies: Strategy Services)
    // ========================================

    // Setup base field configurations - this configures the strategy services
    // with default validation strategies, value parsers, tracking providers, and triggers
    try {
        setupBaseFieldsConfiguration(sm)
    } catch (error) {
        // Gracefully handle if base field configurations setup fails
        console.warn('Failed to setup base field configurations:', error)
    }
}
