import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'
import { FormOutputFieldsNames } from '@demo/form-demo/form-demo.schema'
import { IEntityScheme, Validators } from 'formular.dev.lib'
export const datePickerDemoSchema: IEntityScheme = {
    name: 'datePickerDemoSchema',
    properties: [
        DateBuilder.setId(7)
            .setName(FormOutputFieldsNames.Date)
            .setValidationData(true, Validators.date(FormOutputFieldsNames.Date, true).build())
            .build()
    ]
}
