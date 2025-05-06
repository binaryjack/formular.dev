import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IFieldBaseInput } from '../field-input-base-types'

export type ConstructType = 'new' | 'inherits'

export interface IConstructor {
    new (descriptor?: IFieldDescriptor, field?: IFieldBaseInput): IConstructor
    type: ConstructType
    output?: IFieldDescriptor | IFieldBaseInput
}

export const Constructor = function (
    this: IConstructor,
    descriptor?: IFieldDescriptor,
    field?: IFieldBaseInput
): IConstructor {
    let type: ConstructType = 'inherits'
    let output: IFieldBaseInput | IFieldDescriptor | undefined = undefined

    if (descriptor) {
        type = 'new'
        output = descriptor
    }
    if (field) {
        type = 'inherits'
        output = field
    }
    if (!descriptor && !field) {
        throw Error(`unable to instanciate constructor. Please provide a descriptor or an instance`)
    }
    return { type, output } as IConstructor
} as any as IConstructor
