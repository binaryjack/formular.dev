import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFieldInitializationParameters } from '../../builder/field-builder'
import { IInputFactory } from '../../factory/input-factory'

export interface IFieldProvider<T> {
    new (factory: IInputFactory): IFieldProvider<T>
    factory: IInputFactory
    createMany: (
        descriptors: IFieldDescriptor[],
        initializationParameters: IFieldInitializationParameters,
        initializationDependencies: IInitializableDependency[]
    ) => T[]
    create: (
        descriptor: IFieldDescriptor,
        initializationParameters: IFieldInitializationParameters,
        initializationDependencies: IInitializableDependency[]
    ) => T | null
    createManyFromConfiguration: (configuration: IDependencyConfiguration[]) => T[]
    createFromConfiguration: (
        configuration: IDependencyConfiguration,
        checkConfiguration?: boolean
    ) => T | null
}
