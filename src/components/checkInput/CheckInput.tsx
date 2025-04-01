import useKeyBindings from '../../core/hooks/useKeyBindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../Formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'

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
                    data-class="base-checkbox "
                    {...field?.register()}
                    ref={field?.ref()}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
            </div>
        </FieldSet>
    )
}
export default CheckInput
