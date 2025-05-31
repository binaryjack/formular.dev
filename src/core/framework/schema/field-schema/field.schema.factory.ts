import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IOptionItem } from '../options-schema/options.scheme.types'
import { IFieldSchemaBuilder, IFieldSchemeFactory } from './field.schema.types'

export const FieldSchemaFactory = function (this: IFieldSchemeFactory) {
    this.builders = []
} as any as IFieldSchemeFactory

FieldSchemaFactory.prototype = {
    addBuilders: function (...builders: IFieldSchemaBuilder[]) {
        this.builders = [...builders]
    },
    create: function (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: IValidationOptions
    ) {
        const _innerBuilder: IFieldSchemaBuilder = this.builders.find(
            (o: IFieldSchemaBuilder) => o.name === name
        )
        if (!_innerBuilder) {
            console.error(`unable to find the builder for ${name}`)
            return undefined
        }

        return _innerBuilder
            .setOptionData(target, options)
            .setValidationData(shouldValidate, validationOptions)
            .build()
    }
}
