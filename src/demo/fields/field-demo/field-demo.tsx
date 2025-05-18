import { conventions } from '@components/context/conventions/conventions'
import FieldSet from '@components/field-set/field-set'
import ValidationResultComponent from '@components/validation-result/validation-result'

import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { InputsProvider } from '@core/input-engine/generator/input-provider'
import { Signals } from '../../../core/observers/signals/signal'
import { controlsDemoSchema } from '../../form-demo/form-demo.schema'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// build a schema for the fields to be used
const item = controlsDemoSchema
// map schema to fieldsDescriptors collection from schema
const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

const outSideFields = InputsProvider(
    fieldDescriptors,
    defaultInitializationParameters,
    defaultInitializationDependencies
)

outSideFields?.[3].hasChanges(() => {
    // console.log('Field updated', outSideFields?.[3])
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    const { instance, flags } = useField(
        outSideFields.find((o) => o.name === 'inputControl') as unknown as IExtendedInput
    )

    return (
        <div>
            <FieldSet
                inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
                label={instance?.input?.label}
                type={instance?.input?.type}
                flags={flags}
                validationChildren={
                    <ValidationResultComponent
                        validationResults={instance?.input?.validationResults ?? []}
                        isFocus={flags.focus}
                    />
                }
                onClear={() => instance?.input?.clear()}
            >
                <input
                    data-class="base-input"
                    {...instance?.input?.register()}
                    ref={(r) => instance?.input?.ref(r)}
                />
            </FieldSet>

            <button onClick={() => instance?.input?.setFocus()}>focus Field</button>
            <button onClick={() => instance?.input?.enable(true)}>enable</button>
            <button onClick={() => instance?.input?.enable(false)}>disable</button>
            <button onClick={() => instance?.input?.clear()}>clear</button>
        </div>
    )
}
export default FieldDemo
