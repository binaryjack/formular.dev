import ValidationResultComponent from '../../../core/field/components/validation/ValidationResult'
import { FieldInputCreators } from '../../../core/field/fieldInputBase/FieldInputBase'
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

const { newFieldFromDescriptors, useField } = FieldInputCreators()

const outSideFields = newFieldFromDescriptors(fieldDescriptors)

outSideFields?.[3].hasChanges(() => {
    // console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    const { validationResults, field } = useField('inputControl', outSideFields)

    return (
        <div>
            <label htmlFor={`${field?.id}`}>{field?.label}</label>
            <input {...field?.register()} ref={field?.ref()} />
            <div>{field?.get() as string}</div>
            <div>
                <ValidationResultComponent validationResults={validationResults} />
            </div>

            <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button>
        </div>
    )
}
export default FieldDemo
