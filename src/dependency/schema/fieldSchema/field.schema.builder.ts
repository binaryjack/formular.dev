import { ValidationTriggerModeType } from '../../../core/base/validatiors/validator.types'
import { SchemaDataTypes } from '../../form.common.enums'
import { IOptionItem } from '../optionsSchema/options.scheme.types'
import { IValidationSchema } from '../validationSchema/validation.schema.types'
import { IFieldSchema, IFieldSchemaBuilder } from './field.schema.types'

export const FieldSchemaBuilder = function (
    this: IFieldSchemaBuilder,
    id: number,
    name: string,
    type: SchemaDataTypes
) {
    this.id = id
    this.name = name
    this.type = type
    this.pattern = null
    this.min = null
    this.max = null
    this.minLength = null
    this.maxLength = null
    this.required = false
    this.customGuide = null
    this.customError = null
    this.target = null
    this.options = []
    this.expectedValue = null
    this.shouldValidate = false
    this.validationTriggerMode = []
} as any as IFieldSchemaBuilder

FieldSchemaBuilder.prototype = {
    setTypeData: function (type: SchemaDataTypes) {
        this.type = type
        return this
    },
    setOptionData: function (target: string, options: IOptionItem[]) {
        this.target = target
        this.options = options
        return this
    },
    setExpectedValue: function (expectedValue: any | null) {
        this.expectedValue = expectedValue
        return this
    },
    setDefaultValue: function (defaultValue: any | null) {
        this.defaultValue = defaultValue
        return this
    },
    setValidationData: function (shouldValidate: boolean, validationData?: IValidationSchema) {
        this.pattern = validationData?.pattern
        this.min = validationData?.min
        this.max = validationData?.max
        this.minLength = validationData?.minLength
        this.maxLength = validationData?.maxLength
        this.required = validationData?.required
        this.customGuide = validationData?.customGuide
        this.customError = validationData?.customError
        this.shouldValidate = shouldValidate
        return this
    },
    setValidationTriggerMode: function (validationTriggerMode: ValidationTriggerModeType[]) {
        this.validationTriggerMode = validationTriggerMode
    },
    build: function () {
        return {
            ...this
        } as IFieldSchema
    }
}
