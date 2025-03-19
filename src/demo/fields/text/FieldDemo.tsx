import { conventions } from '../../../components/context/conventions/conventions'
import FieldSet from '../../../components/fieldset/FieldSet'
import ValidationResultComponent from '../../../components/validationResult/ValidationResult'
import { FieldInputCreator } from '../../../core/base/fieldInputBase/FieldInput.creator'
import { Signals } from '../../../core/signals/signal'
import { getTranslationBuilder, getTranslations } from '../../../dependency/localize/localize.utils'
import controlDemoSchema from '../../../dependency/schema/demo.schema'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { mapSchemaToFieldDescriptor } from '../../../dependency/toFieldDescriptor'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// build a schema for the fields to be used
const item = controlDemoSchema
// map schema to fieldsDescriptors collection from schema
const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

const { newFieldFromDescriptors, useField } = FieldInputCreator

const outSideFields = newFieldFromDescriptors(fieldDescriptors)

outSideFields?.[3].hasChanges(() => {
    // console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    const { field, flags } = useField(outSideFields.find((o) => o.name === 'inputControl'))

    return (
        <div>
            <FieldSet
                inputId={field?.name ?? conventions.IdIsEmpty()}
                label={field?.label}
                type={field?.type}
                flags={flags}
                validationChildren={
                    <ValidationResultComponent validationResults={field?.validationResults ?? []} />
                }
                onClear={() => field?.clear()}
            >
                <input data-class="base-input" {...field?.register()} ref={field?.ref()} />
            </FieldSet>

            <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button>
        </div>
    )
}
export default FieldDemo
