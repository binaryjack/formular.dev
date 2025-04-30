import { FieldTypes } from '@core/common.types'
import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'

export interface IFieldFactory {
    new (type: FieldTypes, descriptor: IFieldDescriptor): IFieldFactory
    type: FieldTypes
    descriptor: IFieldDescriptor
}

/**
 * 1) create IFieldInputBase instance with IFieldDescriptor
 * 2)
 */

export const FieldFactory = function () {}
