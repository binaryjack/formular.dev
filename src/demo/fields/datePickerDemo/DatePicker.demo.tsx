import { useMemo } from 'react'
import { DateObject } from '../../../components/datePicker/core/DateObject.object'
import DatePicker from '../../../components/datePicker/DatePicker'
import FormyForm from '../../../components/Formy/Formy.form'
import { Signals } from '../../../core/signals/signal'
import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { demoFormInstance } from './datepicker.form.instance'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// // build a schema for the fields to be used
// const item = controlDemoSchema
// // map schema to fieldsDescriptors collection from schema
// const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

// const { newFieldFromDescriptors, useField } = FieldInputCreator

// const outSideFields = newFieldFromDescriptors(fieldDescriptors)

// outSideFields?.[3].hasChanges(() => {
//     // console.log('Field updated', outSideFields?.[3])
// })

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

export const DatePickerDemo = () => {
    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = new DateObject()
        const ed = new DateObject()

        if (sd && startDate) sd.setFromObject?.(startDate)
        if (ed && endDate) ed.setFromObject?.(endDate)
        console.log('date selected', sd.toString?.('mm/dd/yyyy'), ed.toString?.('mm/dd/yyyy'))
    }

    const fieldSelect = useMemo(() => {
        return demoFormInstance?.fields.find((o) => o.name === 'selectOptionsId')
    }, [demoFormInstance])

    // conventions.IdIsEmpty()

    return (
        <FormyForm formy={demoFormInstance}>
            <DatePicker fieldName={'dateTimeValue'} />
        </FormyForm>
    )
}
