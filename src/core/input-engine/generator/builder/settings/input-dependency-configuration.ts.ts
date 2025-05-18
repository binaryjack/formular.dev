import { defaultTriggers } from '@core/framework/events/settings/default.settings'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { defaultOutputTrackers } from '@core/managers/tracking-manager/settings/default.settings'
import { defaultValidationStrategies } from '@core/managers/validation-manager/settings/default.settings'
import { defaultValueParsersStrategies } from '@core/managers/value-manager/settings/default.settings'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { _mockDescriptor } from '@tests/mocks/field-descriptor.mock'
import { IFieldInitializationParameters } from '../field-builder'

export const defaultInitializationParameters: IFieldInitializationParameters = {
    descriptor: {} as any,
    trackingStrategies: defaultOutputTrackers,
    validationStrategies: defaultValidationStrategies,
    validationTriggerModeType: defaultTriggers,
    valueStrategies: defaultValueParsersStrategies
}

export const defaultInitializationDependencies: IInitializableDependency[] = [
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.domManager,
    lifeCylceInstances.trackingManager,
    lifeCylceInstances.validationManager
]

export const defaultTestDependencyConfiguration = newDependencyConfiguration(
    _mockDescriptor,
    {
        ...defaultInitializationParameters,
        descriptor: _mockDescriptor
    },
    defaultInitializationDependencies
)
