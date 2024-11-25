import { FieldSchemeBuilder } from './field/field.scheme.builder'
import { IEntityScheme } from './field/field.scheme.types'
import baseOptionSchemaItem from './options/options.scheme.function'

const controlDemoSchema: IEntityScheme = {
    name: 'demo-schema',
    properties: [
        new FieldSchemeBuilder(1, 'id').typeData('string').build(),
        new FieldSchemeBuilder(2, 'order').typeData('number').build(),
        new FieldSchemeBuilder(3, 'selectShowrooms')
            .typeData('select')
            .optionData('Showroom', [])
            .build(),
        new FieldSchemeBuilder(4, 'inputControl').typeData('string').build(),
        new FieldSchemeBuilder(5, 'selectOptionsId')
            .typeData('select')
            .optionData('selectOptionsTest', [
                baseOptionSchemaItem(0, '0', 'value-0', 'Fraises'),
                baseOptionSchemaItem(1, '1', 'value-1', 'Element A'),
                baseOptionSchemaItem(2, '2', 'value-2', 'Bananes'),
                baseOptionSchemaItem(3, '3', 'value-3', 'Olives'),
                baseOptionSchemaItem(4, '4', 'value-4', 'Marrons'),
                baseOptionSchemaItem(5, '5', 'value-5', 'Citrons 3')
            ])
            .build(),

        new FieldSchemeBuilder(6, 'trueFalseValue').typeData('check').build(),
        new FieldSchemeBuilder(7, 'dateTimeValue').typeData('datetime').build(),
        new FieldSchemeBuilder(8, 'selectedRadioId')
            .typeData('radio')
            .optionData('radioTest', [
                baseOptionSchemaItem(1, '0', 'value-0', 'Value 0'),
                baseOptionSchemaItem(2, '1', 'value-1', 'Value 1'),
                baseOptionSchemaItem(3, '2', 'value-2', 'Value 2')
            ])
            .build(),
        new FieldSchemeBuilder(9, 'richTextField').typeData('textarea').build(),
        new FieldSchemeBuilder(10, 'rangeSlider').typeData('range').build(),
        new FieldSchemeBuilder(11, 'userName').typeData('string').build(),
        new FieldSchemeBuilder(12, 'password').typeData('string').build(),
        new FieldSchemeBuilder(13, 'toggle').typeData('toggle').build()
    ]
}
export default controlDemoSchema
