import InputText from '../../core/field/components/inputs/inputText.tsx/InputText'
import Select from '../../core/field/components/inputs/selectInput.tsx/Select'
import { FormCreator } from '../../core/form/formyBase/Formy.creator'
import { Signals } from '../../core/signals/signal'
import { getTranslationBuilder, getTranslations } from '../../dependency/localize/localize.utils'
import controlDemoSchema from '../../dependency/schema/demo.schema'
import { IFieldDescriptor } from '../../dependency/schema/descriptor/field.descriptor'

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

const { getFieldHook, getFormFlags, newFormy } = FormCreator

export const formy = newFormy('formDemo', controlDemoSchema, getTranslationBuilder, getTranslations)

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FormDemo = () => {
    // const { field: inputControlField, flags: inputControlFlags } = useField(
    //     'inputControl',
    //     outSideFields
    // )
    // const { field: selectControlField, flags: selectControlFlags } = useField(
    //     'selectOptionsId',
    //     outSideFields
    // )
    return (
        <div>
            <InputText formId={'formDemo'} fieldName={'inputControl'} />
            <Select formId={'formDemo'} fieldName={'selectOptionsId'} />
        </div>
    )
}
export default FormDemo
