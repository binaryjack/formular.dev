import { IInputFactory } from '../../factory/input-factory'
import { IFieldProvider } from './field.provider.types'
import { create } from './prototype/create'
import { createFromConfiguration } from './prototype/create-from-configuration'
import { createMany } from './prototype/create-many'
import { createManyFromConfiguration } from './prototype/create-many-from-configuration'

export const FieldProvider = function <T>(this: IFieldProvider<T>, factory: IInputFactory) {
    this.factory = factory
} as any as IFieldProvider<any>

Object.assign(FieldProvider.prototype, {
    createMany,
    create,
    createManyFromConfiguration,
    createFromConfiguration
})
