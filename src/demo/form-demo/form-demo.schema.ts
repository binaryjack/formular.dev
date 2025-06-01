import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import baseOptionSchemaItem from '@core/framework/schema/options-schema/options.scheme.function'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'
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

export interface IFormOutput {
    id: number
    order: number
    showRooms: string[]
    inputText: string
    selectOptionsTest: string
    selectedRadioId: string
    check: boolean
    date: string
    rte: string
    rangeSlider: number
    userId: string
    password: string
    toggle: boolean
    toggle2: boolean
}

export enum FormOutputFieldsNames {
    Id = 'id',
    Order = 'order',
    ShowRooms = 'showRooms',
    InputText = 'inputText',
    SelectOptionsTest = 'selectOptionsTest',
    SelectedRadioId = 'selectedRadioId',
    Check = 'check',
    Date = 'date',
    Rte = 'rte',
    RangeSlider = 'rangeSlider',
    UserId = 'userId',
    Password = 'password',
    Toggle = 'toggle',
    Toggle2 = 'toggle2'
}

export const formOutput: IFormOutput = {
    id: 0,
    order: 0,
    showRooms: [],
    inputText: '',
    selectOptionsTest: '',
    selectedRadioId: '',
    check: false,
    date: '',
    rte: '',
    rangeSlider: 0,
    userId: '',
    password: '',
    toggle: false,
    toggle2: false
}

export const controlsDemoSchema: IEntityScheme = {
    name: 'demo-schema',
    properties: [
        IdBuilder.setId(1)
            .setName(FormOutputFieldsNames.Id)
            .build(),
        OrderBuilder.setId(2)
            .setName(FormOutputFieldsNames.Order)
            .build(),
        ShowRoomsBuilder.setId(3)
            .setName(FormOutputFieldsNames.ShowRooms)
            .setOptionData(FormOutputFieldsNames.ShowRooms, [])
            .build(),
        InputTextBuilder.setId(4)
            .setName(FormOutputFieldsNames.InputText)
            .setValidationData(true, Validators.baseRequiredNameValidator)
            .build(),
        SelectIdBuilder.setId(5)
            .setName(FormOutputFieldsNames.SelectOptionsTest)
            .setOptionData(FormOutputFieldsNames.SelectOptionsTest, [
                baseOptionSchemaItem(0, 'selectOptionsTest-0', 'value-0', 'Fraises'),
                baseOptionSchemaItem(1, 'selectOptionsTest-1', 'value-1', 'Element A'),
                baseOptionSchemaItem(2, 'selectOptionsTest-2', 'value-2', 'Bananes'),
                baseOptionSchemaItem(3, 'selectOptionsTest-3', 'value-3', 'Olives'),
                baseOptionSchemaItem(4, 'selectOptionsTest-4', 'value-4', 'Validators'),
                baseOptionSchemaItem(5, 'selectOptionsTest-5', 'value-5', 'Citrons 3'),
                baseOptionSchemaItem(6, 'selectOptionsTest-6', 'value-6', 'Citrons 4')
            ])
            .build(),

        CheckBuilder.setId(6).setName(FormOutputFieldsNames.Check).build(),
        DateBuilder.setId(7)
            .setName(FormOutputFieldsNames.Date)
            .setValidationData(true, Validators.dateRequiredIso8601Validator)
            .build(),
        RadioBuilder.setId(8)
            .setName(FormOutputFieldsNames.SelectedRadioId)
            .setOptionData(FormOutputFieldsNames.SelectedRadioId, [
                baseOptionSchemaItem(0, 'radioTest-0', 'value-0', 'Value 0'),
                baseOptionSchemaItem(1, 'radioTest-1', 'value-1', 'Value 1'),
                baseOptionSchemaItem(2, 'radioTest-2', 'value-2', 'Value 2'),
                baseOptionSchemaItem(3, 'radioTest-3', 'value-3', 'Value 3'),
                baseOptionSchemaItem(4, 'radioTest-4', 'value-4', 'Value 4'),
                baseOptionSchemaItem(5, 'radioTest-5', 'value-5', 'Value 5')
            ])
            .build(),
        RteBuilder.setId(9).setName(FormOutputFieldsNames.Rte).build(),
        RangeBuilder.setId(10).setName(FormOutputFieldsNames.RangeSlider).build(),
        UserIdBuilder.setId(11)
            .setName(FormOutputFieldsNames.UserId)
            .setValidationData(true, Validators.eMailRequiredValidator)
            .build(),
        PasswordBuilder.setId(12)
            .setName(FormOutputFieldsNames.Password)
            .setValidationData(true, Validators.baseRequiredValidator)
            .build(),
        ToggleBuilder.setId(13).setName(FormOutputFieldsNames.Toggle).build(),
        Toggle2Builder.setId(14).setName(FormOutputFieldsNames.Toggle2).build()
    ]
}
