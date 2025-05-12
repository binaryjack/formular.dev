import { defaultTriggers } from '@core/framework/events/settings/default.settings'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
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
import { IFieldInitializationParameters } from '../field-builder'

export const defaultInitializationParameters: IFieldInitializationParameters = {
    descriptor: {} as any,
    trackingStrategies: defaultOutputTrackers,
    validationStrategies: defaultValidationStrategies,
    validationTriggerModeType: defaultTriggers,
    valueStrategies: defaultValueParsersStrategies
}

export const defaultInitializationDependencies: IInitializableDependency[] = [
    notificationManagerInstance,
    domManagerInstance,
    trackingManagerInstance,
    validationManagerInstance
]

export const defaultTestDependencyConfiguration = newDependencyConfiguration(
    _mockDescriptor,
    {
        ...defaultInitializationParameters,
        descriptor: _mockDescriptor
    },
    defaultInitializationDependencies
)
