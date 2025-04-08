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
} from '../../../demo/forms/FormDemo.schema.specific.builders'
import { IOptionItem } from '../optionsSchema/options.scheme.types'
import { IValidationSchema } from '../validationSchema/validation.schema.types'
import { IFieldSchemaBuilder, IFieldSchemeFactory } from './field.schema.types'

const FieldSchemaFactory = function (this: IFieldSchemeFactory) {
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
        validationOptions?: IValidationSchema
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

const fieldSchemeFactory = new FieldSchemaFactory()

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
