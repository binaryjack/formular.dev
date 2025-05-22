import {
    IDependencyConfiguration,
    newDependencyConfiguration
} from '@core/input-engine/core/configuration/dependency-configuration'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldProvider } from '../field.provider.types'

export const createFromConfiguration = function <T>(
    this: IFieldProvider<T>,
    configuration: IDependencyConfiguration,
    checkConfiguration?: boolean
): T | null {
    const descriptor = configuration.initialization?.descriptor

    if (checkConfiguration) {
        if (!descriptor) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `Descriptor is not defined in the configuration`
            )
            return null
        }
        if (!configuration.initialization) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `initialization is not defined in the configuration`
            )
            return null
        }
        if (!configuration.dependencies) {
            logManager(
                undefined,
                'critical',
                'InputsProviderFromConfigurations',
                `dependencies is not defined in the configuration`
            )
            return null
        }
    }
    if (!descriptor || !configuration.initialization || !configuration.dependencies) {
        return null
    }

    const builder = this.factory.create<T>(descriptor.type)
    const dc = newDependencyConfiguration(
        descriptor,
        configuration.initialization,
        configuration.dependencies
    )
    const input = builder(dc)
    return input
}
