import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './input-text.css'

interface IInputTextProps {
    fieldName: string
}

const InputText = ({ fieldName }: IInputTextProps) => {
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        instance?.field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance?.field)

    return (
        <FieldSet
            inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
            label={instance?.field?.label}
            type={instance?.field?.type}
            flags={flags}
            onClick={() => {
                instance?.field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.field?.validationResults ?? []}
                />
            }
            onClear={() => instance?.field?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.field?.register()}
                ref={(r) => instance?.field?.ref(r)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                type="text"
            />
        </FieldSet>
    )
}
export default InputText
