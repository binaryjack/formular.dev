import { InputTypeNames } from '@core/framework/common/common.input.types'
import { EventsType } from '@core/framework/events/events.types'

import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IValidationSchema } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldDescriptor } from '../descriptor/field.descriptor'
import { IOptionItem } from '../options-schema/options.scheme.types'

export interface IFieldSchema {
    readonly id: number | null
    readonly name: string | null
    readonly type: InputTypeNames
    pattern: RegExp | null
    min: number | null
    max: number | null
    minLength: number | null
    maxLength: number | null
    required: boolean
    customGuide: string | null
    customError: string | null
    target: string | null
    options: IOptionItem[]
    defaultValue: string | null
    expectedValue: string | null
    shouldValidate: boolean
    validationTriggerMode: EventsType[] | never[]
    mask: string | null
}

type TValidationType = IValidationSchema

export interface IFieldSchemaBuilder extends IFieldSchema {
    new (): IFieldSchemaBuilder
    setId: (id: number) => IFieldSchemaBuilder
    setName: (name: string) => IFieldSchemaBuilder
    setTypeInput: (type: InputDataTypes) => IFieldSchemaBuilder
    setMask: (mask: string) => IFieldSchemaBuilder
    setOptionData: (target: string | null, options?: IOptionItem[]) => IFieldSchemaBuilder
    setExpectedValue: (expectedValue?: any) => IFieldSchemaBuilder
    setDefaultValue: (defaultValue?: any) => IFieldSchemaBuilder
    setValidationData: (
        shouldValidate: boolean,
        validationData?: TValidationType
    ) => IFieldSchemaBuilder
    setValidationTriggerMode: (validationTriggerMode: EventsType[]) => IFieldSchemaBuilder
    build: () => IFieldSchema
    clone: () => IFieldSchema
}

export interface IFieldSchemeFactory {
    new (): IFieldSchemeFactory
    builders: IFieldSchemaBuilder[]
    addBuilders: (...builders: IFieldSchemaBuilder[]) => void
    create: (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: IValidationSchema
    ) => IFieldSchema | undefined
}
/**
 * this interface represents an entity
 * name is the name of the entity
 * properties is an array of field schema
 */
export interface IEntityScheme {
    name: string
    properties: IFieldSchema[]
}

export interface IApplicationScheme {
    name: string
    entities: IEntityScheme[]
}

export interface IAppSchemeToObjectAction {
    scheme: IFieldDescriptor[]
    obj: any
}
