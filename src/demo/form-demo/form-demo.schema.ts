import { IEntityScheme, IFieldSchema } from '@core/framework/schema/field-schema/field.schema.types'
import baseOptionSchemaItem from '@core/framework/schema/options-schema/options.scheme.function'
import { Validators } from '@core/framework/schema/validation-schema/validators'
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
    Toggle2Builder,
    ToggleBuilder,
    UserIdBuilder
} from './form-demo.schema.specific.builders'

export type newEntitySchemeObjectType = (
    name: string,
    ...properties: IFieldSchema[]
) => IEntityScheme

export const newEntityScheme = (name: string, ...properties: IFieldSchema[]): IEntityScheme => {
    return { name: name, properties: properties } as IEntityScheme
}

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
        DateTimeBuilder.setValidationData(true, Validators.dateRequiredIso8601Validator).build(),
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
