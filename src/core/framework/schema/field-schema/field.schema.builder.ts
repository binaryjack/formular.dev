import { EventsType } from '@core/framework/events/events.types'

import { InputTypeNames } from '@core/framework/common/common.input.types'

import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { IFieldSchema, IFieldSchemaBuilder } from './field.schema.types'

export const FieldSchemaBuilder = function (this: IFieldSchemaBuilder) {
    this.target = null
    this.options = []
    this.expectedValue = null
    this.shouldValidate = false
    this.validationTriggerMode = []
    this.mask = null
} as any as IFieldSchemaBuilder

FieldSchemaBuilder.prototype = {
    setId: function (this: IFieldSchemaBuilder, id: number) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false, // Prevent modification
            configurable: false, // Prevent deletion or redefinition,
            enumerable: true // Make the property visible in enumerations
        })
        return this
    },
    setName: function (this: IFieldSchemaBuilder, name: string) {
        Object.defineProperty(this, 'name', {
            value: name,
            writable: false, // Prevent modification
            configurable: false, // Prevent deletion or redefinition,
            enumerable: true // Make the property visible in enumerations
        })
        return this
    },
    setTypeInput: function (this: IFieldSchemaBuilder, type: InputTypeNames) {
        Object.defineProperty(this, 'type', {
            value: type,
            writable: false, // Prevent modification
            configurable: false, // Prevent deletion or redefinition,
            enumerable: true // Make the property visible in enumerations
        })
        return this
    },
    setValidationData: function (
        this: IFieldSchemaBuilder,
        shouldValidate: boolean,
        validationData?: IValidationOptions
    ) {
        Object.assign(this, {
            shouldValidate: shouldValidate,
            ...validationData
        }) as IFieldSchemaBuilder
    } /**
     * To define a mask you must use # as numeric placeholder
     * example mask: '##/##/####' will be converted to 12/12/2023
     * @param mask
     *
     * @returns
     */,
    setMask: function (this: IFieldSchemaBuilder, mask: string) {
        this.mask = mask
        return this
    },
    setOptionData: function (this: IFieldSchemaBuilder, target: string, options: IOptionItem[]) {
        this.target = target
        this.options = options
        return this
    },
    setExpectedValue: function (this: IFieldSchemaBuilder, expectedValue: any | null) {
        this.expectedValue = expectedValue
        return this
    },
    setDefaultValue: function (this: IFieldSchemaBuilder, defaultValue: any | null) {
        this.defaultValue = defaultValue
        return this
    },
    setValidationTriggerMode: function (
        this: IFieldSchemaBuilder,
        validationTriggerMode: EventsType[]
    ) {
        this.validationTriggerMode = validationTriggerMode
    },
    build: function (this: IFieldSchemaBuilder) {
        return {
            ...this
        } as IFieldSchema
    },
    clone: function (this: IFieldSchemaBuilder) {
        const tempInstance = { ...this } as IFieldSchema
        return Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            tempInstance
        ) as IFieldSchema
    }
}
