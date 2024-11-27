import { SchemaDataTypes } from '../../form.common.enums'
import { IFieldDescriptor } from '../descriptor/field.descriptor'
import { IOptionItem } from '../optionsSchema/options.scheme.types'
import { IValidationSchema } from '../validationSchema/validation.schema.types'

export interface IFieldSchema {
    id: number
    name: string
    type: string
    pattern: string | null
    min: number | null
    max: number | null
    minLength: number | null
    maxLength: number | null
    required: boolean
    customGuide: string | null
    customError: string | null
    target: string | null
    options: IOptionItem[]
    expectedValue: string | null
    shouldValidate: boolean
}

type NewType = IValidationSchema

export interface IFieldSchemaBuilder extends IFieldSchema {
    new (id: number, name: string): IFieldSchemaBuilder
    typeData: (type: SchemaDataTypes) => IFieldSchemaBuilder
    optionData: (target: string | null, options?: IOptionItem[]) => IFieldSchemaBuilder
    valueData: (expectedValue?: any) => IFieldSchemaBuilder
    validationData: (shouldValidate: boolean, validationData?: NewType) => IFieldSchemaBuilder
    build: () => IFieldSchema
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
