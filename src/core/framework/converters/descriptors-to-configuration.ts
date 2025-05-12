import {
    DependencyConfiguration,
    IDependencyConfiguration
} from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFieldDescriptor } from '../schema/descriptor/field.descriptor'

export const descriptorsToConfiguration = (
    descriptors: IFieldDescriptor[],
    initialization: IFieldInitializationParameters,
    dependencies: IInitializableDependency[]
): IDependencyConfiguration[] => {
    const output: IDependencyConfiguration[] = []
    for (const fd of descriptors) {
        output.push(
            new DependencyConfiguration(
                {
                    descriptor: fd,
                    validationStrategies: initialization?.validationStrategies ?? [],
                    trackingStrategies: initialization?.trackingStrategies ?? [],
                    valueStrategies: initialization?.valueStrategies ?? [],
                    validationTriggerModeType: initialization?.validationTriggerModeType ?? []
                },
                dependencies
            )
        )
    }
    return output
}
