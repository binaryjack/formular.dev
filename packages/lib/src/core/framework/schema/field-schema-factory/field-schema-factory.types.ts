import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldSchema, IFieldSchemaBuilder } from '../field-schema/field-schema-types'
import { IOptionItem } from '../options-schema/options.scheme.types'

export interface IFieldSchemeFactory {
    new (): IFieldSchemeFactory
    builders: IFieldSchemaBuilder[]
    addBuilders: (...builders: IFieldSchemaBuilder[]) => void
    create: (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: IValidationOptions
    ) => IFieldSchema | undefined
}
