import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
import useKeyBindings from '../../core/hooks/use-key-bindings'
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
    const { field, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(field)

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...field?.register()}
                ref={(r) => field?.ref(r)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                type="text"
            />
        </FieldSet>
    )
}
export default InputText
