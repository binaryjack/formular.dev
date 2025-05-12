import { BaseEmptyBuilder } from '../../presets/base-empty-builder'
import { MaxAndMaxLengthBuilder } from '../../presets/max-and-max-length-builder'
import { MaxAndMinLengthBuilder } from '../../presets/max-and-min-length-builder'
import { MaxBuilder } from '../../presets/max-builder'
import { MaxLengthBuilder } from '../../presets/max-length-builder'
import { MaxMinLengthAndMaxLengthBuilder } from '../../presets/max-min-length-and-max-length-builder'
import { MinAndMaxLengthBuilder } from '../../presets/min-and-max-length-builder'
import { MinAndMinLengthBuilder } from '../../presets/min-and-min-length-builder'
import { MinBuilder } from '../../presets/min-builder'
import { MinLengthAndMaxLengthBuilder } from '../../presets/min-length-and-max-length-builder'
import { MinLengthBuilder } from '../../presets/min-length-builder'
import { MinMaxAndMinLengthBuilder } from '../../presets/min-max-and-min-length-builder'
import { MinMaxBuilder } from '../../presets/min-max-builder'
import { MinMinLengthAndMaxLengthBuilder } from '../../presets/min-min-length-and-max-length-builder'
import { RequiredBuilder } from '../../presets/required-builder'
import { addBuilders } from './prototype/add-builders'
import { create } from './prototype/create'
import { createValidationSchemaBuilder } from './prototype/create-validation-schema-builder'
import { finalizer } from './prototype/finalizer'
import { IValidationSchemaFactory } from './validation.schema.factory.types'

export const ValidationSchemaFactory = function (this: IValidationSchemaFactory) {
    this.builders = []
} as any as IValidationSchemaFactory

Object.assign(ValidationSchemaFactory.prototype, {
    addBuilders,
    createValidationSchemaBuilder,
    finalizer,
    create
})

const validationSchemaFactory = new ValidationSchemaFactory()

validationSchemaFactory.addBuilders(
    BaseEmptyBuilder,
    RequiredBuilder,
    MinBuilder,
    MaxBuilder,
    MinMaxBuilder,
    MinAndMinLengthBuilder,
    MaxAndMinLengthBuilder,
    MinMaxAndMinLengthBuilder,
    MinAndMaxLengthBuilder,
    MaxAndMaxLengthBuilder,
    MinMinLengthAndMaxLengthBuilder,
    MaxMinLengthAndMaxLengthBuilder,
    MinLengthBuilder,
    MaxLengthBuilder,
    MinLengthAndMaxLengthBuilder
)

export default validationSchemaFactory
