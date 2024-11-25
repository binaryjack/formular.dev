import { IOptionItem } from '../options/options.scheme.types'
import { ISchemaValidationData } from '../validation/validation.types'
import { IFieldSchemeBuilder, IFieldSchemeFatory } from './field.scheme.types'

export const FieldSchemeFactory = function (this: IFieldSchemeFatory) {
    this.builders = []
} as any as IFieldSchemeFatory

FieldSchemeFactory.prototype = {
    addBuilders: function (...builders: IFieldSchemeBuilder[]) {
        this.builders = [...builders]
    },
    create: function (
        name: string,
        target: string | null,
        options: IOptionItem[],
        shouldValidate: boolean,
        validationOptions?: ISchemaValidationData
    ) {
        const _innerBuilder: IFieldSchemeBuilder = this.builders.find(
            (o: IFieldSchemeBuilder) => o.name === name
        )
        if (!_innerBuilder) {
            console.error(`unable to find the builder for ${name}`)
            return undefined
        }

        return _innerBuilder
            .optionData(target, options)
            .validationData(shouldValidate, validationOptions)
            .build()
    }
}
