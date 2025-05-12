import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { DateBuilder } from '@core/framework/schema/field-schema/settings/date-builder'

import { Validators } from '@core/framework/schema/validation-schema/validators'
export const datePickerDemoSchema: IEntityScheme = {
    name: 'datePickerDemoSchema',
    properties: [DateBuilder.setValidationData(true, Validators.baseRequiredNameValidator).build()]
}
