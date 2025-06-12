import { useMemo } from 'react'

import InputText from '@components/input-text/input-text'

import CheckInput from '@components/check-Input/check-Input'

import Password from '@components/password/password'
import RadioInput from '@components/radio-input/radio-input'
import { RangeSlider } from '@components/range-slider/range-slider'
import { ReadOnlyField } from '@components/readonly-field/readonly-field'

import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import DatePicker from '@components/date-picker/date-picker'
import FormularForm from '@components/formular-form/formular-form'
import RteInputField from '@components/rte-Input/rte-input-field'
import Select from '@components/select-input/select-input'
import SwitchButtonInput from '@components/switch-button/switch-button-input'
import ToggleButtonInput from '@components/toggle-button/toggle-button-input'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { INDate } from '@core/framework/schema/descriptor/i-n-date'

import { demoFormInstance } from './form-demo.instance'
import { FormOutputFieldsNames } from './form-demo.schema'

// build a schema for the fields to be used
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
    const handleSubmit = (data: any) => {
        console.log(data)
    }

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = new DateObject()
        const ed = new DateObject()

        if (sd && startDate) sd.setFromObject?.(startDate)
        if (ed && endDate) ed.setFromObject?.(endDate)
        console.log(
            'date selected',
            sd.toString?.(DatePickerFormatsEnum.YYYY_MM_DD),
            ed.toString?.(DatePickerFormatsEnum.YYYY_MM_DD)
        )
    }

    const fieldSelect = useMemo(() => {
        return demoFormInstance?.fields.find((o: any) => o.name === 'selectOptionsId')
    }, [demoFormInstance])

    if (!demoFormInstance) {
        return <>Unable to locate demoFormInstance!</>
    }

    return (
        <FormularForm formular={demoFormInstance} onSubmit={handleSubmit}>
            {/* <DatePickerContentDrawer
                onSelectDate={onSelectDate}
                id={'DatePickerDrawerDemoStatic'}
            />
            <SelectDrawerContent
                filterTriggerDelay={500}
                items={fieldSelect?.options ?? []}
                onSelectItem={(value) => fieldSelect?.onSelectItem(value)}
            /> */}

            <ReadOnlyField fieldName={FormOutputFieldsNames.Id} />
            <ReadOnlyField fieldName={FormOutputFieldsNames.Order} />
            <ReadOnlyField fieldName={FormOutputFieldsNames.UserId} />
            <InputText fieldName={FormOutputFieldsNames.InputText} />
            <Select fieldName={FormOutputFieldsNames.SelectOptionsTest} />
            <Password fieldName={FormOutputFieldsNames.Password} />
            <CheckInput fieldName={FormOutputFieldsNames.Check} />
            <RadioInput fieldName={FormOutputFieldsNames.SelectedRadioId} />
            <DatePicker fieldName={FormOutputFieldsNames.Date} />
            <RangeSlider
                fieldName={FormOutputFieldsNames.RangeSlider}
                min={0}
                max={100}
                step={5}
                behavior={'snap'}
                handleStyle="circle"
                handlerStyleWidth={15}
                handlerStyleHeight={15}
            />
            <RteInputField fieldName={FormOutputFieldsNames.Rte} />
            <ToggleButtonInput fieldName={FormOutputFieldsNames.Toggle}>test</ToggleButtonInput>
            <SwitchButtonInput
                fieldName={FormOutputFieldsNames.Toggle2}
                options={{ orientation: 'horizontal', variant: 'success', size: 'sm' }}
            />
        </FormularForm>
    )
}
export default FormDemo
