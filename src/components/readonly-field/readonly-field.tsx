import { useField } from '@adapters/react/fields/hooks/use-field'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import './readonly-field.css'
// filepath: e:/Sources/SignalsPatternsReact/src/components/id-field/id-field.tsx

interface IReadOnlyFieldProps {
    fieldName: string
}

export const ReadOnlyField = ({ fieldName }: IReadOnlyFieldProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    return (
        <FieldSet
            inputId={
                instance?.input?.name ??
                conventions.IsMissing(MissingPropEnum.ID, ReadOnlyField.name)
            }
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
        >
            <input
                tabIndex={-1}
                data-class="base-input read-only-input"
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                value={instance?.input?.valueManager?.getAsString?.(instance) ?? ''}
                readOnly
                autoComplete="off"
                type="text"
                className="read-only-input"
            />
        </FieldSet>
    )
}
