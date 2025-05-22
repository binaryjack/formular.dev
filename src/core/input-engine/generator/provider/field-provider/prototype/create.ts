import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFieldProvider } from '../field.provider.types'

export const create = function <T>(
    this: IFieldProvider<T>,
    descriptors: IFieldDescriptor,
    initializationParameters: IFieldInitializationParameters,
    initializationDependencies: IInitializableDependency[]
): T | null {
    const builder = this.factory.create<T>(descriptors.type)
    const dc = newDependencyConfiguration(
        descriptors,
        initializationParameters,
        initializationDependencies
    )
    const outputFields = builder(dc)
    return outputFields
}
