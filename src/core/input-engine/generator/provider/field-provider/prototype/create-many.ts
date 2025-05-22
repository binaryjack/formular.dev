import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFieldProvider } from '../field.provider.types'

export const createMany = function <T>(
    this: IFieldProvider<T>,
    descriptors: IFieldDescriptor[],
    initializationParameters: IFieldInitializationParameters,
    initializationDependencies: IInitializableDependency[]
): T[] {
    const outputFields: T[] = []
    for (const fd of descriptors) {
        const input = this.create(fd, initializationParameters, initializationDependencies)
        if (!input) {
            throw new Error(`Field ${fd.name} cannot be created`)
        }
        outputFields.push(input)
    }
    return outputFields
}
