import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import {
    IDependencyConfiguration,
    newDependencyConfiguration
} from '../core/configuration/dependency-configuration'
import { IInput } from '../core/input-base/input-base.types'
import { IFieldInitializationParameters } from './builder/field-builder'
import { InputFactory } from './factory/input-factory'

export const InputsProvider = (
    descriptors: IFieldDescriptor[],
    initializationParameters: IFieldInitializationParameters,
    initializationDependencies: IInitializableDependency[]
) => {
    const inputFactory = new InputFactory()
    const outputFields: IInput[] = []
    for (const fd of descriptors) {
        const builder = inputFactory.create<IInput>(fd.type)
        const dc = newDependencyConfiguration(
            fd,
            initializationParameters,
            initializationDependencies
        )
        const input = builder(dc)
        outputFields.push(input)
    }
    return outputFields
}

export const InputsProviderFromConfigurations = (configs: IDependencyConfiguration[]) => {
    const inputFactory = new InputFactory()
    const outputFields: IInput[] = []
    for (const cfg of configs) {
        const descriptor = cfg.initialization?.descriptor
        if (!descriptor) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `Descriptor is not defined in the configuration`
            )
            continue
        }
        if (!cfg.initialization) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `initialization is not defined in the configuration`
            )
            continue
        }
        if (!cfg.dependencies) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `dependencies is not defined in the configuration`
            )
            continue
        }

        const builder = inputFactory.create<IInput>(descriptor.type)
        const dc = newDependencyConfiguration(descriptor, cfg.initialization, cfg.dependencies)
        const input = builder(dc)
        outputFields.push(input)
    }
    return outputFields
}
