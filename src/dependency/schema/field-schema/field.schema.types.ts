import { ValidationTriggerModeType } from '../../../core/base/validation-strategy/validator.types'
import { SchemaDataTypes } from '../../form.common.enums'
import { IFieldDescriptor } from '../descriptor/field.descriptor'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { IValidationSchema } from '../validation-schema/validation.schema.types'

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
    defaultValue: string | null
    expectedValue: string | null
    shouldValidate: boolean
    validationTriggerMode: ValidationTriggerModeType[] | never[]
}

type TValidationType = IValidationSchema

export interface IFieldSchemaBuilder extends IFieldSchema {
    new (id: number, name: string): IFieldSchemaBuilder
    setTypeData: (type: SchemaDataTypes) => IFieldSchemaBuilder
    setOptionData: (target: string | null, options?: IOptionItem[]) => IFieldSchemaBuilder
    setExpectedValue: (expectedValue?: any) => IFieldSchemaBuilder
    setDefaultValue: (defaultValue?: any) => IFieldSchemaBuilder
    setValidationData: (
        shouldValidate: boolean,
        validationData?: TValidationType
    ) => IFieldSchemaBuilder
    setValidationTriggerMode: (
        validationTriggerMode: ValidationTriggerModeType[]
    ) => IFieldSchemaBuilder
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
