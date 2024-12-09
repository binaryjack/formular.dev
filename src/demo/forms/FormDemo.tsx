import InputText from '../../core/field/components/inputs/inputText.tsx/InputText'
import { FieldInputCreator } from '../../core/field/fieldInputBase/FieldInput.creator'
import { Signals } from '../../core/signals/signal'
import { getTranslationBuilder, getTranslations } from '../../dependency/localize/localize.utils'
import controlDemoSchema from '../../dependency/schema/demo.schema'
import { IFieldDescriptor } from '../../dependency/schema/descriptor/field.descriptor'
import { mapSchemaToFieldDescriptor } from '../../dependency/toFieldDescriptor'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// build a schema for the fields to be used
const item = controlDemoSchema
// map schema to fieldsDescriptors collection from schema
const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

const { newFieldFromDescriptors, useField } = FieldInputCreator()

const outSideFields = newFieldFromDescriptors(fieldDescriptors)

outSideFields?.[3].hasChanges(() => {
    // console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FormDemo = () => {
    const { field: inputControlField, flags: inputControlFlags } = useField(
        'inputControl',
        outSideFields
    )

    return (
        <div>
            <InputText field={inputControlField} flags={inputControlFlags} />
        </div>
    )
}
export default FormDemo
