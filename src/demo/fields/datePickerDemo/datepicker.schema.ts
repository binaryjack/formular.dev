import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { Validators } from '../../../dependency/schema/validationSchema/validators'
import { DatePickerBuilder } from './DatePicker.schema.specific.builders'

export const dateTimeSchema: IEntityScheme = {
    name: 'date-picker-demo-schema',
    properties: [
        DatePickerBuilder.setValidationData(true, Validators.dateRequiredIso8601Validator).build()
    ]
}
