import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import {
    IEntityScheme,
    IFieldSchema,
    IFieldSchemaBuilder
} from '../field-schema/field-schema-types'
import { IOptionItem } from '../option-schema/options.scheme.types'

export interface IFieldSchemeFactory {
    new (name: string): IFieldSchemeFactory
    name: string
    builders: IFieldSchemaBuilder[]
    addBuilders: (...builders: IFieldSchemaBuilder[]) => IFieldSchemeFactory
    create: (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: IValidationOptions
    ) => IFieldSchema | undefined
    build: () => IEntityScheme
}
