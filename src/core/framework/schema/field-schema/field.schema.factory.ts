import { IOptionItem } from '../options-schema/options.scheme.types'
import { IValidationSchema } from '../validation-schema/validation.schema.types'
import { IFieldSchemaBuilder, IFieldSchemeFactory } from './field.schema.types'
import { DateBuilder } from './settings/date-builder'

import { IdBuilder } from './settings/id-builder'
import { InputTextBuilder } from './settings/input-text-builder'
import { OrderBuilder } from './settings/order-builder'
import { PasswordBuilder } from './settings/password-builder'
import { RangeBuilder } from './settings/range-slider-builder'
import { RteBuilder } from './settings/rich-text-field-builder'
import { SelectIdBuilder } from './settings/select-options-id-builder'
import { ShowRoomsBuilder } from './settings/select-showrooms-builder'
import { RadioBuilder } from './settings/selected-radio-id-builder'
import { ToggleBuilder } from './settings/toggle-builder'
import { CheckBuilder } from './settings/true-false-value-builder'
import { UserIdBuilder } from './settings/user-name-builder'

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
    DateBuilder,
    RadioBuilder,
    RteBuilder,
    RangeBuilder,
    UserIdBuilder,
    PasswordBuilder,
    ToggleBuilder
)

export default fieldSchemeFactory
