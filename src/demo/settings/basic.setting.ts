import { DependencyConfiguration } from '@core/field-engine/core/configuration/dependency-configuration'
import { defaultTriggers } from '@core/framework/events/settings/default.settings'
import { defaultOutputTrackers } from '@core/managers/tracking-manager/settings/default.settings'
import { defaultValidationStrategies } from '@core/managers/validation-manager/settings/default.settings'
import { defaultValueParsersStrategies } from '@core/managers/value-manager/settings/default.settings'
import {
    domManagerInstance,
    notificationManagerInstance,
    trackingManagerInstance,
    validationManagerInstance
} from '@demo/common/common-instances'
import { _mockDescriptor } from '@mocks/field-descriptor.mock'

export const dependencyConfiguration = new DependencyConfiguration(
    {
        descriptor: _mockDescriptor,
        trackingStrategies: defaultOutputTrackers,
        validationStrategies: defaultValidationStrategies,
        validationTriggerModeType: defaultTriggers,
        valueStrategies: defaultValueParsersStrategies
    },
    [
        notificationManagerInstance,
        domManagerInstance,
        trackingManagerInstance,
        validationManagerInstance
    ]
)
