import { IEntityScheme, IFieldSchema } from '../../dependency/schema/fieldSchema/field.schema.types'
import baseOptionSchemaItem from '../../dependency/schema/optionsSchema/options.scheme.function'
import { Validators } from '../../dependency/schema/validationSchema/validation.schema.specific.validators'
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
} from './FormDemo.schema.specific.builders'

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
            baseOptionSchemaItem(0, '0', 'value-0', 'Fraises'),
            baseOptionSchemaItem(1, '1', 'value-1', 'Element A'),
            baseOptionSchemaItem(2, '2', 'value-2', 'Bananes'),
            baseOptionSchemaItem(3, '3', 'value-3', 'Olives'),
            baseOptionSchemaItem(4, '4', 'value-4', 'Validators'),
            baseOptionSchemaItem(5, '5', 'value-5', 'Citrons 3')
        ]).build(),

        CheckBuilder.build(),
        DateTimeBuilder.setValidationData(true, Validators.dateRequiredIso8601Validator).build(),
        RadioBuilder.setOptionData('radioTest', [
            baseOptionSchemaItem(1, '0', 'value-0', 'Value 0'),
            baseOptionSchemaItem(2, '1', 'value-1', 'Value 1'),
            baseOptionSchemaItem(3, '2', 'value-2', 'Value 2')
        ]).build(),
        RteBuilder.build(),
        RangeBuilder.build(),
        UserIdBuilder.setValidationData(true, Validators.eMailRequiredValidator).build(),
        PasswordBuilder.setValidationData(true, Validators.baseRequiredValidator).build(),
        ToggleBuilder.build(),
        Toggle2Builder.build()
    ]
}
