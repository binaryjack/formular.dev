import CheckInput from '../../components/checkInput/CheckInput'
import DateInput from '../../components/datePicker/DatePicker'
import FormyForm from '../../components/Formy/Formy.form'
import InputText from '../../components/inputText/InputText'
import RadioInput from '../../components/radioInput/RadioInput'
import Select from '../../components/selectInput.tsx/Select'
import { Signals } from '../../core/signals/signal'
import { IFieldDescriptor } from '../../dependency/schema/descriptor/field.descriptor'
import { demoFormInstance } from './DormDemo.instance'

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
    return (
        <FormyForm formy={demoFormInstance}>
            <InputText fieldName={'inputControl'} />
            <Select fieldName={'selectOptionsId'} />
            <CheckInput fieldName={'trueFalseValue'} />
            <RadioInput fieldName={'selectedRadioId'} />
            <DateInput fieldName={'dateTimeValue'} />
        </FormyForm>
    )
}
export default FormDemo
