import { EventsType } from '@core/framework/events/events.types'

import { InputTypeNames } from '@core/framework/common/common.input.types'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { IValidationSchema } from '../validation-schema/validation.schema.types'
import { IFieldSchema, IFieldSchemaBuilder } from './field.schema.types'

export const FieldSchemaBuilder = function (
    this: IFieldSchemaBuilder,
    id: number,
    name: string,
    type: InputTypeNames
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
    this.mask = null
} as any as IFieldSchemaBuilder

FieldSchemaBuilder.prototype = {
    setTypeData: function (type: InputTypeNames) {
        this.type = type
        return this
    },
    /**
     * To define a mask you must use # as numeric placeholder
     * example mask: '##/##/####' will be converted to 12/12/2023
     * @param mask
     *
     * @returns
     */
    setMask: function (mask: string) {
        this.mask = mask
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
    setPattern: function (pattern: RegExp | undefined) {
        this.pattern = pattern
        return this
    },
    setCustomError: function (customError: string) {
        this.customError = customError
        return this
    },
    setCustomGuider: function (customGuide: string) {
        this.customGuide = customGuide
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
    setValidationTriggerMode: function (validationTriggerMode: EventsType[]) {
        this.validationTriggerMode = validationTriggerMode
    },
    build: function () {
        return {
            ...this
        } as IFieldSchema
    }
}
