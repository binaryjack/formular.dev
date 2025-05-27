import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'

import { Validators } from '@core/managers/validation-manager/validation-schema/validators'
export const datePickerDemoSchema: IEntityScheme = {
    name: 'datePickerDemoSchema',
    properties: [DateBuilder.setValidationData(true, Validators.baseRequiredNameValidator).build()]
}
