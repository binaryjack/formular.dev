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
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    return (
        <FieldSet
            inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
            label={instance?.field?.label}
            type={instance?.field?.type}
            flags={flags}
            onClick={() => {
                instance?.field?.focus()
            }}
        >
            <input
                tabIndex={-1}
                data-class="base-input read-only-input"
                {...instance?.field?.register()}
                ref={(r) => instance?.field?.ref(r)}
                value={instance?.field?.toString() ?? ''}
                readOnly
                autoComplete="off"
                type="text"
                className="read-only-input"
            />
        </FieldSet>
    )
}
