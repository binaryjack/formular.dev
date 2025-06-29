import { useState } from 'react'

import InputText from '@components/input-text/input-text'

import CheckInput from '@components/check-Input/check-input'

import Password from '@components/password/password'
import RadioInput from '@components/radio-input/radio-input'
import { RangeSlider } from '@components/range-slider/range-slider'
import { ReadOnlyField } from '@components/readonly-field/readonly-field'

import DatePicker from '@components/date-picker/date-picker'
import FormularForm from '@components/formular-form/formular-form'
import RteInputField from '@components/rte-Input/rte-input-field'
import Select from '@components/select-input/select-input'
import SwitchButtonInput from '@components/switch-button/switch-button-input'
import ToggleButtonInput from '@components/toggle-button/toggle-button-input'

import { useService } from '@adapters/react'
import { useField } from '@adapters/react/fields/hooks/use-field'
import { useDemoSettings } from '@demo/validation-demos/hooks/useDemoSettings'
import { ISubmitObject } from '@demo/validation-demos/validation-demo-text-input'
import {
    DateFormatsEnum,
    DateObject,
    IConfigurationManager,
    IFieldDescriptor,
    IFormular,
    IFormularManager,
    INDate,
    SConfigurationManager,
    SFormularManager
} from 'formular.dev.lib'
import { FormOutputFieldsNames, controlsDemoSchema } from './form-demo.schema'

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
    const { getService } = useService()

    const formularManager = getService<IFormularManager>(SFormularManager)
    const configurationManager = getService<IConfigurationManager>(SConfigurationManager)

    const formular = formularManager?.createFromSchema(
        controlsDemoSchema
    ) as IFormular<ISubmitObject>

    const { instance } = useField(formular.fields[0])

    const [internalForm] = useState<IFormular<ISubmitObject> | null>(formular)

    const { triggerKeyWord } = useDemoSettings<ISubmitObject>(
        instance,
        internalForm,
        {},
        'onFocus',
        'onBlur',
        'onChange',
        'onSubmit',
        'onClear',
        'validateOnFormFirstSubmit'
    )

    formular.setTriggerKeyWord(triggerKeyWord)

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
            sd.toString?.(DateFormatsEnum.YYYY_MM_DD),
            ed.toString?.(DateFormatsEnum.YYYY_MM_DD)
        )
    }

    return (
        <FormularForm formular={formular} onSubmit={handleSubmit}>
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
