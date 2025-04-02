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
} from '../../dependency/schema/fieldSchema/field.schema.specific.builders'
import { IEntityScheme, IFieldSchema } from '../../dependency/schema/fieldSchema/field.schema.types'
import baseOptionSchemaItem from '../../dependency/schema/optionsSchema/options.scheme.function'
import { Validators } from '../../dependency/schema/validationSchema/validation.schema.specific.validators'

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
        IdBuilder.validationData(true, Validators.baseRequiredValidator).build(),
        OrderBuilder.validationData(true, Validators.baseRequiredValidator).build(),
        ShowRoomsBuilder.optionData('Showroom', []).build(),
        InputTextBuilder.validationData(true, Validators.baseRequiredNameValidator).build(),
        SelectIdBuilder.optionData('selectOptionsTest', [
            baseOptionSchemaItem(0, '0', 'value-0', 'Fraises'),
            baseOptionSchemaItem(1, '1', 'value-1', 'Element A'),
            baseOptionSchemaItem(2, '2', 'value-2', 'Bananes'),
            baseOptionSchemaItem(3, '3', 'value-3', 'Olives'),
            baseOptionSchemaItem(4, '4', 'value-4', 'Validators'),
            baseOptionSchemaItem(5, '5', 'value-5', 'Citrons 3')
        ]).build(),

        CheckBuilder.build(),
        DateTimeBuilder.validationData(true, Validators.dateRequiredIso8601Validator).build(),
        RadioBuilder.optionData('radioTest', [
            baseOptionSchemaItem(1, '0', 'value-0', 'Value 0'),
            baseOptionSchemaItem(2, '1', 'value-1', 'Value 1'),
            baseOptionSchemaItem(3, '2', 'value-2', 'Value 2')
        ]).build(),
        RteBuilder.build(),
        RangeBuilder.build(),
        UserIdBuilder.validationData(true, Validators.eMailRequiredValidator).build(),
        PasswordBuilder.validationData(true, Validators.baseRequiredValidator).build(),
        ToggleBuilder.build()
    ]
}
