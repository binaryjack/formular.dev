import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { Validators } from '../../../dependency/schema/validationSchema/validation.schema.specific.validators'
import { DatePickerBuilder } from './DatePicker.schema.specific.builders'

export const dateTimeSchema: IEntityScheme = {
    name: 'date-picker-demo-schema',
    properties: [
        DatePickerBuilder.validationData(true, Validators.dateRequiredIso8601Validator).build()
    ]
}
