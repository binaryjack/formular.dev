import { IFieldDescriptor } from '../../common'
import { SchemaDataTypes } from '../../form.common.enums'
import { IOptionItem } from '../options/options.scheme.types'
import { ISchemaValidationData } from '../validation/validation.types'

export interface IFieldScheme {
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

export interface IFieldSchemeBuilder extends IFieldScheme {
    new (id: number, name: string): IFieldSchemeBuilder
    typeData: (type: SchemaDataTypes) => IFieldSchemeBuilder
    optionData: (target: string | null, options?: IOptionItem[]) => IFieldSchemeBuilder
    valueData: (expectedValue?: any) => IFieldSchemeBuilder
    validationData: (
        shouldValidate: boolean,
        validationData?: ISchemaValidationData
    ) => IFieldSchemeBuilder
    build: () => IFieldScheme
}

export interface IFieldSchemeFatory {
    new (): IFieldSchemeFatory
    builders: IFieldSchemeBuilder[]
    addBuilders: (...builders: IFieldSchemeBuilder[]) => void
    create: (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: ISchemaValidationData
    ) => IFieldScheme | undefined
}

export interface IEntityScheme {
    name: string
    properties: IFieldScheme[]
}

export interface IApplicationScheme {
    name: string
    entities: IEntityScheme[]
}

export interface IAppSchemeToObjectAction {
    scheme: IFieldDescriptor[]
    obj: any
}
