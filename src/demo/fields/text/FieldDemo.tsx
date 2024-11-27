import ValidationResultComponent from '../../../core/field/components/validation/ValidationResult'
import { FieldInputCreators } from '../../../core/field/fieldInputBase/FieldInputBase'
import { IFieldInput } from '../../../core/field/fieldInputBase/fieldInputBase.types'
import { Signals } from '../../../core/signals/signal'
import { ISignal } from '../../../core/signals/signal.type'
import controlDemoSchema from '../../../dependency/schema/demo.schema'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { mapSchemaToFieldDescriptor } from '../../../dependency/toFieldDescriptor'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// build a schema for the fields to be used
const item = controlDemoSchema
// map schema to fieldsDescriptors collection from schema
const fieldDescriptors = mapSchemaToFieldDescriptor(item)

export const textSignal = Signal<string>('text1', '')

const { newFieldFromDescriptors, useField } = FieldInputCreators()

const outSideFields = newFieldFromDescriptors(fieldDescriptors)

outSideFields?.[3].hasChanges(() => {
    console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    const { validationResults } = useField('FieldDemo', outSideFields?.[3] as IFieldInput)

    const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        textSignal.update((s: ISignal<string>) => (s.value = e.currentTarget.value))
    }

    return (
        <div>
            <h1>Text demo</h1>
            <input {...outSideFields?.[3].register()} />
            <div>{outSideFields?.[3].get() as string}</div>
            <div>
                <ValidationResultComponent validationResults={validationResults} />
            </div>
        </div>
    )
}
export default FieldDemo
