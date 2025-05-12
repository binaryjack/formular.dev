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
        instance?.input?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance?.input)

    return (
        <FieldSet
            inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.input?.register()}
                ref={(r) => instance?.input?.ref(r)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                type="text"
            />
        </FieldSet>
    )
}
export default InputText
