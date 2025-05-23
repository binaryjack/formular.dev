import { InputTypeNames } from '@core/framework/common/common.input.types'
import { createField, FieldBuilder, IBuilder, IFieldBuilder } from '../builder/field-builder'
import { InputTypeMap } from './mapping/input-type-map'

export interface IInputFactory {
    new (): IInputFactory
    create: <T>(type: InputTypeNames) => IBuilder<T>
}

const InputsRegistry = <T>(
    builder: IFieldBuilder,
    type: keyof InputTypeMap
): IBuilder<T> | undefined => {
    switch (type) {
        case 'toggle':
        case 'checkbox':
            return createField(builder.createCheckBased.bind(builder)) as IBuilder<T>
        case 'select':
            return createField(builder.createSelectBased.bind(builder)) as IBuilder<T>
        case 'radio':
            return createField(builder.createRadioBased.bind(builder)) as IBuilder<T>
        case 'date':
            return createField(builder.createMaskedBased.bind(builder)) as IBuilder<T>
        case 'text':
        default:
            return createField(builder.createTextBased.bind(builder)) as IBuilder<T>
    }
}

export const InputFactory = function (this: IInputFactory) {
    this.create = function <T>(this: IInputFactory, type: InputTypeNames): IBuilder<T> {
        const builder = new FieldBuilder()
        return InputsRegistry<T>(builder, type) as IBuilder<T>
    }
} as any as IInputFactory
