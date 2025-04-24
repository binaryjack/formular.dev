import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import './readonly-field.css'
// filepath: e:/Sources/SignalsPatternsReact/src/components/id-field/id-field.tsx

interface IReadOnlyFieldProps {
    fieldName: string
}

export const ReadOnlyField = ({ fieldName }: IReadOnlyFieldProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
        >
            <input
                tabIndex={-1}
                data-class="base-input read-only-input"
                {...field?.register()}
                ref={(r) => field?.ref(r)}
                value={field?.toString() ?? ''}
                readOnly
                autoComplete="off"
                type="text"
                className="read-only-input"
            />
        </FieldSet>
    )
}
