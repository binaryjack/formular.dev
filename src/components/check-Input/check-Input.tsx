import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './check-Input.css'
interface ICheckInputProps {
    fieldName: string
}

const CheckInput = ({ fieldName }: ICheckInputProps) => {
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        instance?.field.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance?.field, (value) => {
        if (!instance?.field) return
        instance.field.checked = value
    })

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
            <div className={`flex flex-1 items-center ml-1`}>
                <input
                    tabIndex={0}
                    data-class="base-checkbox "
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="checkbox"
                    {...instance?.field?.register()}
                    ref={(r) => instance?.field?.ref(r)}
                />
            </div>
        </FieldSet>
    )
}
export default CheckInput
