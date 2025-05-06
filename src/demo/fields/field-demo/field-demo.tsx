import { conventions } from '@components/context/conventions/conventions'
import FieldSet from '@components/field-set/field-set'
import ValidationResultComponent from '@components/validation-result/validation-result'
import { FieldInputCreator } from '@core/fields/field-base-input/field-input.creator'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'

import { useField } from '@core/factory/react/hooks/use-field'
import { IExtendedFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { Signals } from '../../../core/signals/signal'
import { controlsDemoSchema } from '../../form-demo/form-demo.schema'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// build a schema for the fields to be used
const item = controlsDemoSchema
// map schema to fieldsDescriptors collection from schema
const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

const { newFieldFromDescriptors } = FieldInputCreator

const outSideFields = newFieldFromDescriptors(fieldDescriptors)

outSideFields?.[3].hasChanges(() => {
    // console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    const { instance, flags } = useField(
        outSideFields.find((o) => o.name === 'inputControl') as unknown as IExtendedFieldInput
    )

    return (
        <div>
            <FieldSet
                inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
                label={instance?.field?.label}
                type={instance?.field?.type}
                flags={flags}
                validationChildren={
                    <ValidationResultComponent
                        validationResults={instance?.field?.validationResults ?? []}
                    />
                }
                onClear={() => instance?.field?.clear()}
            >
                <input
                    data-class="base-input"
                    {...instance?.field?.register()}
                    ref={(r) => instance?.field?.ref(r)}
                />
            </FieldSet>

            <button onClick={() => instance?.field?.setFocus()}>focus Field</button>
            <button onClick={() => instance?.field?.enable(true)}>enable</button>
            <button onClick={() => instance?.field?.enable(false)}>disable</button>
            <button onClick={() => instance?.field?.clear()}>clear</button>
        </div>
    )
}
export default FieldDemo
