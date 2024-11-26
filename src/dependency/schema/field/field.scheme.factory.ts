import { IOptionItem } from '../options/options.scheme.types'
import { ISchemaValidationData } from '../validation/validation.types'
import { IFieldSchemeBuilder, IFieldSchemeFactory } from './field.scheme.types'
import {
    CheckBuilder,
    DateTimeBuilder,
    IdBuilder,
    InputTextBuilder,
    OrderBuilder,
    PasswordBuilder,
    RadioBuilder,
    RangeBuilder,
    RteBuilder,
    SelectIdBuilder,
    ShowRoomsBuilder,
    ToggleBuilder,
    UserIdBuilder
} from './field.schemes.builders'

const FieldSchemeFactory = function (this: IFieldSchemeFactory) {
    this.builders = []
} as any as IFieldSchemeFactory

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

const fieldSchemeFactory = new FieldSchemeFactory()

fieldSchemeFactory.addBuilders(
    IdBuilder,
    OrderBuilder,
    ShowRoomsBuilder,
    InputTextBuilder,
    SelectIdBuilder,
    CheckBuilder,
    DateTimeBuilder,
    RadioBuilder,
    RteBuilder,
    RangeBuilder,
    UserIdBuilder,
    PasswordBuilder,
    ToggleBuilder
)

export default fieldSchemeFactory
