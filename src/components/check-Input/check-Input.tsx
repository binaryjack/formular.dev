import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './check-Input.css'
interface ICheckInputProps {
    fieldName: string
}

const CheckInput = ({ fieldName }: ICheckInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        instance?.input.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance?.input, (value) => {
        if (!instance?.input) return
        instance.input.checked = value
    })

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
                    isFocus={flags.focus}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <div className={`flex flex-1 items-center ml-1`}>
                <input
                    tabIndex={0}
                    data-class="base-checkbox "
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="checkbox"
                    {...instance?.input?.register()}
                    ref={(r) => instance?.input?.ref(r)}
                />
            </div>
        </FieldSet>
    )
}
export default CheckInput
