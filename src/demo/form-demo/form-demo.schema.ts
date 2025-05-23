import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import baseOptionSchemaItem from '@core/framework/schema/options-schema/options.scheme.function'
import { Validators } from '@core/framework/schema/validation-schema/validators'
import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'
import { IdBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/id-builder'
import { InputTextBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/input-text-builder'
import { OrderBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/order-builder'
import { PasswordBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/password-builder'
import { RangeBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/range-slider-builder'
import { RteBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/rich-text-field-builder'
import { SelectIdBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/select-options-id-builder'
import { ShowRoomsBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/select-showrooms-builder'
import { RadioBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/selected-radio-id-builder'
import { ToggleBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/toggle-builder'
import { Toggle2Builder } from '@demo/form-demo/field-schema-builder/builders-preset/toggle2-builder'
import { CheckBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/true-false-value-builder'
import { UserIdBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/user-name-builder'

export const controlsDemoSchema: IEntityScheme = {
    name: 'demo-schema',
    properties: [
        IdBuilder.setValidationData(true, Validators.baseRequiredValidator).build(),
        OrderBuilder.setValidationData(true, Validators.baseRequiredValidator).build(),
        ShowRoomsBuilder.setOptionData('Showroom', []).build(),
        InputTextBuilder.setValidationData(true, Validators.baseRequiredNameValidator).build(),
        SelectIdBuilder.setOptionData('selectOptionsTest', [
            baseOptionSchemaItem(0, 'selectOptionsTest-0', 'value-0', 'Fraises'),
            baseOptionSchemaItem(1, 'selectOptionsTest-1', 'value-1', 'Element A'),
            baseOptionSchemaItem(2, 'selectOptionsTest-2', 'value-2', 'Bananes'),
            baseOptionSchemaItem(3, 'selectOptionsTest-3', 'value-3', 'Olives'),
            baseOptionSchemaItem(4, 'selectOptionsTest-4', 'value-4', 'Validators'),
            baseOptionSchemaItem(5, 'selectOptionsTest-5', 'value-5', 'Citrons 3'),
            baseOptionSchemaItem(6, 'selectOptionsTest-6', 'value-6', 'Citrons 4')
        ]).build(),

        CheckBuilder.build(),
        DateBuilder.setValidationData(true, Validators.dateRequiredIso8601Validator).build(),
        RadioBuilder.setOptionData('radioTest', [
            baseOptionSchemaItem(0, 'radioTest-0', 'value-0', 'Value 0'),
            baseOptionSchemaItem(1, 'radioTest-1', 'value-1', 'Value 1'),
            baseOptionSchemaItem(2, 'radioTest-2', 'value-2', 'Value 2'),
            baseOptionSchemaItem(3, 'radioTest-3', 'value-3', 'Value 3'),
            baseOptionSchemaItem(4, 'radioTest-4', 'value-4', 'Value 4'),
            baseOptionSchemaItem(5, 'radioTest-5', 'value-5', 'Value 5')
        ]).build(),
        RteBuilder.build(),
        RangeBuilder.build(),
        UserIdBuilder.setValidationData(true, Validators.eMailRequiredValidator).build(),
        PasswordBuilder.setValidationData(true, Validators.baseRequiredValidator).build(),
        ToggleBuilder.build(),
        Toggle2Builder.build()
    ]
}
