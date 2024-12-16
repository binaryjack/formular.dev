import CheckInput from '../../core/field/components/inputs/checkInput/CheckText'
import InputText from '../../core/field/components/inputs/inputText.tsx/InputText'
import Select from '../../core/field/components/inputs/selectInput.tsx/Select'
import FormyForm from '../../core/form/components/Formy/Formy.form'
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
        </FormyForm>
    )
}
export default FormDemo
