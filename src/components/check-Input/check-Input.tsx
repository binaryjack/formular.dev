import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
import useKeyBindings from '../../core/hooks/use-key-bindings'
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
    const { field, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(field, (value) => {
        if (!field) return
        field.checked = value
    })

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
            <div className={`flex flex-1 items-center ml-1`}>
                <input
                    tabIndex={0}
                    data-class="base-checkbox "
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="checkbox"
                    {...field?.register()}
                    ref={(r) => field?.ref(r)}
                />
            </div>
        </FieldSet>
    )
}
export default CheckInput
