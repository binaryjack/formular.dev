import { useMemo } from 'react'

import InputText from '@components/input-text/input-text'

import CheckInput from '@components/check-Input/check-Input'

import FormyForm from '@components/formy/formy.form'
import Password from '@components/password/password'
import RadioInput from '@components/radio-input/radio-input'
import { RangeSlider } from '@components/range-slider/range-slider'
import { ReadOnlyField } from '@components/readonly-field/readonly-field'

import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import DatePicker from '@components/date-picker/date-picker'
import RteInputField from '@components/rte-Input/rte-input-field'
import Select from '@components/select-input/select-input'
import SwitchButtonInput from '@components/switch-button/switch-button-input'
import ToggleButtonInput from '@components/toggle-button/toggle-button-input'
import { INDate } from '@core/framework/schema/descriptor/field.data.date.struct'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { Signals } from '../../core/signals/signal'
import { demoFormInstance } from './form-demo.instance'

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

    return (
        <FormyForm formy={demoFormInstance} onSubmit={handleSubmit}>
            {/* <DatePickerContentDrawer
                onSelectDate={onSelectDate}
                id={'DatePickerDrawerDemoStatic'}
            />
            <SelectDrawerContent
                filterTriggerDelay={500}
                items={fieldSelect?.options ?? []}
                onSelectItem={(value) => fieldSelect?.onSelectItem(value)}
            /> */}

            <ReadOnlyField fieldName={'id'} />
            <ReadOnlyField fieldName={'order'} />
            <ReadOnlyField fieldName={'userName'} />
            <InputText fieldName={'inputControl'} />
            <Select fieldName={'selectOptionsId'} />
            <Password fieldName={'password'} />
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
            <ToggleButtonInput fieldName={'toggle'}>test</ToggleButtonInput>
            <SwitchButtonInput
                fieldName={'toggle2'}
                options={{ orientation: 'horizontal', variant: 'success', size: 'sm' }}
            />
        </FormyForm>
    )
}
export default FormDemo
