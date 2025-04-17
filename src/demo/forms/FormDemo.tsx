import { useMemo } from 'react'

import CheckInput from '../../components/checkInput/CheckInput'
import { DateObject } from '../../components/datePicker/core/DateObject.object'
import DatePicker from '../../components/datePicker/DatePicker'
import FormyForm from '../../components/formy/Formy.form'
import InputText from '../../components/inputText/InputText'
import RadioInput from '../../components/radioInput/RadioInput'

import { RangeSlider } from '../../components/rangeSlider/RangeSlider'
import RteInputField from '../../components/rteInput/RteInputField'
import Select from '../../components/selectInput/Select'
import { Signals } from '../../core/signals/signal'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { IFieldDescriptor } from '../../dependency/schema/descriptor/field.descriptor'
import { demoFormInstance } from './FormDemo.instance'

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

const FormDemo = () => {
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

    return (
        <FormyForm formy={demoFormInstance}>
            {/* <DatePickerContentDrawer
                onSelectDate={onSelectDate}
                id={'DatePickerDrawerDemoStatic'}
            />
            <SelectDrawerContent
                filterTriggerDelay={500}
                items={fieldSelect?.options ?? []}
                onSelectItem={(value) => fieldSelect?.onSelectItem(value)}
            /> */}
            <InputText fieldName={'inputControl'} />
            <Select fieldName={'selectOptionsId'} />

            <CheckInput fieldName={'trueFalseValue'} />
            <RadioInput fieldName={'selectedRadioId'} />
            <DatePicker fieldName={'dateTimeValue'} />

            <RangeSlider
                fieldName={'rangeSlider'}
                min={0}
                max={100}
                step={5}
                behavior={'snap'}
                handleStyle="circle"
                handlerStyleWidth={15}
                handlerStyleHeight={15}
            />

            <RteInputField fieldName={'richTextField'} />
        </FormyForm>
    )
}
export default FormDemo
