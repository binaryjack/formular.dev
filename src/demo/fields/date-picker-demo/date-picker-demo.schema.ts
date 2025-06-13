import { IEntityScheme } from '@core/framework/schema/field-schema/field-schema-types'

import { Validators } from '@core/managers/validation-manager/validation-schema/validators'
import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'
import { FormOutputFieldsNames } from '@demo/form-demo/form-demo.schema'
export const datePickerDemoSchema: IEntityScheme = {
    name: 'datePickerDemoSchema',
    properties: [
        DateBuilder.setId(7)
            .setName(FormOutputFieldsNames.Date)
            .setValidationData(true, Validators.date(FormOutputFieldsNames.Date, true).build())
            .build()
    ]
}
