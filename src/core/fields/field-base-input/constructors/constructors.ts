import { IBuilderParams } from '@core/factory/builder/field-builder'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IFieldBaseInput } from '../field-input-base-types'

export type ConstructType = 'new' | 'inherits'

export interface IConstructor {
    new (configuration?: IBuilderParams, field?: IFieldBaseInput): IConstructor
    type: ConstructType
    output?: IFieldDescriptor | IFieldBaseInput
    configuration: IBuilderParams
}

export const Constructor = function (
    this: IConstructor,
    configuration?: IBuilderParams,
    field?: IFieldBaseInput
): IConstructor {
    let type: ConstructType = 'inherits'
    let output: IFieldBaseInput | IFieldDescriptor | undefined = undefined

    if (field) {
        output = field
    } else if (configuration?.descriptor) {
        type = 'new'
        output = configuration?.descriptor
    } else {
        const numericItems =
            (configuration?.validationStrategies?.length ?? 0) +
            (configuration?.trackingStrategies?.length ?? 0) +
            (configuration?.valueStrategies?.length ?? 0)
        throw Error(
            `Constructor must have a configuration set:
                Mandatory instances:
                ${!configuration?.notifierInstance ? '- The notifier instance' : ''} 
                ${!configuration?.descriptor ? '-  The field descriptor' : ''} 
                ${numericItems > 0 ? 'At least one of each following' : ''}
                ${configuration?.validationStrategies?.length === 0 ? '- validationStrategies' : ''} 
                ${configuration?.trackingStrategies?.length === 0 ? '- validationStrategies' : ''} 
                ${configuration?.valueStrategies?.length === 0 ? '- validationStrategies' : ''}  
                `
        )
    }
    if (!configuration?.descriptor && !field) {
        throw Error(`unable to instanciate constructor. Please provide a descriptor or an instance`)
    }
    return { type, output, configuration } as IConstructor
} as any as IConstructor
